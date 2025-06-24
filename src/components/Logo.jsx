import React from 'react';
import { motion } from 'framer-motion';

export const DefinitiveLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Terap.Ia Logo">
    <motion.path
      d="M9 9C10.2941 7.20684 13.7059 7.20684 15 9"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
    />
    <motion.path
      d="M15 15C13.7059 16.7932 10.2941 16.7932 9 15"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
    />
    <motion.path
      d="M9 15L7.5 18"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.8 }}
    />
     <motion.path
      d="M15 9L16.5 6"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.8 }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="1"
      fill="hsl(var(--primary))"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 1 }}
    />
  </svg>
);