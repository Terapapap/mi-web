import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <motion.div
        animate={{
          x: ['-20%', '100%', '-20%'],
          y: ['-20%', '100%', '-20%'],
          rotate: [0, 180, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 60,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50"
      />
      <motion.div
        animate={{
            x: ['80%', '-40%', '80%'],
            y: ['80%', '-40%', '80%'],
            rotate: [360, 180, 0],
            scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 70,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 5
        }}
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl opacity-50"
      />
       <motion.div
        animate={{
            x: ['10%', '50%', '10%'],
            y: ['80%', '10%', '80%'],
            rotate: [180, 0, 180],
            scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 55,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 10
        }}
        className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-50"
      />
    </div>
  );
};

export default BackgroundAnimation;