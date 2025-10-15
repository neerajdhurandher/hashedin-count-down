'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTearAnimationProps {
  daysRemaining: number;
  isActive: boolean;
}

const PageTearAnimation: React.FC<PageTearAnimationProps> = ({ 
  daysRemaining, 
  isActive 
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);
  const [tearingPage, setTearingPage] = useState<number | null>(null);

  // Initialize pages (starting from daysRemaining + 5 down to daysRemaining)
  useEffect(() => {
    if (isActive && daysRemaining > 0) {
      const startPage = daysRemaining + 5;
      const pageArray = [];
      for (let i = startPage; i >= daysRemaining; i--) {
        pageArray.push(i);
      }
      setPages(pageArray);
      setCurrentPage(0);
    }
  }, [daysRemaining, isActive]);

  // Auto tear pages every 2 seconds
  useEffect(() => {
    if (!isActive || pages.length === 0) return;

    const interval = setInterval(() => {
      if (currentPage < pages.length - 1) {
        setTearingPage(pages[currentPage]);
        
        setTimeout(() => {
          setCurrentPage(prev => prev + 1);
          setTearingPage(null);
        }, 500); // Animation duration
      }
    }, 700);

    return () => clearInterval(interval);
  }, [currentPage, pages, isActive]);

  if (!isActive || pages.length === 0) return null;

  return (
    <div className="fixed top-20 right-8 z-30">
      <div className="relative">
        {/* Calendar Base */}
        <div className="glass-dark p-2 rounded-lg shadow-2xl">
          <div className="w-24 h-32 relative overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-red-600 text-white text-xs text-center py-1 rounded-t">
              Days Left
            </div>
            
            {/* Pages Stack */}
            <div className="relative h-full bg-white rounded-b">
              <AnimatePresence>
                {pages.map((pageNumber, index) => {
                  const isCurrentPage = index === currentPage;
                  const isTearing = tearingPage === pageNumber;
                  
                  if (index < currentPage && !isTearing) return null;
                  
                  return (
                    <motion.div
                      key={pageNumber}
                      initial={{ 
                        rotateX: 0,
                        z: index * 2,
                        opacity: 1 
                      }}
                      animate={isTearing ? {
                        rotateX: -180,
                        z: 50,
                        opacity: 0
                      } : {
                        rotateX: 0,
                        z: index * 2,
                        opacity: isCurrentPage ? 1 : 0.7
                      }}
                      exit={{
                        rotateX: -180,
                        z: 100,
                        opacity: 0
                      }}
                      transition={{
                        duration: isTearing ? 1 : 0.3,
                        type: 'spring',
                        stiffness: 100
                      }}
                      className={`
                        absolute inset-0 bg-white border-b border-gray-200 
                        flex items-center justify-center
                        ${isCurrentPage ? 'shadow-lg' : ''}
                      `}
                      style={{
                        transformOrigin: 'top center',
                        transformStyle: 'preserve-3d',
                        zIndex: pages.length - index
                      }}
                    >
                      {/* Page Content */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800 mb-1">
                          {pageNumber}
                        </div>
                        <div className="text-xs text-gray-600">
                          {pageNumber === 1 ? 'Day' : 'Days'}
                        </div>
                      </div>
                      
                      {/* Tear Lines for visual effect */}
                      {isTearing && (
                        <div className="absolute top-0 left-0 right-0">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: i * 0.1 
                              }}
                              className="h-px bg-gray-400 my-1"
                              style={{ 
                                transformOrigin: Math.random() > 0.5 ? 'left' : 'right' 
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {/* Ring Holes */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animation Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        >
          {/* <div className="text-xs text-white text-center glass px-2 py-1 rounded">
            Page tearing...
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default PageTearAnimation;