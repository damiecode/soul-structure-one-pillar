// This is the code for your serverless function: /api/send-email.js
import { Resend } from "resend";

// The API key you got from Resend.com
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Allow requests from your website's domain
  res.setHeader("Access-Control-Allow-Origin", "*"); // For development. Change to your actual domain in production!
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle the browser's pre-flight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Get the data from the frontend
  const { to, subject, body } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      // IMPORTANT: Resend requires a 'from' address from a domain you've verified.
      from: "Soul Structure Results <results@your-verified-domain.com>",
      to: [to],
      subject: subject,
      text: body,
    });

    if (error) {
      return res.status(400).json(error);
    }

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
}
