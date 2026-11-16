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

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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
      <div className="flex items-center justify-center gap-2 mb-6">
        <img
          src="/kharis_logo.png"
          alt="Kharis Logo"
          className="h-20  object-contain"
        />
        <img
          src="/ts_logo.png"
          alt="Soul Structure Experience Logo"
          className="h-20 w-auto"
        />
      </div>
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
        Identity Pillar Assessment
      </h1>
      <p className="text-lg text-primary/80 mt-2 max-w-xl mx-auto">
        From the Soul Structure Experience
      </p>
      <p className="mt-6 max-w-prose text-primary/90 leading-relaxed">
        This confidential assessment invites you to reflect on the health of
        your relationship with yourself — your authenticity, self-worth, and
        compassion toward your own humanity. Through thoughtful questions,
        you’ll explore confidence over comparison, grace over shame, and
        alignment with who you are becoming. Your responses will reveal a
        personalized interpretation and an intentional path to nurture a
        grounded, grace-filled sense of self.
      </p>
      <p className="mt-5 max-w-prose font-serif italic text-primary/75">
        There are no right or wrong answers. Answer as you are today, not as
        you wish to be. It takes about 3 minutes.
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
        <div className="flex items-center justify-center gap-2 mb-6">
          <img
            src="/kharis_logo.png"
            alt="Kharis Logo"
            className="h-20  object-contain"
          />
          <img
            src="/ts_logo.png"
            alt="Soul Structure Experience Logo"
            className="h-20 w-auto"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
          Identity Pillar Assessment
        </h1>
        <p className="text-lg text-primary/80 mt-2 max-w-xl mx-auto">
          A self-assessment from the Soul Structure Experience
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
            onBack={currentQuestionIndex > 0 ? handleBack : undefined}
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
            &copy; {new Date().getFullYear()} Soul Structure Experience. All
            rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default App;
