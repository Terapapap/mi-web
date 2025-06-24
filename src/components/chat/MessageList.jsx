import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { getChatTitle } from '@/lib/chatUtils';
import { DefinitiveLogo } from '@/components/Logo';
import SongCard from './SongCard';

const MessageList = ({ messages, isTyping, currentChat, isPremiumUser, friendName }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 scrollbar-thin">
      <AnimatePresence>
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          
          if (message.role === 'assistant' && currentChat === 'mood-song') {
            try {
              const songData = JSON.parse(message.content);
              if (songData.song && songData.artist && songData.reason) {
                return (
                  <motion.div
                    key={message.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex justify-start mb-4"
                  >
                     <SongCard data={songData} />
                  </motion.div>
                );
              }
            } catch (e) {
              // Not valid JSON, render as a normal message
            }
          }

          return (
            <motion.div
              key={message.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: isUser ? 10 : -10 }}
              className={`flex items-end gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center shrink-0 border border-border">
                  <DefinitiveLogo className="w-5 h-5" />
                </div>
              )}
              <div
                className={`max-w-md md:max-w-lg lg:max-w-xl px-4 py-3 rounded-2xl break-words ${
                  isUser
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card text-card-foreground rounded-bl-md border border-border/50'
                }`}
              >
                {message.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          );
        })}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-3 mb-4 justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center shrink-0 border border-border">
              <DefinitiveLogo className="w-5 h-5" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-card text-card-foreground rounded-bl-md border border-border/50">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;