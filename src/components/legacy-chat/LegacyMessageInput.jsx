import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const LegacyMessageInput = ({ message, setMessage, onSendMessage, friendName, isTyping, isPremiumLocked }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping && !isPremiumLocked) {
      onSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-4 bg-card border-t border-border shrink-0"
    >
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={isPremiumLocked ? `Desbloquea Premium para chatear aquí` : `Escribe un mensaje a ${friendName}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary"
            disabled={isTyping || isPremiumLocked}
          />
        </div>
        <Button
          onClick={onSendMessage}
          disabled={!message.trim() || isTyping || isPremiumLocked}
          className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-primary-foreground p-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LegacyMessageInput;
