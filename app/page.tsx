'use client';

import { useState } from 'react';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import QuizWelcome from './components/QuizWelcome';

type GameState = 'welcome' | 'playing' | 'results';

interface QuizScore {
  score: number;
  totalQuestions: number;
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [quizScore, setQuizScore] = useState<QuizScore>({ score: 0, totalQuestions: 5 });
  const questionsPerQuiz = 5;

  const handleStartQuiz = () => {
    setGameState('playing');
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    setQuizScore({ score, totalQuestions });
    setGameState('results');
  };

  const handleRestart = () => {
    setGameState('playing');
  };

  const handleNewQuiz = () => {
    setGameState('welcome');
  };

  const renderCurrentView = () => {
    switch (gameState) {
      case 'welcome':
        return (
          <QuizWelcome
            onStartQuiz={handleStartQuiz}
            questionsPerQuiz={questionsPerQuiz}
          />
        );

      case 'playing':
        return (
          <Quiz
            onQuizComplete={handleQuizComplete}
            questionsPerQuiz={questionsPerQuiz}
          />
        );

      case 'results':
        return (
          <QuizResult
            score={quizScore.score}
            totalQuestions={quizScore.totalQuestions}
            onRestart={handleRestart}
            onNewQuiz={handleNewQuiz}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderCurrentView()}
    </div>
  );
}
