'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface DatePickerProps {
  currentDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onClose: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  currentDate, 
  onDateChange, 
  onClose 
}) => {
  const [selectedDate, setSelectedDate] = useState(
    currentDate || new Date()
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  };

  const handleApply = () => {
    onDateChange(selectedDate);
    onClose();
  };

  const handleReset = () => {
    onDateChange(null);
    onClose();
  };

  const targetDate = new Date('2025-10-17');
  const currentDateForDisplay = currentDate || new Date();
  
  // Use same calendar day calculation logic as CountdownApp
  const currentDateOnly = new Date(currentDateForDisplay.getFullYear(), currentDateForDisplay.getMonth(), currentDateForDisplay.getDate());
  const targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const difference = targetDateOnly.getTime() - currentDateOnly.getTime();
  const daysRemaining = difference > 0 ? Math.ceil(difference / (1000 * 60 * 60 * 24)) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="glass p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            🗓️ Set Test Date
          </h2>
          <p className="text-gray-300 text-sm">
            Choose a custom current date for testing the countdown
          </p>
        </div>

        {/* Current Status */}
        <div className="glass-dark p-4 mb-6 rounded-lg">
          <div className="text-sm text-gray-300 mb-2">Current Status:</div>
          <div className="text-white">
            <div>
              <span className="font-semibold">Current Date:</span>{' '}
              {format(currentDateForDisplay, 'MMMM dd, yyyy')}
            </div>
            <div>
              <span className="font-semibold">Target Date:</span>{' '}
              {format(targetDate, 'MMMM dd, yyyy')}
            </div>
            <div className="mt-2">
              <span className="font-semibold">Days Remaining:</span>{' '}
              <span className={daysRemaining <= 0 ? 'text-red-400' : 'text-green-400'}>
                {daysRemaining <= 0 ? 'COMPLETED!' : `${daysRemaining} days`}
              </span>
            </div>
          </div>
        </div>

        {/* Date Input */}
        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Select Custom Date:
          </label>
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={handleDateChange}
            max="2025-10-17"
            className="w-full p-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-xs text-gray-400 mt-1">
            * Date cannot be after October 17, 2025
          </p>
        </div>

        {/* Preview */}
        <div className="glass-dark p-3 mb-6 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Preview:</div>
          <div className="text-white text-sm">
            With selected date: <span className="font-semibold">
              {(() => {
                const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                const targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
                const diff = targetDateOnly.getTime() - selectedDateOnly.getTime();
                return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
              })()} days remaining
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleApply}
            className="flex-1 glass-dark px-4 py-3 text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
          >
            ✅ Apply Custom Date
          </button>
          
          <button
            onClick={handleReset}
            className="flex-1 glass-dark px-4 py-3 text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
          >
            🔄 Use Real Date
          </button>
          
          <button
            onClick={onClose}
            className="sm:w-auto glass-dark px-4 py-3 text-gray-300 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
          >
            ❌ Cancel
          </button>
        </div>

        {/* Quick Test Dates */}
        <div className="mt-6 pt-6 border-t border-white border-opacity-20">
          <div className="text-sm text-gray-300 mb-3">Quick Test Options:</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                const testDate = new Date('2025-10-15'); // 2 days before
                setSelectedDate(testDate);
              }}
              className="glass-dark px-3 py-2 text-xs text-white rounded hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              2 days left
            </button>
            
            <button
              onClick={() => {
                const testDate = new Date('2025-10-10'); // 7 days before
                setSelectedDate(testDate);
              }}
              className="glass-dark px-3 py-2 text-xs text-white rounded hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              7 days left
            </button>
            
            <button
              onClick={() => {
                const testDate = new Date('2025-10-17'); // Same day
                setSelectedDate(testDate);
              }}
              className="glass-dark px-3 py-2 text-xs text-white rounded hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              Target day
            </button>
            
            <button
              onClick={() => {
                const testDate = new Date('2025-10-18'); // After target
                setSelectedDate(testDate);
              }}
              className="glass-dark px-3 py-2 text-xs text-white rounded hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              After target
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DatePicker;