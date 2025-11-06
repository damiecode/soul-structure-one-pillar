import React from "react";
import { AssessmentQuestion } from "../types";

interface QuestionComponentProps {
  question: AssessmentQuestion; // Changed from string to AssessmentQuestion
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (score: number) => void;
  currentAnswer?: number;
}

const ratings = [
  { score: 5, label: "Strongly Agree" },
  { score: 4, label: "Agree" },
  { score: 3, label: "Neutral / Unsure" },
  { score: 2, label: "Disagree" },
  { score: 1, label: "Strongly Disagree" },
];

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  currentAnswer,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Question {questionNumber} of {totalQuestions}
      </h2>
      <p className="text-base text-gray-700">{question.text}</p>{" "}
      {/* Changed from {question} to {question.text} */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        {ratings.map(({ score, label }) => (
          <button
            key={score}
            onClick={() => onAnswer(score)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition
              ${
                currentAnswer === score
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
