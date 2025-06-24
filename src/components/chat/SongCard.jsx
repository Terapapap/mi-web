import React from 'react';
import { motion } from 'framer-motion';
import { Music, Mic2, Quote } from 'lucide-react';

const SongCard = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-card border border-border/50 rounded-2xl p-5 max-w-md w-full"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Music className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground leading-tight">{data.song}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Mic2 className="w-3.5 h-3.5" />
            {data.artist}
          </p>
        </div>
      </div>
      
      <div className="relative pl-5">
        <Quote className="absolute left-0 top-0 w-4 h-4 text-primary/40 transform -translate-x-1" />
        <p className="text-foreground/90 italic text-base">{data.reason}</p>
      </div>
    </motion.div>
  );
};

export default SongCard;