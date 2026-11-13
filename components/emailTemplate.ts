// Results email for the Identity Pillar assessment.
// Built with tables and inline styles so it renders well in Gmail, Apple Mail
// and Outlook, and reads comfortably on phones.

const SITE_URL = "https://soul-structure-one-pillar.vercel.app";
const WORKSHOP_URL = "https://tosinsanni.com/soul-structure-experience/";

const c = {
  page: "#F4F1EA",
  card: "#FFFFFF",
  cream: "#FAF7F1",
  ink: "#2F2A24",
  body: "#4A443C",
  muted: "#8C8378",
  line: "#ECE6DB",
  olive: "#8A9A5B",
  oliveDark: "#5F6B3A",
  oliveTint: "#EEF0E4",
  gold: "#C9A46A",
};

const serif = "Georgia, 'Times New Roman', serif";
const sans =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
      ch
    ] as string)
  );

export function buildSoulStructureEmail(
  interpretation: any,
  categoryScores: Record<string, number>,
  name?: string
) {
  const firstName = name?.trim() ? escapeHtml(name.trim().split(/\s+/)[0]) : "";
  const greeting = firstName ? `Dear ${firstName},` : "Hello,";

  const scoreRows = Object.entries(categoryScores)
    .map(([label, raw]) => {
      const score = Math.round(Number(raw) * 10) / 10;
      // Bar width as a share of the 1–5 scale
      const pct = Math.max(4, Math.min(100, Math.round(((score - 1) / 4) * 100)));
      return `
        <tr>
          <td style="padding:0 0 22px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:${sans}; font-size:15px; color:${c.ink}; padding:0 0 8px 0;">
                  ${escapeHtml(label)}
                </td>
                <td align="right" style="font-family:${sans}; font-size:15px; color:${c.oliveDark}; font-weight:bold; padding:0 0 8px 0; white-space:nowrap;">
                  ${score.toFixed(1)}<span style="color:${c.muted}; font-weight:normal;"> / 5</span>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="background:${c.oliveTint}; border-radius:6px; height:10px; line-height:10px; font-size:0;">
                  <table role="presentation" width="${pct}%" cellpadding="0" cellspacing="0" border="0">
                    <tr><td style="background:${c.olive}; border-radius:6px; height:10px; line-height:10px; font-size:0;">&nbsp;</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
    })
    .join("");

  const overall = interpretation.state as string;
  const stateColor = interpretation.color as string;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Your Identity Pillar Results</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .h1 { font-size: 28px !important; line-height: 34px !important; }
      .btn a { display: block !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:${c.page}; -webkit-text-size-adjust:100%;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    Your Identity Pillar result is ${escapeHtml(overall)} — here's what it means for you.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.page};">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background:${c.card}; border-radius:20px; overflow:hidden;">

          <!-- Logo -->
          <tr>
            <td align="center" class="px" style="padding:40px 48px 8px 48px;">
              <img src="${SITE_URL}/email_logo.png" alt="Tosin Sanni" width="220" style="width:220px; max-width:70%; height:auto; display:block; border:0;">
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" class="px" style="padding:16px 48px 0 48px;">
              <p style="margin:0; font-family:${sans}; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:${c.olive};">
                Identity Pillar &middot; Self-Relationship
              </p>
              <h1 class="h1" style="margin:12px 0 0 0; font-family:${serif}; font-weight:normal; font-size:32px; line-height:40px; color:${c.ink};">
                Your results are here
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td class="px" style="padding:28px 48px 0 48px;">
              <p style="margin:0 0 12px 0; font-family:${sans}; font-size:16px; line-height:26px; color:${c.body};">${greeting}</p>
              <p style="margin:0; font-family:${sans}; font-size:16px; line-height:26px; color:${c.body};">
                Thank you for taking a quiet moment to reflect on your relationship with yourself. Whatever your result, it is not a verdict — it's an honest snapshot of where you are today, and a gentle guide for where to go next.
              </p>
            </td>
          </tr>

          <!-- Result -->
          <tr>
            <td class="px" style="padding:32px 48px 0 48px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.cream}; border-radius:16px;">
                <tr>
                  <td align="center" style="padding:32px 28px 8px 28px;">
                    <p style="margin:0; font-family:${sans}; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:${c.muted};">Your pillar state</p>
                    <p style="margin:12px 0 0 0; font-family:${serif}; font-size:30px; line-height:36px; color:${c.ink};">
                      <span style="display:inline-block; width:12px; height:12px; border-radius:6px; background:${stateColor}; vertical-align:middle; margin-right:10px;"></span>${escapeHtml(overall)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px 32px 28px;">
                    <p style="margin:0; font-family:${serif}; font-size:17px; line-height:29px; color:${c.body};">
                      ${escapeHtml(interpretation.narrative)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Breakdown -->
          <tr>
            <td class="px" style="padding:40px 48px 0 48px;">
              <h2 style="margin:0 0 6px 0; font-family:${serif}; font-weight:normal; font-size:22px; line-height:30px; color:${c.ink};">Your identity profile</h2>
              <p style="margin:0 0 24px 0; font-family:${sans}; font-size:14px; line-height:22px; color:${c.muted};">How you scored across each area, on a scale of 1 to 5.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${scoreRows}
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td class="px" style="padding:12px 48px 0 48px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid ${c.line}; font-size:0; line-height:0;">&nbsp;</td></tr></table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" class="px" style="padding:36px 48px 44px 48px;">
              <h2 style="margin:0 0 12px 0; font-family:${serif}; font-weight:normal; font-size:24px; line-height:32px; color:${c.ink};">Continue your journey</h2>
              <p style="margin:0 0 28px 0; font-family:${sans}; font-size:15px; line-height:25px; color:${c.body};">
                This is one of seven pillars. The Soul Structure Experience takes you through all of them, with the tools and support to build a life of wholeness and purpose.
              </p>
              <table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background:${c.olive}; border-radius:999px;">
                    <a href="${WORKSHOP_URL}" style="display:inline-block; padding:16px 36px; font-family:${sans}; font-size:16px; font-weight:bold; color:#FFFFFF; text-decoration:none; border-radius:999px;">
                      Join the experience
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="px" style="background:${c.cream}; padding:28px 48px; border-top:1px solid ${c.line};">
              <p style="margin:0 0 6px 0; font-family:${serif}; font-style:italic; font-size:15px; color:${c.body};">With grace, Tosin Sanni</p>
              <p style="margin:0 0 16px 0; font-family:${sans}; font-size:12px; line-height:18px; color:${c.muted};">
                &copy; ${new Date().getFullYear()} Soul Structure Workshop
              </p>
              <p style="margin:0; font-family:${sans}; font-size:11px; line-height:17px; color:${c.muted};">
                You're receiving this because you took the assessment on our website.<br>
                Tosin Sanni &middot; Chief Retin Obasuyi St 9, Maryland, Lagos 100211, Nigeria
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
