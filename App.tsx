import React, { useState } from "react";
import QuestionComponent from "./components/QuestionComponent.tsx";
import ResultsComponent from "./components/ResultsComponent.tsx";
import {
  ASSESSMENT_QUESTIONS,
  ASSESSMENT_CATEGORIES,
  getInterpretationByScore,
} from "./constants.ts";
import { Result } from "./types.ts";

const App: React.FC = () => {
  const [appState, setAppState] = useState<"home" | "assessment">("home");
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = score;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateResult(newAnswers);
      }
    }, 300);
  };

  const calculateResult = (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((sum, score, index) => {
      const question = ASSESSMENT_QUESTIONS[index];
      const adjustedScore = question.reverseCoded ? 6 - score : score;
      return sum + adjustedScore;
    }, 0);

    const averageScore = totalScore / ASSESSMENT_QUESTIONS.length;
    const interpretation = getInterpretationByScore(averageScore);

    const categoryScores: { [key: string]: number } = {};
    for (const category in ASSESSMENT_CATEGORIES) {
      const questionIndices = ASSESSMENT_CATEGORIES[category];
      const categoryTotal = questionIndices.reduce((sum, index) => {
        const question = ASSESSMENT_QUESTIONS[index];
        const score = finalAnswers[index];
        const adjustedScore = question.reverseCoded ? 6 - score : score;
        return sum + adjustedScore;
      }, 0);
      categoryScores[category] = categoryTotal / questionIndices.length;
    }

    setResult({
      score: averageScore,
      interpretation: interpretation,
      categoryScores: categoryScores,
    });
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setResult(null);
    setAppState("home");
  };

  const handleStart = () => {
    setAppState("assessment");
  };

  const renderHomeScreen = () => (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center p-8 bg-cream/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
      <img
        src="/ts_logo.png"
        alt="Soul Structure Workshop Logo"
        className="w-30 h-[200px]"
      />
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
        Connection Pillar Assessment
      </h1>
      <p className="text-lg text-primary/80 mt-2 max-w-xl mx-auto">
        From the Soul Structure Workshop
      </p>
      <p className="mt-6 max-w-prose text-primary/90 leading-relaxed">
        This confidential assessment invites you to reflect on the health of your
        connections — the depth, safety, and reciprocity in your relationships.
        Through thoughtful questions, you’ll explore how you give and receive
        love, set boundaries, and experience belonging. Your responses will
        reveal a personalized interpretation and an intentional action plan to
        nurture balance, authenticity, and mutual care in your relational world.
      </p>
      <button
        onClick={handleStart}
        className="mt-8 bg-accent-green text-white font-bold py-3 px-10 rounded-xl text-lg hover:bg-accent-green/90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-green/80"
      >
        Begin the Journey
      </button>
    </div>
  );

  const renderAssessment = () => (
    <>
      <header className="text-center mb-8 animate-fade-in">
        <div className="inline-block mb-2">
          <img
            src="/ts_logo.png"
            alt="Soul Structure Workshop Logo"
            className="w-30 h-[200px]"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
          Strength Pillar Assessment
        </h1>
        <p className="text-lg text-primary/80 mt-2 max-w-xl mx-auto">
          A self-assessment from the Soul Structure Workshop
        </p>
      </header>
      <div className="relative">
        {!result ? (
          <QuestionComponent
            key={currentQuestionIndex}
            question={ASSESSMENT_QUESTIONS[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={ASSESSMENT_QUESTIONS.length}
            onAnswer={handleAnswer}
            currentAnswer={answers[currentQuestionIndex]}
          />
        ) : (
          <ResultsComponent result={result} onRestart={handleRestart} />
        )}
      </div>
    </>
  );

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        {appState === "home" ? renderHomeScreen() : renderAssessment()}
        <footer className="text-center mt-8 text-primary/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Soul Structure Workshop. All
            rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default App;
