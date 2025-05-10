"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCode, FiCpu, FiServer } from "react-icons/fi";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const loadingTexts = [
    "Initializing...",
    "Loading modules...",
    "Compiling components...",
    "Processing data...",
    "Finalizing setup...",
    "Almost ready..."
  ];

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        // Speed up progress at the end
        const increment = prev > 80 ? 4 : 2;
        const nextProgress = Math.min(prev + increment, 100);
        
        // Update loading text based on progress
        const textIndex = Math.floor((nextProgress / 100) * loadingTexts.length);
        setLoadingText(loadingTexts[Math.min(textIndex, loadingTexts.length - 1)]);
        
        // Clear interval when done
        if (nextProgress === 100) {
          clearInterval(interval);
        }
        
        return nextProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Binary digit animation for matrix effect
  const BinaryDigits = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute text-blue-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              fontSize: `${Math.floor(Math.random() * 16) + 8}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
      {/* Background effects */}
      <BinaryDigits />
      <div className="blur-circle blur-primary w-96 h-96 -top-48 -left-48 opacity-40"></div>
      <div className="blur-circle blur-secondary w-96 h-96 bottom-0 right-0 opacity-30"></div>

      <div className="relative z-10 flex flex-col items-center px-4 max-w-md text-center">
        {/* Logo animation */}
        <motion.div 
          className="mb-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: [0, 10, 0, -10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <FiCode className="w-8 h-8" />
        </motion.div>

        {/* Logo text */}
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-2 gradient-text gradient-text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Idrissa Maiga
        </motion.h1>
        
        <motion.p
          className="text-gray-600 dark:text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Full-Stack Developer
        </motion.p>

        {/* Progress bar */}
        <div className="w-full max-w-xs mb-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Loading indicators */}
        <div className="flex gap-4 mb-6">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0
            }}
            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          >
            <FiCode className="w-5 h-5" />
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.5
            }}
            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          >
            <FiServer className="w-5 h-5" />
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 1
            }}
            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          >
            <FiCpu className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-sm"
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.p>
      </div>
    </div>
  );
}