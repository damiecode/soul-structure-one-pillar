import React, { useState } from "react";
import { Result } from "../types";
import { buildSoulStructureEmail } from "./emailTemplate.ts";
import CategoryBar from "./CategoryBar.tsx";
import { getFocusArea } from "../constants.ts";

const WORKSHOP_URL = "https://tosinsanni.com/soul-structure-experience/";

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
  const focus = getFocusArea(categoryScores);

  const handleSendEmail = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !email.includes("@")) {
      setStatusMessage("Please enter a valid email address.");
      setEmailStatus("error");
      return;
    }

    setEmailStatus("sending");
    setStatusMessage("");

    const htmlBody = buildSoulStructureEmail(
      interpretation,
      categoryScores,
      name
    );

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Your Soul Structure: Identity Pillar Results",
          html: htmlBody,
          name: name.trim() || undefined,
        }),
      });

      if (!response.ok) throw new Error("Server responded with an error.");
      setEmailStatus("sent");
    } catch (error) {
      console.error("Failed to send email:", error);
      setEmailStatus("error");
      setStatusMessage("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <div className="bg-cream/80 backdrop-blur-sm p-6 sm:p-12 rounded-3xl shadow-xl w-full animate-fade-in border border-white/50">
      {/* Result */}
      <div className="text-center">
        <p className="text-sm font-semibold text-accent-green tracking-wider">
          YOUR IDENTITY PILLAR
        </p>
        <h2 className="mt-3 text-4xl sm:text-5xl font-serif text-primary flex items-center justify-center gap-3">
          <span
            className="inline-block w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: interpretation.color }}
            aria-hidden="true"
          ></span>
          {interpretation.state}
        </h2>
      </div>

      <p className="mt-6 font-serif text-lg leading-relaxed text-primary/90">
        {interpretation.narrative}
      </p>

      {/* Breakdown */}
      <div className="mt-10">
        <h3 className="text-xl font-serif text-primary">
          Your identity profile
        </h3>
        <p className="text-sm text-primary/60 mt-1 mb-5">
          How you scored across each area, on a scale of 1 to 5.
        </p>
        <div className="space-y-5">
          {Object.entries(categoryScores).map(([label, score]) => (
            <CategoryBar key={label} label={label} score={score} />
          ))}
        </div>
      </div>

      {/* Reflection */}
      {focus.prompt && (
        <div className="mt-10 rounded-2xl bg-accent-green/10 p-6">
          <p className="text-xs font-semibold tracking-wider text-accent-green uppercase">
            A gentle practice for {focus.category}
          </p>
          <p className="mt-2 font-serif text-lg leading-relaxed text-primary">
            {focus.prompt}
          </p>
        </div>
      )}

      {/* Email */}
      <div className="mt-10 rounded-2xl bg-white/70 border border-gray-200 p-6 sm:p-8">
        {emailStatus !== "sent" ? (
          <>
            <h3 className="text-xl font-serif text-primary text-center">
              Keep a copy of your results
            </h3>
            <p className="text-primary/70 mt-2 mb-5 text-center">
              We'll email you your full results to return to whenever you need
              them.
            </p>
            <form onSubmit={handleSendEmail} className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                autoComplete="given-name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-green/80 focus:outline-none disabled:bg-gray-200 text-lg"
                aria-label="Your first name"
                disabled={emailStatus === "sending"}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailStatus === "error") setEmailStatus("idle");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-green/80 focus:outline-none disabled:bg-gray-200 text-lg"
                aria-label="Email address"
                disabled={emailStatus === "sending"}
              />
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed text-lg"
                disabled={emailStatus === "sending"}
              >
                {emailStatus === "sending" ? "Sending…" : "Email my results"}
              </button>
            </form>
            {emailStatus === "error" && statusMessage && (
              <p className="mt-3 text-red-600 font-medium text-center">
                {statusMessage}
              </p>
            )}
            <p className="mt-4 text-sm text-primary/55 text-center">
              If you don't see it soon, check your promotions or spam folder.
            </p>
          </>
        ) : (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-serif text-primary">
              Your results are on their way
            </h3>
            <p className="text-primary/70 mt-2">
              Check your inbox — and your promotions or spam folder, just in
              case.
            </p>
          </div>
        )}
      </div>

      {/* Continue */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <h3 className="text-2xl font-serif text-primary mb-3">
          Continue your journey
        </h3>
        <p className="text-primary/80 mb-6 max-w-prose mx-auto">
          Identity is one of seven pillars. The Soul Structure Experience gives
          you full access to the 7-Pillar Soul Structure Assessment, with the
          tools and support to build a life of purpose and wholeness.
        </p>
        <a
          href={WORKSHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent-gold text-white font-bold py-3 px-10 rounded-xl text-lg hover:bg-accent-gold/90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-gold/80"
        >
          Join the experience
        </a>
        <div className="mt-8">
          <button
            onClick={onRestart}
            className="text-primary/60 font-semibold py-2 px-6 rounded-xl hover:bg-primary/10 transition-all duration-300"
          >
            Take the assessment again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsComponent;
