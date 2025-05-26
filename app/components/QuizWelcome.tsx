'use client';

interface QuizWelcomeProps {
  onStartQuiz: () => void;
  questionsPerQuiz?: number;
}

export default function QuizWelcome({ onStartQuiz, questionsPerQuiz = 5 }: QuizWelcomeProps) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-center">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8">
        <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🧠</div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to PWA Preguntas!
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
          Test your knowledge with our interactive quiz
        </p>
      </div>

      {/* Quiz Info */}
      <div className="mb-6 sm:mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
            How it works:
          </h2>
          <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-blue-800 dark:text-blue-200">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <span className="text-lg sm:text-xl lg:text-2xl">📝</span>
              <span>Answer {questionsPerQuiz} random questions</span>
            </div>
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <span className="text-lg sm:text-xl lg:text-2xl">🔀</span>
              <span>Multiple choice with shuffled options</span>
            </div>
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <span className="text-lg sm:text-xl lg:text-2xl">🎯</span>
              <span>Get 60% or higher to win!</span>
            </div>
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <span className="text-lg sm:text-xl lg:text-2xl">📱</span>
              <span>Works offline as a PWA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="text-xl sm:text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
              Fast & Fun
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Quick questions, instant feedback
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="text-xl sm:text-2xl mb-2">🌟</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
              Varied Topics
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Geography, science, history & more
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="text-xl sm:text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
              Track Progress
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              See your score and accuracy
            </p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onStartQuiz}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] touch-manipulation"
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <span className="text-lg sm:text-xl lg:text-2xl">🚀</span>
            <span className="text-base sm:text-lg">Start Quiz</span>
          </div>
        </button>
      </div>

      {/* Tips */}
      <div className="text-center">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 sm:p-4">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 text-sm sm:text-base">
            💡 Pro Tips:
          </h3>
          <div className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <p>• Read each question carefully</p>
            <p>• Take your time - there&apos;s no rush!</p>
            <p>• You can restart anytime</p>
            <p>• Install this app for offline play</p>
          </div>
        </div>
      </div>

      {/* PWA Install Hint */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>📱</span>
          <span className="text-center">Add to home screen for the best experience!</span>
        </div>
      </div>
    </div>
  );
}
