import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, Bot } from 'lucide-react';

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start"
  >
    <div className="flex items-start gap-3 max-w-[80%]">
      <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4" />
      </div>
      <div className="chat-bubble-ai p-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </motion.div>
);

const MessageBubble = ({ msg }) => (
  <motion.div
    key={msg.id}
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`flex items-start gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        msg.type === 'user' 
          ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground' 
          : 'bg-muted text-muted-foreground'
      }`}>
        {msg.type === 'user' ? (
          <UserIcon className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>
      <div className={`p-3 rounded-2xl shadow-md ${
        msg.type === 'user' 
          ? 'chat-bubble-user' 
          : 'chat-bubble-ai'
      }`}>
        <p className="text-sm leading-relaxed">{msg.content}</p>
        <p className="text-xs opacity-60 mt-2 text-right">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  </motion.div>
);

const LegacyMessageList = ({ messages, isTyping, isPremiumLocked, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </AnimatePresence>
      {isTyping && !isPremiumLocked && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default LegacyMessageList;
