import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const VERIFIED_FROM_EMAIL = "results@your-verified-domain.com";

export default async function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://soul-structure-one-pillar.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY environment variable is not set.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res
        .status(400)
        .json({ message: "Missing required fields: to, subject, or body." });
    }

    const { data, error } = await resend.emails.send({
      from: `Soul Structure Workshop <${VERIFIED_FROM_EMAIL}>`,
      to: [to],
      subject: subject,
      text: body,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res
        .status(400)
        .json({ message: "Failed to send email.", details: error.message });
    }

    return res.status(200).json({ message: "Email sent successfully!", data });
  } catch (error) {
    console.error("Generic Server Error:", error);
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
}
