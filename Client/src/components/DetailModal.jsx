import React, { useEffect, useRef } from 'react';

/**
 * A reusable modal component for showing details of any item
 * like certificates, skills, projects, etc.
 */
export default function DetailModal({
  open,
  onClose,
  title,
  children,
  image,
  meta,
}) {
  const containerRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    setTimeout(() => containerRef.current?.focus(), 0);

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = original;
      try { lastActiveRef.current?.focus(); } catch { /* ignore */ }
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-4xl font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-cyan-400 opacity-20 blur rounded-xl" />

        {/* Modal Content */}
        <div className="relative bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-6 border-b border-gray-800 gap-4">
            <div className="flex items-start sm:items-center space-x-0 sm:space-x-6 flex-col sm:flex-row w-full">
              {image && (
                <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 relative group hover:border-cyan-400/50 transition-colors">
                  <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl" />
                  <div className="absolute -inset-0.5 bg-cyan-400 opacity-0 group-hover:opacity-20 blur transition-opacity rounded-xl" />
                  <img src={image} alt={title} className="w-16 h-16 object-contain relative z-10" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {title}
                </h3>
                {meta && (
                  <div className="text-gray-400 mt-1 font-medium">{meta}</div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-all p-2 rounded-lg hover:bg-gray-800 hover:rotate-90 transform duration-200 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="px-4 sm:px-8 py-6 min-h-[200px]">
            <div className="prose prose-lg prose-invert max-w-none [&>p]:text-gray-300 [&>ul]:text-gray-300 [&>p]:leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}