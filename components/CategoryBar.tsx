import React from "react";
import { getInterpretationByScore } from "../constants";

interface CategoryBarProps {
  label: string;
  score: number;
}

const MAX_VALUE = 5;

const CategoryBar: React.FC<CategoryBarProps> = ({ label, score }) => {
  const percentage = (score / MAX_VALUE) * 100;
  const interpretation = getInterpretationByScore(score);
  const color = interpretation.color;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="font-sans font-bold text-primary">{label}</span>
        <span className="font-sans text-sm font-semibold text-primary/80">
          {score.toFixed(1)} / {MAX_VALUE}
        </span>
      </div>
      <div className="w-full bg-gray-200/80 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className="h-4 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={MAX_VALUE}
          aria-label={`${label} score`}
        ></div>
      </div>
    </div>
  );
};

export default CategoryBar;
