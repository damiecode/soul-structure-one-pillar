import React, { useState } from "react";
import { Result } from "../types";
import CategoryBar from "./CategoryBar.tsx";
import { buildSoulStructureEmail } from "./emailTemplate.ts";

interface ResultsComponentProps {
  result: Result;
  onRestart: () => void;
}

const ICONS: { [key: string]: React.ReactNode } = {
  Nourishment: (
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
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Movement: (
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
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  "Rest & Recovery": (
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
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  ),
  "Body Mindset": (
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
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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
    const subject = "Your Soul Structure: Strength Pillar Results";

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
          Your Strength Profile Breakdown
        </h3>
        <p className="text-primary/80 mb-8 max-w-prose mx-auto">
          Here’s a closer look at your alignment across the core areas of
          physical wellness. These visuals help pinpoint your strengths and
          areas for gentle focus.
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
          Your results are just the beginning. The full Soul Structure Workshop
          offers a deep dive into all pillars of your being, providing the tools
          and community to build a life of purpose and wholeness.
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
