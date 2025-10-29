import { projects } from '../data/projects';
import { internships } from '../data/internships';
import { useEffect, useState, useMemo, useCallback } from 'react';

const HomeSection = ({ startAutoScroll }) => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width:1024px)').matches
      : true
  );
  const [fullText, setFullText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Define text sequences with timing
  const getSequence = useCallback(() => {
    const typingSpeed = 100; // Base typing speed (ms per char)
    return isDesktop
      ? [
          { text: "Welcome to Nilesh Somani's", delay: typingSpeed, pauseAfter: 300 },
          { text: 'Developer Portfolio', delay: typingSpeed, isHighlight: true },
        ]
      : [
          { text: 'Welcome to', delay: typingSpeed, pauseAfter: 200 },
          { text: "Nilesh Somani's", delay: typingSpeed, pauseAfter: 200 },
          { text: 'Developer Portfolio', delay: typingSpeed, isHighlight: true },
        ];
  }, [isDesktop]);

  const sequence = useMemo(() => getSequence(), [getSequence]);

  // Watch for screen size change (desktop ↔ mobile)
  useEffect(() => {
    const mq = window.matchMedia('(min-width:1024px)');
    const onChange = () => {
      setIsDesktop(mq.matches);
      setFullText('');
      setIsTyping(true);
    };
    mq.addEventListener?.('change', onChange);
    if (!mq.addEventListener) mq.addListener(onChange); // fallback
    return () => {
      mq.removeEventListener?.('change', onChange);
      if (!mq.removeEventListener) mq.removeListener(onChange);
    };
  }, []);

  // Typing effect logic
  useEffect(() => {
    let timer;
    const typingSpeed = sequence[0].delay;
    const targetText = sequence.map(s => s.text).join('');

    if (!isTyping) {
      // Erasing mode
      if (fullText.length > 0) {
        timer = setTimeout(() => {
          setFullText(prev => prev.slice(0, -1));
        }, typingSpeed / 2);
      } else {
        timer = setTimeout(() => {
          setIsTyping(true);
        }, 800);
      }
    } else if (fullText.length === targetText.length) {
      // Pause when typing completes
      timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    } else {
      // Add one character at a time
      timer = setTimeout(() => {
        setFullText(targetText.slice(0, fullText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [isTyping, fullText, sequence]);

  // Count unique technologies
  const getTechCount = () => {
    const techSet = new Set();
    projects.forEach(project => {
      project.tech?.forEach(tech => techSet.add(tech));
    });
    internships.forEach(internship => {
      internship.tech?.forEach(tech => techSet.add(tech));
    });
    return techSet.size;
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-24 pb-3 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20 parallax-layer will-change-transform"
        aria-hidden
      >
        <img
          src="/images/hero.jpg"
          alt="Background"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="max-w-screen-xl lg:max-w-screen-2xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pb-10 lg:pb-0">
        {/* LEFT: Text Content */}
        <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
          <div className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-lg p-4 sm:p-6 max-w-full lg:max-w-2xl xl:max-w-3xl mx-auto">
            <div className="text-cyan-400 text-xs sm:text-sm mb-2 no-autoscroll">
              SYSTEM MESSAGE
            </div>

            {/* FIXED TYPEWRITER SECTION */}
            <div
              className="game-dialogue text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
              role="status"
              aria-live="polite"
              style={{
                minWidth: isDesktop ? "580px" : "300px", // Adjust these values based on your text length
                minHeight: isDesktop ? "80px" : "120px"  // Adjust for 2 lines in desktop, 3 in mobile
              }}
            >
              <div className="typewriter no-select w-full">
                {(() => {
                  let remaining = fullText;
                  return sequence.map((lineConfig, idx) => {
                    const lineText = remaining.slice(0, lineConfig.text.length);
                    remaining = remaining.slice(lineConfig.text.length);
                    return (
                      <span
                        key={idx}
                        className={`block ${
                          lineConfig.isHighlight ? 'text-cyan-400' : ''
                        }`}
                      >
                        {lineText}
                        {/* Cursor appears only at the end */}
                        {idx === sequence.length - 1 &&
                          remaining.length === 0 && (
                            <span className="typewriter-cursor">|</span>
                          )}
                      </span>
                    );
                  });
                })()}
              </div>
            </div>

            <div className="text-gray-300 text-sm sm:text-base mb-6">
              Full Stack Developer • Game Enthusiast
            </div>

            <div className="flex items-center space-x-4 flex-wrap">
              {/* Press Start with tooltip placed directly above the button */}
              <div className="group relative inline-block">
                <button
                  onClick={startAutoScroll}
                  className="retro-start bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded font-bold text-black hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 cursor-pointer whitespace-nowrap !rounded-button animate-pulse text-center items-center"
                  aria-label="Press Start - Begin Auto Scroll"
                >
                  <img src="/images/icons/home/play.png" length={16} width={16} alt="Press Start" className="inline-block mr-2"/> PRESS START
                </button>
                <div className="tooltip">
                  Click to begin your cyberpunk journey through my portfolio
                </div>
              </div>

              {/* Download Resume button (downloads from local /resume/Resume.pdf) */}
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume/Resume.pdf";
                  link.download = "Nilesh_Somani_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="retro-start inline-block bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded font-bold text-black hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 cursor-pointer whitespace-nowrap animate-pulse shadow-lg sm:mt-0 mt-2"
                aria-label="Download Resume"
              >
                <img src="/images/icons/home/download.png" length={16} width={16} alt="Download Resume" className="inline-block mr-2"/> DOWNLOAD RESUME
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {projects.length > 0 && (
            <div className="bg-black bg-opacity-60 border border-cyan-400 rounded p-2 sm:p-4 text-center">
              <div className="text-cyan-400 text-lg sm:text-2xl font-bold">
                {projects.length}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-300">
                PROJECTS COMPLETED
              </div>
            </div>
            )}
            {internships.length > 0 && (
            <div className="bg-black bg-opacity-60 border border-cyan-400 rounded p-2 sm:p-4 text-center">
              <div className="text-cyan-400 text-lg sm:text-2xl font-bold">
                {getTechCount()}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-300">
                TECHNOLOGIES
              </div>
            </div>
            )}
          </div>
        </div>

        {/* RIGHT: Avatar */}
        <div className="flex justify-center order-1 lg:order-2 mt-13 lg:mt-0">
          <div className="relative">
            <img
              src="/images/profile.jpg"
              alt="Developer Avatar"
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover object-top rounded-full border-4 border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-[70px] right-5 sm:top-16 sm:right-10 lg:top-20 lg:right-20 animate-bounce">
        <div className="bg-yellow-400 text-black p-1 sm:p-2 rounded-full">
          <img src="/images/icons/home/code.png" className="w-6 h-6" alt="Code Icon"></img>
        </div>
      </div>

      <div className="absolute bottom-[10px] left-5 sm:bottom-5 sm:left-10 lg:bottom-3 lg:left-10 animate-bounce">
        <div className="bg-yellow-400 text-black p-1 sm:p-2 rounded-full">
          <img src="/images/icons/home/rocket.png" className="w-6 h-6" alt="Rocket Icon"></img>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
