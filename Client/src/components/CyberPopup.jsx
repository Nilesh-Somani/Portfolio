import { useEffect } from 'react';

const CyberPopup = ({ isOpen, onClose, message, type = 'success' }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Popup */}
      <div className="relative bg-black border-2 border-cyan-400 p-6 rounded-lg shadow-lg max-w-md w-full mx-4 transform transition-all">
        {/* Status indicator light */}
        <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } animate-pulse`}></div>

        {/* Header */}
        <div className="text-cyan-400 text-lg font-bold mb-2 border-b border-cyan-400 pb-2">
          [SYSTEM MESSAGE]
        </div>

        {/* Content */}
        <div className="text-white space-y-4">
          <p className="font-mono">{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-cyan-400 bg-opacity-20 hover:bg-opacity-30 text-cyan-400 font-mono py-2 px-4 rounded border border-cyan-400 transition-colors duration-200"
        >
          [CLOSE]
        </button>
      </div>
    </div>
  );
};

export default CyberPopup;