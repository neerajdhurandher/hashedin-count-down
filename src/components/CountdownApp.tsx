'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import CountdownDisplay from '@/components/CountdownDisplay';
import PageTearAnimation from '@/components/PageTearAnimation';
import LaptopAnimation from '@/components/LaptopAnimation';
import CelebrationPage from '@/components/CelebrationPage';
import DatePicker from '@/components/DatePicker';

export type AppState = 'countdown' | 'laptop-closing' | 'celebration';

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

const CountdownApp = () => {
  const [currentState, setCurrentState] = useState<AppState>('countdown');
  const [showConfetti, setShowConfetti] = useState(false);
  const [countdownData, setCountdownData] = useState<CountdownData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });
  
  // Custom date for testing (defaults to actual current date)
  const [customCurrentDate, setCustomCurrentDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = customCurrentDate ? new Date(customCurrentDate) : new Date();
      const target = new Date('2025-10-17T00:00:00');
      
      // Set both dates to start of day for accurate day counting
      const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const targetDateOnly = new Date(target.getFullYear(), target.getMonth(), target.getDate());
      
      const difference = targetDateOnly.getTime() - currentDate.getTime();

      if (difference > 0) {
        // Calculate days remaining (including today)
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
        
        // For time display, use the actual time difference
        const timeDifference = target.getTime() - now.getTime();
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdownData({
          days,
          hours: Math.max(0, hours),
          minutes: Math.max(0, minutes),
          seconds: Math.max(0, seconds),
          isComplete: false
        });
      } else {
        setCountdownData({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true
        });
        
        if (currentState === 'countdown') {
          handleCountdownComplete();
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [customCurrentDate, currentState]);

  const handleCountdownComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setCurrentState('laptop-closing');
    }, 2000);
  };

  const handleLaptopAnimationComplete = () => {
    setShowConfetti(false);
    setCurrentState('celebration');
  };

  const handleStartOver = () => {
    setCurrentState('countdown');
    setShowConfetti(false);
    setCustomCurrentDate(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && countdownData.isComplete && currentState === 'laptop-closing') {
        handleLaptopAnimationComplete();
      }
      if (e.key === 'Escape' && currentState === 'celebration') {
        handleStartOver();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [countdownData.isComplete, currentState]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 1200}
          height={typeof window !== 'undefined' ? window.innerHeight : 800}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}

      {/* Custom Date Picker Toggle */}
      <div className="absolute top-4 right-4 z-50" style={{ visibility:"hidden" }}>
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="glass px-4 py-2 text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300"
        >
          🗓️ Test Date
        </button>
      </div>

      {/* Date Picker Modal */}
      <AnimatePresence>
        {showDatePicker && (
          <DatePicker
            currentDate={customCurrentDate}
            onDateChange={setCustomCurrentDate}
            onClose={() => setShowDatePicker(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentState === 'countdown' && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <CountdownDisplay countdownData={countdownData} />
            <PageTearAnimation 
              daysRemaining={countdownData.days} 
              isActive={!countdownData.isComplete}
            />
          </motion.div>
        )}

        {currentState === 'laptop-closing' && (
          <motion.div
            key="laptop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <LaptopAnimation 
              onAnimationComplete={handleLaptopAnimationComplete}
              showButton={countdownData.isComplete}
            />
          </motion.div>
        )}

        {currentState === 'celebration' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <CelebrationPage onStartOver={handleStartOver} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountdownApp;