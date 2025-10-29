import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// data
import { jobs } from './data/jobs';

// Components
import Navigation from './components/Navigation';
import StatusBar from './components/StatusBar';
import Footer from './components/Footer';

// Sections
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import InternshipsSection from './sections/InternshipsSection';
import JobSection from './sections/JobSection';
import ContactSection from './sections/ContactSection';

// Hooks
import useAutoScroll from './hooks/useAutoScroll';

// A clean App component you can copy into App.jsx
export default function AppClean() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('home');
  const [xpProgress, setXpProgress] = useState(0);
  const [animatedXpProgress, setAnimatedXpProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Auto-scroll refs
  const isAutoScrolling = useRef(false);
  const autoScrollTimer = useRef(null);
  const cancelListenerAttached = useRef(false);
  const scrollInitiatedByScript = useRef(false);

  // Hold reading time estimator provided by the hook
  const readingTimeEstimatorRef = useRef(() => 1000);

  // Provide a callback to receive estimator from hook
  useAutoScroll((estimator) => {
    if (typeof estimator === 'function') {
      readingTimeEstimatorRef.current = estimator;
    }
  });

  // Scroll handler to update xp and parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 || 0;
      setXpProgress(scrolled);
      setIsScrolled(window.scrollY > 50);

      const bg = document.querySelector('.parallax-layer');
      if (bg) bg.style.transform = `translateY(${window.scrollY * 0.08}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate XP progress smoothly
  useEffect(() => {
    let frameId;
    const animate = () => {
      setAnimatedXpProgress(prev => {
        const diff = xpProgress - prev;
        const step = diff * 0.2;
        if (Math.abs(diff) < 0.1) return xpProgress;
        return prev + step;
      });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [xpProgress]);

  // Activity tracking for hiding/showing status bar
  useEffect(() => {
    const handleActivity = () => {
      setLastActivityTime(Date.now());
      setShowStatusBar(true);
    };

    const interval = setInterval(() => {
      const timeSinceLast = Date.now() - lastActivityTime;
      if (timeSinceLast >= 2000) setShowStatusBar(false);
    }, 500);

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, handleActivity));

    return () => {
      clearInterval(interval);
      events.forEach(ev => window.removeEventListener(ev, handleActivity));
    };
  }, [lastActivityTime]);

  // Auto-scroll cancel handlers
  const cancelAutoScroll = () => {
    if (!isAutoScrolling.current) return;
    isAutoScrolling.current = false;
    clearTimeout(autoScrollTimer.current);
    window.removeEventListener('keydown', handleKeyCancel);
    window.removeEventListener('mousedown', handleMouseCancel);
    window.removeEventListener('wheel', handleWheelCancel);
    cancelListenerAttached.current = false;
  };

  const handleKeyCancel = (e) => {
    if ([' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Escape'].includes(e.key)) cancelAutoScroll(`key: ${e.key}`);
  };
  const handleMouseCancel = (e) => { if (e.button === 1 || e.button === 0) cancelAutoScroll(`mouse button ${e.button}`); };
  const handleWheelCancel = () => cancelAutoScroll('touchpad or mouse wheel');

  const startAutoScroll = (e) => {
    e?.preventDefault?.();
    if (isAutoScrolling.current) return;
    isAutoScrolling.current = true;

    setTimeout(() => {
      if (!cancelListenerAttached.current) {
        window.addEventListener('keydown', handleKeyCancel);
        window.addEventListener('mousedown', handleMouseCancel);
        window.addEventListener('wheel', handleWheelCancel);
        cancelListenerAttached.current = true;
      }
    }, 500);

    const scrollPage = () => {
      if (!isAutoScrolling.current) return;
      const currentY = window.scrollY;
      const nextY = currentY + window.innerHeight;
      if (nextY >= document.documentElement.scrollHeight - 2) {
        cancelAutoScroll('end of page');
        return;
      }
      scrollInitiatedByScript.current = true;
      window.scrollTo({ top: nextY, behavior: 'smooth' });
      setTimeout(() => {
        scrollInitiatedByScript.current = false;
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
          cancelAutoScroll('end of page');
          return;
        }
        const delay = (typeof readingTimeEstimatorRef.current === 'function') ? readingTimeEstimatorRef.current() : 1000;
        autoScrollTimer.current = setTimeout(scrollPage, delay || 1000);
      }, 800);
    };

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      cancelAutoScroll('start at end of page');
      return;
    }

    scrollPage();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-mono">
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        <StatusBar
          isScrolled={isScrolled}
          showStatusBar={showStatusBar}
          animatedXpProgress={animatedXpProgress}
        />

        <HomeSection startAutoScroll={startAutoScroll} />
        <AboutSection navigate={navigate} />
        <ProjectsSection navigate={navigate} />
        {jobs.length > 0 ? (
          <JobSection navigate={navigate} />
        ) : (
          <InternshipsSection navigate={navigate} />
        )}
        <ContactSection />

        <Footer />
      </div>
    </>
  );
}
