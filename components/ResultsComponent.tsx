import React from 'react';
import { Result } from '../types';

interface PillarIndicatorProps {
  state: string;
  color: string;
}

const PillarIndicator: React.FC<PillarIndicatorProps> = ({ state, color }) => (
    <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
             <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: color, opacity: 0.4 }}></div>
             <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                 <div className="w-16 h-16 rounded-full" style={{ backgroundColor: color }}></div>
             </div>
        </div>
        <div 
            className="mt-4 text-xl font-bold font-serif px-5 py-1.5 rounded-full"
            style={{ color: color, backgroundColor: `${color}20` }}
        >
            {state}
        </div>
    </div>
);


interface ResultsComponentProps {
  result: Result;
  onRetake: () => void;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ result, onRetake }) => {
  const { score, interpretation } = result;

  return (
    <div className="bg-cream/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl text-center animate-fade-in border border-white/50">
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">Your Alignment Pillar</h1>
        
        <PillarIndicator state={interpretation.state} color={interpretation.color} />
        
        <p className="text-6xl font-serif font-bold" style={{ color: interpretation.color }}>
            {score.toFixed(1)}
        </p>
        <p className="text-primary/60 mb-8">Average Score</p>
      
        <div className="text-left bg-white/30 p-6 rounded-xl my-8">
            <h3 className="font-serif font-bold text-xl text-primary mb-2">A Gentle Insight:</h3>
            <p className="text-primary/80 leading-relaxed font-sans">{interpretation.narrative}</p>
        </div>

      <div className="bg-accent-green/10 border border-accent-green/20 rounded-2xl p-6 sm:p-8">
        <h3 className="text-2xl font-serif font-bold text-accent-green mb-2">Continue Your Journey</h3>
        <p className="text-primary/70 mb-5 max-w-md mx-auto">
            Alignment is the first of seven pillars. The full Soul Structure Workshop is a guided journey to wholeness.
        </p>
        <a 
            href="#" 
            className="inline-block bg-accent-green text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-accent-green/50"
            onClick={(e) => e.preventDefault()} // Placeholder link
        >
            Explore the Full Workshop
        </a>
      </div>

      <button
        onClick={onRetake}
        className="mt-8 text-primary/60 font-semibold hover:text-primary transition-colors underline decoration-dotted"
      >
        Retake the Assessment
      </button>
    </div>
  );
};

export default ResultsComponent;