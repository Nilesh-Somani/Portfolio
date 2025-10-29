const StatusBar = ({ isScrolled, showStatusBar, animatedXpProgress }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-black transition-all duration-500 ${isScrolled && !showStatusBar
        ? "translate-y-full opacity-0"
        : "translate-y-0 opacity-100"
        } border-t-2 border-cyan-400 bg-opacity-90`}
      data-status-bar
    >
      <div className="max-w-screen-xl lg:max-w-screen-2xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Left: site title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-cyan-400 font-bold text-base sm:text-lg lg:text-xl">
              Nilesh-Somani.Dev
            </div>
          </div>

          {/* Right: XP icon, bar and XP number aligned horizontally */}
          <div className="flex items-center space-x-3">
            <img src="/images/icons/status/heart.png" alt="Heart Icon" width={16} height={16}/>
            <div className="flex items-center space-x-2">
              <div className="w-24 sm:w-28 lg:w-32 h-3 bg-gray-800 border border-gray-600 rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-yellow-500"
                  style={{ width: `${Math.max(animatedXpProgress, 0)}%` }}
                ></div>
              </div>
              <span className="text-[10px] sm:text-xs text-cyan-400 whitespace-nowrap">
                XP: {Math.floor(animatedXpProgress)}/100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;