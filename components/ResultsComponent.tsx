import React, { useState } from "react";
import { Result } from "../types";
import CategoryBar from "./CategoryBar.tsx";
import { buildSoulStructureEmail } from "./emailTemplate.ts";

interface ResultsComponentProps {
  result: Result;
  onRestart: () => void;
}

const ICONS: { [key: string]: React.ReactNode } = {
  "Trust & Safety": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-accent-green"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  "Boundaries & Balance": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-accent-green"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </svg>
  ),
  "Mutual Support": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-accent-green"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  "Authentic Expression": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-accent-green"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
};

const ResultsComponent: React.FC<ResultsComponentProps> = ({
  result,
  onRestart,
}) => {
  const [email, setEmail] = useState("");
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

    // Use your new HTML template
    const htmlBody = buildSoulStructureEmail(interpretation, categoryScores);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: email, subject, html: htmlBody }),
      });

      if (!response.ok) throw new Error("Server responded with an error.");

      setEmailStatus("sent");
      setStatusMessage("Success! Your results have been sent to your email.");

      // Wait a moment so the user can see the message, then redirect
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
      <h2 className="text-3xl sm:text-4xl font-serif text-primary mb-4">
        Your Result
      </h2>
      <div
        className="px-4 py-2 rounded-full inline-block text-lg font-bold mb-6"
        style={{ backgroundColor: interpretation.color, color: "white" }}
      >
        {interpretation.state} Pillar
      </div>
      <p className="text-primary/90 mb-8 text-lg leading-relaxed text-left">
        {interpretation.narrative}
      </p>

      <div className="mt-8 pt-6 border-t border-gray-200 animate-fade-in-up">
        <h3 className="text-2xl font-serif text-primary mb-4">
          Your Connection Profile Breakdown
        </h3>
        <p className="text-primary/80 mb-8 max-w-prose mx-auto">
          Here's a closer look at your alignment across the core areas of
          relational wellness. These visuals help pinpoint your strengths and
          areas for gentle focus in your relationships and connections.
        </p>
        <div className="space-y-6 text-left">
          {Object.entries(categoryScores).map(([label, score]) => (
            <div
              key={label}
              className="flex items-center gap-4 animate-fade-in-up"
            >
              <div className="flex-shrink-0 bg-accent-green/10 p-3 rounded-full">
                {ICONS[label]}
              </div>
              <div className="w-full">
                <CategoryBar label={label} score={score} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in-up">
        <h3 className="text-2xl font-serif text-primary mb-4">
          Save Your Results
        </h3>
        <p className="text-primary/80 mb-4">
          Enter your email below and we'll send a copy of your results to your
          inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-green/80 focus:outline-none disabled:bg-gray-200"
            aria-label="Email address"
            disabled={emailStatus === "sending"}
          />
          <button
            onClick={handleSendEmail}
            className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed"
            disabled={emailStatus === "sending"}
          >
            {emailStatus === "sending" ? "Sending..." : "Send to My Email"}
          </button>
        </div>
        {emailStatus === "sent" && (
          <div className="mt-6 p-6 bg-accent-green/10 rounded-xl border border-accent-green/30 text-center animate-fade-in">
            <h4 className="text-lg font-semibold text-accent-green mb-2">
              🎉 Your results have been sent!
            </h4>
            <p className="text-primary/80 mb-4">
              Check your inbox for your personalized Soul Structure insights.
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
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in-up text-center">
        <h3 className="text-2xl font-serif text-primary mb-4">
          Continue Your Journey
        </h3>
        <p className="text-primary/80 mb-6 max-w-prose mx-auto">
          This result is just the beginning. The Soul Structure Workshop offers
          a deep dive into all pillars of your being, granting you full access
          to the 7-Pillar Soul Structure Assessment, and providing the tools and
          resources to build a life of purpose and wholeness.
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
