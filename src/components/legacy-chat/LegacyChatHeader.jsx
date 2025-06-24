import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, Bot, LogOut, BookHeart } from 'lucide-react';

const LegacyChatHeader = ({ onMenuClick, onLogout, onJournalClick, title, isPremiumLocked }) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-card border-b border-border p-4 flex items-center justify-between shadow-sm shrink-0"
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-primary-foreground">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {!isPremiumLocked && <p className="text-sm text-green-500">En línea</p>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onJournalClick}
          className="text-muted-foreground hover:bg-muted"
        >
          <BookHeart className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          className="text-muted-foreground hover:bg-muted"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </motion.header>
  );
};

export default LegacyChatHeader;
