import React from "react";
import { AssessmentQuestion } from "../types";

interface QuestionComponentProps {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (score: number) => void;
  currentAnswer?: number;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({
  current,
  total,
}) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-gray-200/50 rounded-full h-2 mb-4 overflow-hidden">
      <div
        className="bg-accent-green h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  currentAnswer,
}) => {
  const ratings = [
    { score: 1, label: "Strongly Disagree" },
    { score: 2, label: "Disagree" },
    { score: 3, label: "Neutral / Unsure" },
    { score: 4, label: "Agree" },
    { score: 5, label: "Strongly Agree" },
  ];

  return (
    <div className="bg-cream/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl w-full animate-fade-in border border-white/50">
      <ProgressBar current={questionNumber} total={totalQuestions} />
      <p className="text-sm font-semibold text-accent-green mb-2 tracking-wider">
        QUESTION {questionNumber} / {totalQuestions}
      </p>
      <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-10 leading-tight">
        {question.text}
      </h2>

      <div className="space-y-3">
        {ratings.map(({ score, label }, index) => (
          <button
            key={score}
            onClick={() => onAnswer(score)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-green/80 animate-fade-in-up ${
              currentAnswer === score
                ? "bg-accent-green border-accent-green text-white shadow-lg"
                : "bg-white/50 border-gray-200 text-primary hover:bg-white hover:border-accent-green/50 hover:shadow-md"
            }`}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <span className="font-bold mr-4 text-base">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
