import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { projects } from '../data/projects';
import { internships } from '../data/internships';
import { jobs } from '../data/jobs';

const Navigation = ({ currentSection, setCurrentSection }) => {
  const [showDialogue, setShowDialogue] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  let navArray = [];
  if (projects && projects.length > 0) navArray.push('projects');
  if (jobs && jobs.length > 0) {
    navArray.push('jobs');
  } else if (internships && internships.length > 0) {
    navArray.push('internships');
  }
  navArray = ['home', 'about', ...navArray, 'contact'];
  useIntersectionObserver(
    navArray,
    setCurrentSection
  );
  let navigationItems = [];
  if (projects?.length > 0 && (jobs?.length > 0 || internships?.length > 0)) {
    navigationItems = [
      { id: 'home', label: 'Home'},
      { id: 'about', label: 'About'},
      { id: 'projects', label: 'Projects'},
      jobs?.length > 0
        ? { id: 'jobs', label: 'Jobs'}
        : { id: 'internships', label: 'Internships'},
      { id: 'contact', label: 'Contact'},
    ];
  } else {
    if (projects?.length > 0) {
      navigationItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
      ];
    } else if ((jobs?.length > 0 || internships?.length > 0)) {
      navigationItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        jobs?.length > 0
          ? { id: 'jobs', label: 'Jobs'}
          : { id: 'internships', label: 'Internships'},
        { id: 'contact', label: 'Contact' },
      ];
    } else {
      navigationItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' },
      ];
    }
  }
  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') scrollToSection(id);
  };

  const navRef = useRef(null);

  useEffect(() => {
    if (!showDialogue) return;

    const onDocClick = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setShowDialogue(false);
      }
    };

    const onScroll = () => setShowDialogue(false);

    document.addEventListener('click', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, [showDialogue]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-90 border-b-2 border-cyan-400"
    >
      {/* container */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* flex wrapper */}
        <div className="flex items-center justify-between py-3">
          {/* Left: Brand name */}
          <div className="flex items-center space-x-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
              className="text-cyan-400 font-extrabold text-lg select-none no-underline"
            >
              Nilesh Somani
            </a>
          </div>

          {/* Right: Desktop navigation + toggle */}
          <div className="flex items-center gap-x-6">
            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-x-4 lg:gap-x-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onKeyDown={(e) => handleNavKey(e, item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded transition-all duration-200 cursor-pointer whitespace-nowrap !rounded-button ${currentSection === item.id
                    ? "bg-cyan-400 text-black"
                    : "text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    }`}
                  aria-current={currentSection === item.id ? 'page' : undefined}
                >
                  <img
                    src={
                      currentSection === item.id || hoveredItem === item.id
                        ? `/images/icons/nav/${item.id}-black.png`
                        : `/images/icons/nav/${item.id}-cyan.png`
                    }
                    alt={item.label}
                    width={16}
                    height={16}
                  />
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile hamburger toggle */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowDialogue(!showDialogue)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  setShowDialogue(!showDialogue);
              }}
              aria-label="Toggle menu"
              aria-expanded={showDialogue}
              aria-controls="mobile-nav"
              className="md:hidden p-2 flex items-center"
            >
              <div
                className={`hamburger ${showDialogue ? 'open' : ''}`}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav"
          className={`absolute top-full left-0 right-0 bg-black bg-opacity-90 border-b-2 border-cyan-400 md:hidden transition-all duration-300 ${showDialogue ? "block" : "hidden"
            }`}
          aria-hidden={!showDialogue}
        >
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setShowDialogue(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 cursor-pointer whitespace-nowrap !rounded-button ${currentSection === item.id
                ? "bg-cyan-400 text-black"
                : "text-cyan-400 hover:bg-cyan-400 hover:text-black"
                }`}
            >
              <i className={`${item.icon}`}></i>
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
