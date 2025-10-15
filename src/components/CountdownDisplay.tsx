'use client';

import { motion } from 'framer-motion';
import { CountdownData } from './CountdownApp';

interface CountdownDisplayProps {
  countdownData: CountdownData;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ countdownData }) => {
  const { days, hours, minutes, seconds, isComplete } = countdownData;

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white glow-text mb-4">
          Countdown
        </h1>
        <p className="text-xl md:text-2xl text-gray-300">
          to October 17, 2025
        </p>
      </motion.div>

      {/* Countdown Grid */}
      {!isComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 countdown-grid"
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5 + index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              className="float-animation"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="glass p-6 md:p-8 text-center hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-lg text-gray-300 uppercase tracking-wide">
                  {unit.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: 'spring',
            stiffness: 150,
            damping: 10
          }}
          className="text-center"
        >
          <div className="glass p-12 pulse-animation">
            <h2 className="text-5xl md:text-7xl font-bold text-white glow-text mb-4">
              🎉 TIME'S UP! 🎉
            </h2>
            <p className="text-xl md:text-2xl text-gray-300">
              October 17, 2025 has arrived!
            </p>
          </div>
        </motion.div>
      )}

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: '100%' }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-12 w-full max-w-2xl"
      >
        <div className="glass p-4 progress-bar-div">
          <div className="flex justify-between text-sm text-gray-300 mb-2 progress-bar-text">
            <span>Progress to October 17, 2025</span>
            <span>{isComplete ? '100%' : `${Math.max(0, 100 - (days / 365) * 100).toFixed(1)}%`}</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: isComplete ? '100%' : `${Math.max(0, 100 - (days / 365) * 100)}%`
              }}
              transition={{ duration: 2, delay: 1.5 }}
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              delay: i * 2,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className="absolute w-4 h-4 bg-white bg-opacity-30 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default CountdownDisplay;