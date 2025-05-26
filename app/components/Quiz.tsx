'use client';

import { useState, useEffect } from 'react';
import { Question, getRandomQuestion, getShuffledOptions } from '@/lib/getRandomQuestion';

interface QuizProps {
  onQuizComplete: (score: number, totalQuestions: number) => void;
  questionsPerQuiz?: number;
}

interface QuizState {
  currentQuestion: Question | null;
  shuffledOptions: string[];
  correctAnswerIndex: number;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean;
  score: number;
  questionNumber: number;
  usedQuestionIds: number[];
  isLoading: boolean;
  error: string | null;
}

export default function Quiz({ onQuizComplete, questionsPerQuiz = 5 }: QuizProps) {
  const [state, setState] = useState<QuizState>({
    currentQuestion: null,
    shuffledOptions: [],
    correctAnswerIndex: -1,
    selectedAnswer: null,
    showResult: false,
    isCorrect: false,
    score: 0,
    questionNumber: 1,
    usedQuestionIds: [],
    isLoading: true,
    error: null,
  });

  const loadNextQuestion = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const question = await getRandomQuestion(state.usedQuestionIds);

      if (!question) {
        setState(prev => ({ ...prev, error: 'No more questions available', isLoading: false }));
        return;
      }

      const { options, correctAnswerIndex } = getShuffledOptions(question);

      setState(prev => ({
        ...prev,
        currentQuestion: question,
        shuffledOptions: options,
        correctAnswerIndex,
        selectedAnswer: null,
        showResult: false,
        isLoading: false,
        usedQuestionIds: [...prev.usedQuestionIds, question.id],
      }));
    } catch (err) {
      console.error('Error loading question:', err);
      setState(prev => ({
        ...prev,
        error: 'Failed to load question. Please try again.',
        isLoading: false
      }));
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (state.showResult || state.selectedAnswer !== null) return;

    setState(prev => ({ ...prev, selectedAnswer: answerIndex }));

    // Add a small delay for better UX
    setTimeout(() => {
      const isCorrect = answerIndex === state.correctAnswerIndex;

      setState(prev => ({
        ...prev,
        showResult: true,
        isCorrect,
        score: isCorrect ? prev.score + 1 : prev.score,
      }));
    }, 300);
  };

  const handleNextQuestion = () => {
    if (state.questionNumber >= questionsPerQuiz) {
      // Quiz complete
      onQuizComplete(state.score, questionsPerQuiz);
      return;
    }

    setState(prev => ({
      ...prev,
      questionNumber: prev.questionNumber + 1,
    }));

    loadNextQuestion();
  };

  const handleRestartQuiz = () => {
    setState({
      currentQuestion: null,
      shuffledOptions: [],
      correctAnswerIndex: -1,
      selectedAnswer: null,
      showResult: false,
      isCorrect: false,
      score: 0,
      questionNumber: 1,
      usedQuestionIds: [],
      isLoading: true,
      error: null,
    });
    loadNextQuestion();
  };

  useEffect(() => {
    loadNextQuestion();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.isLoading) {
    return (
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/20 dark:border-gray-700/50">
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-200 dark:border-blue-800"></div>
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Loading your question...
            </h3>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Preparing something interesting for you! 🧠
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/20 dark:border-gray-700/50">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🤔</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Something went wrong
          </h3>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8">
            <p className="text-red-700 dark:text-red-300 text-lg font-medium">{state.error}</p>
          </div>
          <button
            onClick={handleRestartQuiz}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="flex items-center">
              <span className="mr-2">🔄</span>
              Try Again
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (!state.currentQuestion) {
    return null;
  }

  const getOptionClassName = (index: number) => {
    const baseClasses = "w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 min-h-[48px] touch-manipulation";

    if (!state.showResult) {
      const isSelected = state.selectedAnswer === index && !state.showResult;
      return `${baseClasses} ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 shadow-lg scale-105'
          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600'
      } text-gray-900 dark:text-white`;
    }

    if (index === state.correctAnswerIndex) {
      return `${baseClasses} border-green-500 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 animate-pulse shadow-lg`;
    }

    if (index === state.selectedAnswer && !state.isCorrect) {
      return `${baseClasses} border-red-500 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 animate-pulse shadow-lg`;
    }

    return `${baseClasses} border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 opacity-60`;
  };

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 dark:border-gray-700/50 transform transition-all duration-500 hover:shadow-3xl">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 space-y-2 sm:space-y-0">
          <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full">
            Question {state.questionNumber} of {questionsPerQuiz}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 sm:px-3 py-1 rounded-full">
            Score: {state.score}/{state.questionNumber - 1}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden"
            style={{ width: `${(state.questionNumber / questionsPerQuiz) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 sm:p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-relaxed">
            {state.currentQuestion.question}
          </h2>
          <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 lg:mb-10">
        {state.shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={state.showResult}
            className={getOptionClassName(index)}
          >
            <span className="flex items-center text-sm sm:text-base">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 mr-4 shadow-lg border-2 border-white dark:border-gray-800 transition-all duration-300">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-lg leading-relaxed">{option}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Result Feedback */}
      {state.showResult && (
        <div className="mb-8 transform animate-in slide-in-from-bottom-4 duration-500">
          <div className={`p-6 rounded-2xl border-2 shadow-lg ${
            state.isCorrect
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700'
              : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-300 dark:border-red-700'
          }`}>
            <div className="flex items-center">
              <span className="text-4xl mr-4 animate-bounce">
                {state.isCorrect ? '🎉' : '💭'}
              </span>
              <div className="flex-1">
                <p className={`font-bold text-xl mb-1 ${
                  state.isCorrect
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {state.isCorrect ? 'Excellent!' : 'Not quite right!'}
                </p>
                {!state.isCorrect && (
                  <p className="text-base text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mt-2 border border-red-200 dark:border-red-800">
                    💡 The correct answer was: <span className="font-semibold">{state.shuffledOptions[state.correctAnswerIndex]}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Question Button */}
      {state.showResult && (
        <button
          onClick={handleNextQuestion}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-lg"
        >
          <span className="flex items-center justify-center">
            {state.questionNumber >= questionsPerQuiz ? (
              <>
                <span className="mr-2">🏁</span>
                Finish Quiz
              </>
            ) : (
              <>
                Next Question
                <span className="ml-2">→</span>
              </>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
