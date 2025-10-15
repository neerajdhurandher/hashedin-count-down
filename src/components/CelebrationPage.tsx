'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CelebrationPageProps {
  onStartOver: () => void;
}

const CelebrationPage: React.FC<CelebrationPageProps> = ({ onStartOver }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const celebrationMessages = [
    "🎉 Best of Luck! 🎉",
    "✨ Your Journey Begins! ✨",
    "🚀 Ready to Soar! 🚀",
    "📖 A New Chapter Starts!",
    "🌟 Time to Shine! 🌟"
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % celebrationMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [celebrationMessages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1.2, 0],
              y: -100,
              rotate: 360
            }}
            transition={{
              duration: 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className={`absolute w-4 h-4 ${
              i % 4 === 0 ? 'bg-yellow-400' :
              i % 4 === 1 ? 'bg-pink-400' :
              i % 4 === 2 ? 'bg-blue-400' :
              'bg-green-400'
            } rounded-full`}
          />
        ))}
      </div>

      {/* Main Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1,
            type: 'spring',
            stiffness: 100,
            damping: 10
          }}
          className="text-center z-10"
        >
          {/* Main Celebration Message */}
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white glow-text mb-6">
              {celebrationMessages[currentMessage]}
            </h1>
          </motion.div>

          {/* Secondary Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12r display-vertical-center margin-top-2rem"
          >
            <div className="glass p-8 max-w-2xl padding-1rem">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                October 17, 2025 is Here! 🎊
              </h2>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                Finally the wait is over! Whatever awaited you for this special date, 
                I hope it brings you joy, success, and wonderful memories. 
                A new journey continues from here!
              </p>
            </div>
          </motion.div>

          {/* Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-6 display-vertical-center"
          >
            {/* Celebration Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-4 text-center box"
              >
                <div className="text-3xl font-bold text-yellow-400">🎯</div>
                <div className="text-white font-semibold">Target Reached</div>
                <div className="text-gray-300 text-sm">Mission Complete</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-4 text-center box"
              >
                <div className="text-3xl font-bold text-green-400">⏰</div>
                <div className="text-white font-semibold">Perfect Timing</div>
                <div className="text-gray-300 text-sm">Right on Schedule</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-4 text-center box"
              >
                <div className="text-3xl font-bold text-blue-400">🚀</div>
                <div className="text-white font-semibold">Next Chapter</div>
                <div className="text-gray-300 text-sm">Journey Continues</div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartOver}
                className="glass px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 box button-box"
              >
                🔄 Start Over
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => typeof window !== 'undefined' && window.location.reload()}
                className="glass px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 box button-box"
              >
                🎊 Celebrate More
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Success Indicators */}
      <div className="absolute inset-0 pointer-events-none">
        {['🎉', '🎊', '✨', '🌟', '🎈', '🎆'].map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: 6,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className="absolute text-4xl"
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Keyboard Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-sm text-gray-400">
          Press <kbd className="px-2 py-1 bg-gray-700 rounded text-white">Escape</kbd> to start over
        </p>
      </motion.div>

      {/* Pulsing Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop'
        }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-3xl -z-10"
      />
    </div>
  );
};

export default CelebrationPage;