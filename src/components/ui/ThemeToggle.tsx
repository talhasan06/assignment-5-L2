'use client';

import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '@/lib/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 left-1 w-4 h-4 rounded-full flex items-center justify-center"
        animate={{
          x: theme === 'light' ? 0 : 24,
          backgroundColor: theme === 'light' ? '#f59e0b' : '#60a5fa'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'light' ? (
          <FaSun className="text-yellow-500 text-xs" />
        ) : (
          <FaMoon className="text-blue-300 text-xs" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;