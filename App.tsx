import React, { useState, useCallback } from 'react';
import { ASSESSMENT_QUESTIONS, getInterpretationByScore } from './constants';
import QuestionComponent from './components/QuestionComponent';
import ResultsComponent from './components/ResultsComponent';
import { Result } from './types';

type AppState = 'start' | 'assessment' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('start');
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const handleStart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setResult(null);
    setAppState('assessment');
  };

  const handleAnswer = useCallback((score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = score;
    setAnswers(newAnswers);

    setTimeout(() => {
        if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            calculateResults(newAnswers);
            setAppState('results');
        }
    }, 300);
  }, [answers, currentQuestionIndex]);

  const calculateResults = (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((sum, score, index) => {
      const question = ASSESSMENT_QUESTIONS[index];
      const adjustedScore = question.reverseCoded ? 6 - score : score;
      return sum + adjustedScore;
    }, 0);

    const averageScore = totalScore / ASSESSMENT_QUESTIONS.length;
    const interpretation = getInterpretationByScore(averageScore);
    
    setResult({
      score: parseFloat(averageScore.toFixed(2)),
      interpretation,
    });
  };

  const renderContent = () => {
    switch (appState) {
      case 'assessment':
        return (
          <QuestionComponent
            key={currentQuestionIndex}
            question={ASSESSMENT_QUESTIONS[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={ASSESSMENT_QUESTIONS.length}
            onAnswer={handleAnswer}
            currentAnswer={answers[currentQuestionIndex]}
          />
        );
      case 'results':
        return result ? <ResultsComponent result={result} onRetake={handleStart} /> : <p>Calculating results...</p>;
      case 'start':
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => (
    <div className="text-center bg-cream/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl border border-white/50 animate-fade-in">
        <div className="flex justify-center items-center mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-accent-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-2">Soul Structure</h1>
        <h2 className="text-xl sm:text-2xl font-serif text-accent-green mb-6">Pillar 1: Alignment</h2>
        <p className="text-primary/80 mb-10 leading-relaxed max-w-prose mx-auto">
            This pillar explores your spiritual alignment — your intimacy with God, emotional security in His love, and the congruence between your beliefs and your relationship with Him.
            <br/><br/>
            This short, reflective assessment is a gentle mirror, not a measure of worth. Answer honestly to begin the journey.
        </p>
        <button
            onClick={onStart}
            className="bg-accent-green text-white font-bold text-lg py-3 px-12 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-accent-green/50"
        >
            Begin Assessment
        </button>
    </div>
);


export default App;