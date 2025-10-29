import { useEffect } from 'react';

export const useIntersectionObserver = (sectionIds, setCurrentSection) => {
  useEffect(() => {
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter for elements that are intersecting
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio
          }));

        if (visibleSections.length > 0) {
          // Sort by visibility ratio and get the most visible section
          const mostVisible = visibleSections.reduce((max, section) => 
            section.ratio > max.ratio ? section : max
          );
          
          setCurrentSection(mostVisible.id);
        }
      },
      {
        // Options for the observer
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // [0, 0.1, 0.2, ..., 1.0]
        rootMargin: '0px' // No margin
      }
    );

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds, setCurrentSection]);
};