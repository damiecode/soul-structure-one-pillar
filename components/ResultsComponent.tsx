import React, { useState } from "react";
import { Result } from "../types";
import { buildSoulStructureEmail } from "./emailTemplate.ts";

interface ResultsComponentProps {
  result: Result;
  onRestart: () => void;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({
  result,
  onRestart,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const { interpretation, categoryScores } = result;

  const handleSendEmail = async () => {
    if (!email || !email.includes("@")) {
      setStatusMessage("Please enter a valid email address.");
      setEmailStatus("error");
      return;
    }

    setEmailStatus("sending");
    setStatusMessage("");
    const endpoint = "/api/send-email";
    const subject = "Your Soul Structure: Connection Pillar Results";

    const htmlBody = buildSoulStructureEmail(interpretation, categoryScores);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject,
          html: htmlBody,
          name: name.trim() || undefined,
        }),
      });

      if (!response.ok) throw new Error("Server responded with an error.");

      setEmailStatus("sent");
      setStatusMessage("Success! Your results have been sent to your email.");
      setTimeout(() => {
        window.location.href = "https://tosinsanni.com/soulstructureworkshop/";
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Failed to send email:", error);
      setEmailStatus("error");
      setStatusMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-cream/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl w-full animate-fade-in border border-white/50 text-center">
      {emailStatus !== "sent" ? (
        <>
          <h2 className="text-3xl sm:text-4xl font-serif text-primary mb-4">
            Your Assessment is Complete! 🎉
          </h2>
          <p className="text-primary/90 mb-6 text-lg leading-relaxed max-w-2xl mx-auto">
            Thank you for taking the Connection Pillar Assessment. Your
            personalized results are ready!
          </p>
          <p className="text-primary/80 mb-8 max-w-2xl mx-auto">
            Enter your email below to receive your detailed Soul Structure
            insights, including your pillar state and connection profile
            breakdown.
          </p>
          <div className="bg-accent-green/5 border border-accent-green/20 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-sm text-primary/70">
              💡 <strong>Tip:</strong> Remember to check your promotions and
              spam folders if you don't see the email in your inbox right away.
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-2xl mx-auto mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-green/80 focus:outline-none disabled:bg-gray-200 text-lg"
              aria-label="Your name"
              disabled={emailStatus === "sending"}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-green/80 focus:outline-none disabled:bg-gray-200 text-lg"
              aria-label="Email address"
              disabled={emailStatus === "sending"}
            />
            <button
              onClick={handleSendEmail}
              className="w-full bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed text-lg"
              disabled={emailStatus === "sending"}
            >
              {emailStatus === "sending" ? "Sending..." : "Get My Results"}
            </button>
          </div>
          {emailStatus === "error" && statusMessage && (
            <p className="mt-4 text-red-600 font-medium">{statusMessage}</p>
          )}

          <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in-up text-center">
            <h3 className="text-2xl font-serif text-primary mb-4">
              Continue Your Journey
            </h3>
            <p className="text-primary/80 mb-6 max-w-prose mx-auto">
              This result is just the beginning. The Soul Structure Workshop
              offers a deep dive into all pillars of your being, granting you
              full access to the 7-Pillar Soul Structure Assessment, and
              providing the tools and resources to build a life of purpose and
              wholeness.
            </p>
            <a
              href="https://tosinsanni.com/soulstructureworkshop/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-gold text-white font-bold py-3 px-10 rounded-xl text-lg hover:bg-accent-gold/90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-gold/80"
            >
              Register for the Workshop
            </a>
          </div>
        </>
      ) : (
        <div className="p-6 bg-accent-green/10 rounded-xl border border-accent-green/30 text-center animate-fade-in">
          <h4 className="text-lg font-semibold text-accent-green mb-2">
            🎉 Your results have been sent!
          </h4>
          <p className="text-primary/80 mb-4">
            Your personalized Soul Structure insights are waiting for you in
            your inbox. If you don't see them right away, check your promotions
            or spam folder.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href="https://tosinsanni.com/soulstructureworkshop/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-gold text-white px-6 py-3 rounded-lg font-bold hover:bg-accent-gold/90 transition"
            >
              Go to Workshop
            </a>
            <button
              onClick={onRestart}
              className="border border-accent-green text-accent-green px-6 py-3 rounded-lg font-bold hover:bg-accent-green/10 transition"
            >
              Take the Assessment Again
            </button>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <button
          onClick={onRestart}
          className="bg-transparent text-primary/70 font-bold py-2 px-6 rounded-xl hover:bg-primary/10 transition-all duration-300"
        >
          Take the Assessment Again
        </button>
      </div>
    </div>
  );
};

export default ResultsComponent;
