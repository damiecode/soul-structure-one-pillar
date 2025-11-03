// /lib/emailTemplates.js
import { brand } from "./brandStyle";

/**
 * Format a score safely as "X.X / 5"
 * If value cannot be parsed, returns "—"
 */
function formatScore(value) {
  const n = Number(value);
  if (Number.isFinite(n)) {
    return `${n.toFixed(1)} / 5`;
  }
  // return fallback string if value is invalid
  return "—";
}

export function buildSoulStructureEmail(interpretation, categoryScores) {
  const categoryRows = Object.entries(categoryScores || {})
    .map(([key, value]) => {
      const formatted = formatScore(value);
      return `
        <tr>
          <td style="padding:10px 0; font-size:15px; color:${brand.brown};">
            ${escapeHtml(key)}
          </td>
          <td style="padding:10px 0; text-align:right; font-weight:bold; color:${
            brand.green
          };">
            ${formatted}
          </td>
        </tr>`;
    })
    .join("");

  return `
  <div style="background-color:${brand.cream}; font-family:${
    brand.bodyFont
  }; color:${brand.brown};
              padding:40px 24px; border-radius:12px; max-width:600px; margin:auto;
              border:1px solid #e5e2dd;">
    <!-- Header -->
    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="font-size:26px; color:${
        brand.brown
      }; margin-bottom:8px; font-weight:900;">
        Your Soul Structure Results
      </h1>
      <p style="font-size:15px; color:#6b6259; margin:0;">
        A reflection from the Strength Pillar Assessment
      </p>
    </div>

    <!-- Pillar State -->
    <div style="background-color:${
      brand.brown
    }; color:#fff; padding:12px 20px; border-radius:8px;
                text-align:center; margin-bottom:24px;">
      <h2 style="margin:0; font-size:20px;">Your Pillar State: ${escapeHtml(
        interpretation?.state ?? "—"
      )}</h2>
    </div>

    <!-- Narrative -->
    <p style="font-size:15px; line-height:1.7; color:#2a2a2a; margin-bottom:24px;">
      ${escapeHtml(interpretation?.narrative ?? "")}
    </p>

    <hr style="border:none; border-top:1px solid #e0ddd7; margin:32px 0;">

    <!-- Strength Profile -->
    <h3 style="font-size:18px; color:${
      brand.brown
    }; margin-bottom:16px; text-align:center;">
      Your Strength Profile Breakdown
    </h3>
    <p style="font-size:14px; color:#6b6259; text-align:center; margin-bottom:20px;">
      Here’s a closer look at your alignment across key relational dimensions.
    </p>

    <table style="width:100%; border-collapse:collapse; background:#fff;">
      <tbody>
        ${categoryRows}
      </tbody>
    </table>

    <hr style="border:none; border-top:1px solid #e0ddd7; margin:32px 0;">

    <div style="text-align:center; margin-top:24px;">
      <p style="font-size:15px; color:${brand.brown}; margin-bottom:16px;">
        Your journey doesn’t end here. Continue exploring all Soul Structure pillars
        and deepen your wholeness.
      </p>
      <a href="https://tosinsanni.com/soulstructureworkshop/"
         style="background-color:${
           brand.gold
         }; color:#fff; padding:14px 28px; border-radius:8px;
                text-decoration:none; font-weight:600; font-size:16px; display:inline-block;">
         Join the Soul Structure Workshop
      </a>
    </div>

    <div style="text-align:center; margin-top:40px; font-size:12px; color:#8c837b;">
      <p style="margin:4px 0;">With gratitude,</p>
      <p style="margin:4px 0; font-weight:600;">The Soul Structure Team</p>
      <p style="margin-top:8px; color:#b1a99f;">© 2025 Tosin Sanni | Soul Structure</p>
    </div>
  </div>`;
}

/**
 * Very small HTML escaper to avoid breaking the template when values have <,>,&
 * This is not a full sanitizer — sufficient for simple strings like labels & narrative.
 */
function escapeHtml(str) {
  if (typeof str !== "string") return str ?? "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
