'use client';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onNewQuiz: () => void;
}

export default function QuizResult({ score, totalQuestions, onRestart, onNewQuiz }: QuizResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isWin = percentage >= 60; // 60% or higher is considered a win

  const getResultMessage = () => {
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 60) return "Good work! 👍";
    if (percentage >= 40) return "Not bad! 🤔";
    return "Keep trying! 💪";
  };

  const getResultEmoji = () => {
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "😊";
    if (percentage >= 40) return "😐";
    return "😔";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-700 dark:text-green-400";
    if (percentage >= 60) return "text-blue-700 dark:text-blue-400";
    if (percentage >= 40) return "text-yellow-700 dark:text-yellow-400";
    return "text-red-700 dark:text-red-400";
  };

  const getBackgroundGradient = () => {
    if (isWin) {
      return "from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20";
    }
    return "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20";
  };

  return (
    <div className={`bg-gradient-to-br ${getBackgroundGradient()} backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8 text-center relative overflow-hidden animate-in slide-in-from-bottom-4 duration-500`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-x-12 -translate-y-12 sm:-translate-x-16 sm:-translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tl from-white/10 to-transparent rounded-full translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12"></div>

      {/* Result Header */}
      <div className="mb-6 sm:mb-8 relative z-10">
        <div className="text-6xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4 animate-bounce">{getResultEmoji()}</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
          {isWin ? "Congratulations!" : "Quiz Complete!"}
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium">
          {getResultMessage()}
        </p>
      </div>

      {/* Score Display */}
      <div className="mb-6 sm:mb-8 relative z-10">
        <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200/50 dark:border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
            {/* Score Fraction */}
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-black ${getScoreColor()} bg-gradient-to-b from-current to-current/80 bg-clip-text text-transparent`}>
                {score}/{totalQuestions}
              </div>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 font-medium">
                Correct Answers
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-16 lg:h-20 bg-gradient-to-b from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
            <div className="sm:hidden w-16 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>

            {/* Percentage */}
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-black ${getScoreColor()} bg-gradient-to-b from-current to-current/80 bg-clip-text text-transparent`}>
                {percentage}%
              </div>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 font-medium">
                Accuracy
              </div>
            </div>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <svg className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 transform -rotate-90 relative z-10 drop-shadow-lg" viewBox="0 0 36 36">
              {/* Background circle */}
              <path
                className="text-gray-300/60 dark:text-gray-600/60"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Progress circle */}
              <path
                className={`${getScoreColor()} drop-shadow-md`}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{
                  animation: 'progressFill 1.5s ease-out forwards',
                  strokeDasharray: '0, 100',
                  animationDelay: '0.5s'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center shadow-lg border border-white/30">
                <span className={`text-lg sm:text-xl lg:text-2xl font-black ${getScoreColor()}`}>
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Feedback */}
      <div className="mb-6 sm:mb-8 relative z-10">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3">
            <span className="text-xl sm:text-2xl">📊</span>
            <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
              Performance Analysis
            </h3>
          </div>
          <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            {percentage >= 90 && (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">🎓</span>
                <span>Perfect! You&apos;re a quiz master!</span>
              </div>
            )}
            {percentage >= 80 && percentage < 90 && (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">📚</span>
                <span>Excellent knowledge! You really know your stuff!</span>
              </div>
            )}
            {percentage >= 70 && percentage < 80 && (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">✨</span>
                <span>Great job! You have a solid understanding!</span>
              </div>
            )}
            {percentage >= 60 && percentage < 70 && (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">🎯</span>
                <span>Good work! You passed with flying colors!</span>
              </div>
            )}
            {percentage >= 40 && percentage < 60 && (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">📖</span>
                <span>Keep studying! You&apos;re on the right track!</span>
              </div>
            )}
            {percentage < 40 && (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">💪</span>
                <span>Don&apos;t give up! Practice makes perfect!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 sm:space-y-4 relative z-10">
        <button
          onClick={onNewQuiz}
          className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg border border-blue-400/30 backdrop-blur-sm min-h-[48px] touch-manipulation"
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <span className="text-lg sm:text-xl">🚀</span>
            <span className="text-base sm:text-lg">Start New Quiz</span>
          </div>
        </button>

        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg border border-gray-400/30 backdrop-blur-sm min-h-[48px] touch-manipulation"
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <span className="text-lg sm:text-xl">🔄</span>
            <span className="text-base sm:text-lg">Retry Same Quiz</span>
          </div>
        </button>
      </div>

      {/* Share Results */}
      <div className="mt-8 pt-6 border-t border-white/20 dark:border-gray-700/50 relative z-10">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
          Share your results:
        </p>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'PWA Preguntas Quiz Result',
                text: `I scored ${score}/${totalQuestions} (${percentage}%) on PWA Preguntas! ${getResultMessage()}`,
                url: window.location.href,
              });
            } else {
              // Fallback for browsers that don&apos;t support Web Share API
              navigator.clipboard.writeText(
                `I scored ${score}/${totalQuestions} (${percentage}%) on PWA Preguntas! ${getResultMessage()}`
              );
              alert('Result copied to clipboard!');
            }
          }}
          className="inline-flex items-center space-x-3 px-6 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
        >
          <span className="text-lg">📱</span>
          <span>Share Result</span>
        </button>
      </div>
    </div>
  );
}
