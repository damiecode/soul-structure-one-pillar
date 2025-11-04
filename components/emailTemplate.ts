// /lib/emailTemplates.js
import { brand } from "./brandStyle";

export function buildSoulStructureEmail(interpretation, categoryScores) {
  const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
    JSON.stringify({
      type: "bar",
      data: {
        labels: Object.keys(categoryScores),
        datasets: [
          {
            label: "Connection Pillar Scores",
            data: Object.values(categoryScores),
            backgroundColor: "#81B29A",
          },
        ],
      },
      options: {
        scales: {
          y: { min: 0, max: 5 },
        },
        plugins: {
          legend: { display: false },
          title: { display: false },
        },
      },
    })
  )}`;

  const categoryRows = Object.entries(categoryScores)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:10px 0; font-size:15px; color:${brand.brown};">
            ${key}
          </td>
          <td style="padding:10px 0; text-align:right; font-weight:bold; color:${
            brand.green
          };">${Number(value).toFixed(1)} / 5</td>
        </tr>`
    )
    .join("");

  return `
  <div style="background-color:${brand.cream}; font-family:${brand.bodyFont};
              color:${brand.brown}; padding:40px 24px; border-radius:12px; max-width:600px;
              margin:auto; border:1px solid #e5e2dd;">
    
    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="font-size:26px; color:${brand.brown}; margin-bottom:8px; font-weight:900;">
        Your Soul Structure Results
      </h1>
      <p style="font-size:15px; color:${brand.green}; margin:0; font-weight:600;">
        Connection Pillar Assessment
      </p>
    </div>

    <div style="background-color:${brand.green}; color:#fff; padding:12px 20px; border-radius:8px;
                text-align:center; margin-bottom:24px;">
      <h2 style="margin:0; font-size:20px;">Your Pillar State: ${interpretation.state}</h2>
    </div>

    <p style="font-size:15px; line-height:1.7; color:#2a2a2a; margin-bottom:24px;">
      ${interpretation.narrative}
    </p>

    <hr style="border:none; border-top:1px solid #e0ddd7; margin:32px 0;">

    <div style="text-align:center; margin:24px 0;">
      <img src="${chartUrl}" alt="Connection Pillar Results Chart"
           style="width:100%; max-width:500px; border-radius:8px; margin:auto; display:block;" />
    </div>

    <h3 style="font-size:18px; color:${brand.brown}; margin-bottom:16px; text-align:center;">
      Your Connection Profile Breakdown
    </h3>
    <table style="width:100%; border-collapse:collapse; background:#fff;">
      <tbody>
        ${categoryRows}
      </tbody>
    </table>

    <hr style="border:none; border-top:1px solid #e0ddd7; margin:32px 0;">

    <div style="text-align:center; margin-top:24px;">
      <p style="font-size:15px; color:${brand.brown}; margin-bottom:16px;">
        Your journey doesn't end here. Continue exploring all Soul Structure pillars
        and deepen your wholeness.
      </p>
      <a href="https://tosinsanni.com/soulstructureworkshop/"
         style="background-color:${brand.gold}; color:#fff; padding:14px 28px;
                border-radius:8px; text-decoration:none; font-weight:600; font-size:16px;
                display:inline-block;">
         Join the Soul Structure Workshop
      </a>
    </div>

    <div style="text-align:center; margin-top:40px; font-size:12px; color:#8c837b;">
      <p style="margin:4px 0;">You are receiving this email because you opted in via our website.</p>
      <p style="margin:4px 0;">Our mailing address is:</p>
      <p style="margin:2px 0;">Tosin Sanni</p>
      <p style="margin:2px 0;">Chief Retin Obasuyi St 9</p>
      <p style="margin:2px 0;">Maryland, Lagos 100211, Nigeria</p>
      <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
      <p style="margin:4px 0;">Copyright © 2025 Tosin Sanni, All rights reserved.</p>
    </div>
  </div>`;
}
