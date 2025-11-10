// /lib/emailTemplates.ts
import { brand } from "./brandStyle";

export function buildSoulStructureEmail(
  interpretation: any,
  categoryScores: any
) {
  const chartUrl = `https://quickchart.io/chart?v=4&c=${encodeURIComponent(
    JSON.stringify({
      type: "bar",
      data: {
        labels: Object.keys(categoryScores),
        datasets: [
          {
            label: "Connection Pillar Scores",
            data: Object.values(categoryScores),
            backgroundColor: "#6A994E",
            borderRadius: 8,
            barThickness: 40,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: "linear",
            min: 1,
            max: 5,
            ticks: {
              stepSize: 0.5,
              font: { size: 14 },
            },
            grid: {
              color: "rgba(0,0,0,0.05)",
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { size: 12 },
            },
          },
        },
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(42, 42, 42, 0.9)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#6A994E",
            borderWidth: 2,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: function (context) {
                return context[0].label;
              },
              label: function (context) {
                return "Score: " + context.parsed.y.toFixed(1) + " / 5.0";
              },
            },
          },
          datalabels: {
            anchor: "end",
            align: "top",
            color: "#2a2a2a",
            font: {
              size: 14,
              weight: "bold",
            },
            formatter: function (value) {
              return value.toFixed(1);
            },
          },
        },
      },
    })
  )}`;

  const categoryIcons = {
    "Trust & Safety": "🛡️",
    "Boundaries & Balance": "⚖️",
    "Mutual Support": "🤝",
    "Authentic Expression": "💬",
  };

  const categoryRows = Object.entries(categoryScores)
    .map(
      ([key, value]: [string, any]) => `
        <tr>
          <td style="padding:16px 20px; border-bottom:1px solid #f0ede8;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:24px;">${
                categoryIcons[key as keyof typeof categoryIcons] || "✨"
              }</span>
              <span style="font-size:16px; color:#2a2a2a; font-weight:600;">${key}</span>
            </div>
          </td>
          <td style="padding:16px 20px; text-align:right; border-bottom:1px solid #f0ede8;">
            <span style="font-weight:700; color:#6A994E; font-size:18px;">
              ${Number(value).toFixed(1)}
            </span>
            <span style="color:#8c837b; font-size:14px;"> / 5.0</span>
          </td>
        </tr>`
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Soul Structure Results</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f3f0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
    
    <div style="background-color:#f5f3f0; padding:40px 20px;">
      <div style="max-width:650px; margin:0 auto; background:linear-gradient(135deg, #fdfcfb 0%, #f5f3f0 100%); 
                  border-radius:24px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.1); border:1px solid rgba(255,255,255,0.5);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg, #6A994E 0%, #81B29A 100%); padding:48px 32px; text-align:center;">
          <div style="background-color:rgba(255,255,255,0.95); display:inline-block; padding:16px 32px; border-radius:16px; margin-bottom:20px;">
            <h1 style="margin:0; font-size:28px; color:#2a2a2a; font-weight:900; letter-spacing:-0.5px;">
              Soul Structure Results
            </h1>
          </div>
          <p style="margin:0; color:#ffffff; font-size:16px; font-weight:600; opacity:0.95;">
            Connection Pillar Assessment
          </p>
        </div>

        <!-- Main Content -->
        <div style="padding:40px 32px;">
          
          <!-- Pillar State Badge -->
          <div style="text-align:center; margin-bottom:32px;">
            <div style="background-color:${
              interpretation.color
            }; color:#ffffff; 
                        padding:16px 32px; border-radius:50px; display:inline-block;
                        box-shadow:0 4px 12px rgba(0,0,0,0.15);">
              <h2 style="margin:0; font-size:22px; font-weight:700; letter-spacing:0.5px;">
                ${interpretation.state} Pillar
              </h2>
            </div>
          </div>

          <!-- Narrative -->
          <div style="background-color:#ffffff; padding:28px; border-radius:16px; margin-bottom:40px;
                      box-shadow:0 2px 8px rgba(0,0,0,0.05); border:1px solid #f0ede8;">
            <p style="font-size:16px; line-height:1.8; color:#2a2a2a; margin:0; text-align:left;">
              ${interpretation.narrative}
            </p>
          </div>

          <!-- Divider -->
          <div style="border-top:2px solid #f0ede8; margin:40px 0;"></div>

          <!-- Chart Section -->
          <div style="text-align:center; margin-bottom:40px;">
            <h3 style="font-size:24px; color:#2a2a2a; margin-bottom:24px; font-weight:700;">
              Your Connection Profile
            </h3>
            <div style="background-color:#ffffff; padding:24px; border-radius:16px;
                        box-shadow:0 2px 8px rgba(0,0,0,0.05); border:1px solid #f0ede8;">
              <img src="${chartUrl}" alt="Connection Pillar Results Chart"
                   style="width:100%; max-width:550px; border-radius:12px; margin:auto; display:block;" />
            </div>
          </div>

          <!-- Category Breakdown -->
          <div style="margin-bottom:40px;">
            <h3 style="font-size:22px; color:#2a2a2a; margin-bottom:20px; text-align:center; font-weight:700;">
              Detailed Breakdown
            </h3>
            <div style="background-color:#ffffff; border-radius:16px; overflow:hidden;
                        box-shadow:0 2px 8px rgba(0,0,0,0.05); border:1px solid #f0ede8;">
              <table style="width:100%; border-collapse:collapse;">
                <tbody>
                  ${categoryRows}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Divider -->
          <div style="border-top:2px solid #f0ede8; margin:40px 0;"></div>

          <!-- Call to Action -->
          <div style="text-align:center; background:linear-gradient(135deg, #fdfcfb 0%, #f9f7f4 100%); 
                      padding:40px 32px; border-radius:16px; border:1px solid #f0ede8;">
            <h3 style="font-size:24px; color:#2a2a2a; margin-bottom:16px; font-weight:700;">
              Continue Your Journey
            </h3>
            <p style="font-size:16px; color:#5a5550; line-height:1.7; margin-bottom:28px; max-width:500px; margin-left:auto; margin-right:auto;">
              This result is just the beginning. The Soul Structure Workshop offers a deep dive into all 
              pillars of your being, providing the tools and resources to build a life of purpose and wholeness.
            </p>
            <a href="https://tosinsanni.com/soulstructureworkshop/"
               style="background:linear-gradient(135deg, #F4A261 0%, #E9B872 100%); 
                      color:#ffffff; padding:18px 40px; border-radius:12px; 
                      text-decoration:none; font-weight:700; font-size:17px;
                      display:inline-block; box-shadow:0 4px 12px rgba(244,162,97,0.3);
                      transition:all 0.3s;">
               Register for the Workshop →
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color:#2a2a2a; padding:32px; text-align:center; color:#ffffff;">
          <p style="margin:0 0 8px 0; font-size:14px; opacity:0.9;">
            Thank you for taking the Connection Pillar Assessment
          </p>
          <p style="margin:0 0 20px 0; font-size:13px; opacity:0.7;">
            © ${new Date().getFullYear()} Soul Structure Workshop. All rights reserved.
          </p>
          
          <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:20px; margin-top:20px;">
            <p style="margin:4px 0; font-size:12px; opacity:0.6;">
              You are receiving this email because you opted in via our website.
            </p>
            <p style="margin:12px 0 4px 0; font-size:12px; opacity:0.6; font-weight:600;">
              Our mailing address:
            </p>
            <p style="margin:2px 0; font-size:12px; opacity:0.6;">Tosin Sanni</p>
            <p style="margin:2px 0; font-size:12px; opacity:0.6;">Chief Retin Obasuyi St 9</p>
            <p style="margin:2px 0; font-size:12px; opacity:0.6;">Maryland, Lagos 100211, Nigeria</p>
          </div>
        </div>

      </div>
    </div>

  </body>
  </html>`;
}
