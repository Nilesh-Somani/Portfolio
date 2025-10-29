import { useEffect } from 'react';

const useAutoScroll = (onAutoScroll) => {
  const READING_SPEED_WPM = 200; // words per minute

  // Estimate reading time for visible viewport content
  const estimateReadingTime = () => {
    const ignoredSelectors = ['nav', 'footer', '[data-status-bar]'];
    const ignoredElements = new Set();
    ignoredSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => ignoredElements.add(el));
    });

    const elements = Array.from(document.body.getElementsByTagName('*'));
    let words = 0;

    elements.forEach(el => {
      // skip headings & explicit no-autoscroll
      if (el.tagName.match(/^H[1-6]$/) || el.classList.contains('no-autoscroll')) return;
      if ([...ignoredElements].some(ignored => ignored.contains(el))) return;

      const rect = el.getBoundingClientRect();
      const height = rect.bottom - rect.top;
      if (height <= 0) return;

      const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
      const visibilityRatio = visibleHeight / height;

      if (visibilityRatio > 0.5) { // At least half-visible
        const txt = el.innerText || '';
        words += txt.trim().split(/\s+/).length;
      }
    });

    const minutes = words / READING_SPEED_WPM;
    const ms = minutes * 60 * 1000;
    return Math.max(ms, 1000); // minimum 1 second
  };

  useEffect(() => {
    onAutoScroll && onAutoScroll(estimateReadingTime);
  }, [onAutoScroll]);
};

export default useAutoScroll;