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

    const { data, error } = await resend.emails.send({
      from: `Soul Structure Workshop <${VERIFIED_FROM_EMAIL}>`,
      to: [to],
      subject,
      text: body || "Please view this email in an HTML-compatible client.",
      html: html || undefined,
    });

    // Add detailed logging
    console.log("Resend Response Data:", data);
    console.log("Resend Error:", error);

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({
        message: "Failed to send email.",
        details: error, // Include the actual error
      });
    }

    const mailchimpResponse = await fetch(
      `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: to,
          status: "subscribed",
          merge_fields: { FNAME: name || "" },
        }),
      }
    );

    const mailchimpResult = await mailchimpResponse.json();

    if (!mailchimpResponse.ok && mailchimpResult.title !== "Member Exists") {
      console.error("Mailchimp API Error:", mailchimpResult);
      return res
        .status(400)
        .json({ message: "Failed to add subscriber to Mailchimp." });
    }

    const crypto = require("crypto");
    const subscriberHash = crypto
      .createHash("md5")
      .update(to.toLowerCase())
      .digest("hex");

    const tagResponse = await fetch(
      `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${subscriberHash}/tags`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: [{ name: "SSW Assessment", status: "active" }],
        }),
      }
    );

    if (!tagResponse.ok) {
      console.error("Mailchimp Tag Error:", await tagResponse.text());
    }

    return res.status(200).json({
      message: "Email sent, subscriber added, and tag applied successfully!",
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
