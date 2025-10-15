'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LaptopAnimationProps {
  onAnimationComplete: () => void;
  showButton: boolean;
}

const LaptopAnimation: React.FC<LaptopAnimationProps> = ({ 
  onAnimationComplete, 
  showButton 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showLetsGoButton, setShowLetsGoButton] = useState(false);

  useEffect(() => {
    // Start laptop closing animation after a short delay
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show "Let's Go" button after laptop closes
    if (isClosing) {
      const timer = setTimeout(() => {
        setShowLetsGoButton(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  const handleLetsGo = () => {
    onAnimationComplete();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white glow-text mb-4">
          Time to Get Started!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 margin-top-1rem">
          Your new journey begins now...
        </p>
      </motion.div>

      {/* Laptop Animation */}
      <div className="relative mb-12">
        <div 
          className="relative"
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Laptop Base */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Laptop Screen */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={isClosing ? { rotateX: -90 } : { rotateX: 0 }}
              transition={{ 
                duration: 5,
                ease: 'easeInOut',
                type: 'tween'
              }}
              className="w-80 h-52 glass border-4 border-gray-300 rounded-lg relative z-10"
              style={{ 
                transformOrigin: 'bottom center',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Screen Content */}
              <div className="absolute inset-2 bg-gradient-to-br from-blue-900 to-purple-900 rounded flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={isClosing ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 5 }}
                  className="text-center"
                >
                  <div className="text-green-400 text-2xl font-mono mb-2">
                    {"> Hashedin by Deloitte"}
                  </div>
                  <div className="text-green-400 text-lg font-mono animate-pulse">
                    _
                  </div>
                </motion.div>
              </div>

              {/* Screen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white from-0% to-transparent to-50% opacity-10 rounded-lg" />
            </motion.div>

            {/* Laptop Keyboard/Base */}
            <div className="w-80 h-6 bg-gray-200 rounded-b-lg border-4 border-gray-300 border-t-0 relative">
              {/* Trackpad */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-100 rounded border border-gray-300" />
              
              {/* Keyboard Keys (simplified) */}
              <div className="absolute top-1 left-4 right-4 h-2 flex space-x-1">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="flex-1 h-full bg-gray-300 rounded-sm"
                  />
                ))}
              </div>
            </div>

            {/* Laptop Hinge */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-2 bg-gray-400 rounded-full" />
          </motion.div>

          {/* Glow Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="absolute inset-0 bg-blue-500 rounded-lg blur-xl -z-10"
          />
        </div>
      </div>

      {/* Status Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-center mb-8"
      >
        <p className="text-lg text-gray-300 margin-top-1rem">
          {!isClosing ? 'Preparing your experience...' : 
           !showLetsGoButton ? 'Laptop is closing...' : 
           'Ready to continue!'}
        </p>
      </motion.div>

      {/* Let's Go Button */}
      {showLetsGoButton && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: 'spring',
            stiffness: 150,
            damping: 10
          }}
        >
          <button
            onClick={handleLetsGo}
            className="glass px-8 py-4 text-xl font-semibold text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 pulse-animation lets-go-button"
          >
            🚀 Let&apos;s Go!
          </button>
        </motion.div>
      )}

      {/* Keyboard Hint */}
      {showLetsGoButton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 text-center"
        >
          <p className="text-sm text-gray-400">
            Press <kbd className="px-2 py-1 bg-gray-700 rounded text-white">Enter</kbd> or click the button
          </p>
        </motion.div>
      )}

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -200],
              x: [0, (Math.random() - 0.5) * 100]
            }}
            transition={{
              duration: 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LaptopAnimation;