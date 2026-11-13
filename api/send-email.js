export const runtime = "nodejs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const VERIFIED_FROM_EMAIL = "results@tosinsanni.com";

export default async function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://soul-structure-one-pillar.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const { to, subject, body, html, name } = req.body;

    if (!to || !subject || (!body && !html)) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: `Soul Structure Workshop <${VERIFIED_FROM_EMAIL}>`,
      to: to,
      subject,
      text: body || "Please view this email in an HTML-compatible client.",
      html: html || undefined,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({
        message: "Failed to send email.",
        details: error,
      });
    }

    // Add to Flodesk (non-blocking: the results email has already been sent)
    try {
      const flodeskAuth = Buffer.from(
        `${process.env.FLODESK_API_KEY}:`
      ).toString("base64");

      const flodeskHeaders = {
        Authorization: `Basic ${flodeskAuth}`,
        "Content-Type": "application/json",
        "User-Agent": "Soul Structure Workshop (soul-structure-one-pillar.vercel.app)",
      };

      const subscriberBody = { email: to };
      if (name && name.trim()) subscriberBody.first_name = name.trim();
      if (process.env.FLODESK_SEGMENT_ID) {
        subscriberBody.segment_ids = [process.env.FLODESK_SEGMENT_ID];
      }

      const flodeskResponse = await fetch(
        "https://api.flodesk.com/v1/subscribers",
        {
          method: "POST",
          headers: flodeskHeaders,
          body: JSON.stringify(subscriberBody),
        }
      );

      if (!flodeskResponse.ok) {
        console.error("Flodesk API Error:", await flodeskResponse.text());
      } else {
        console.log("Flodesk subscriber saved:", to);

        // Add to the segment explicitly (create can ignore segment_ids)
        if (process.env.FLODESK_SEGMENT_ID) {
          const segmentResponse = await fetch(
            `https://api.flodesk.com/v1/subscribers/${encodeURIComponent(
              to
            )}/segments`,
            {
              method: "POST",
              headers: flodeskHeaders,
              body: JSON.stringify({
                segment_ids: [process.env.FLODESK_SEGMENT_ID],
              }),
            }
          );
          if (segmentResponse.ok) {
            console.log("Flodesk segment added:", process.env.FLODESK_SEGMENT_ID);
          } else {
            console.error(
              "Flodesk Segment Error:",
              segmentResponse.status,
              await segmentResponse.text()
            );
          }
        } else {
          console.warn("FLODESK_SEGMENT_ID is not set; skipping segment.");
        }
      }
    } catch (flodeskError) {
      console.error("Flodesk request failed:", flodeskError);
    }

    return res.status(200).json({
      message: "Email sent successfully!",
      data,
    });
  } catch (error) {
    console.error("Generic Server Error:", error);
    return res.status(500).json({
      message: "An unexpected error occurred.",
      details: error.message,
    });
  }
}
