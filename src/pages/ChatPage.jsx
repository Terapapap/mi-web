
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useChat } from '@/hooks/useChat';
import { Sidebar } from '@/components/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const ChatPage = ({ session, openThemeCustomizer, isPremiumUser, togglePremium, openPremiumModal, openJournalModal, openAccountModal, openSettingsModal }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    currentChat,
    setCurrentChat,
    friendName,
    messages,
    isTyping,
    message,
    setMessage,
    handleSendMessage,
    isMessageLimitReached,
  } = useChat(session, isPremiumUser, openPremiumModal, toast);

  const handleChatChange = (chatType) => {
    setCurrentChat(chatType);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
  };
  
  return (
    <div className="h-full flex bg-background text-foreground transition-colors duration-300 relative z-10">
      <div className="hidden lg:block">
        <Sidebar 
          isOpen={true}
          currentChat={currentChat}
          onChatChange={handleChatChange}
          friendName={friendName}
          isPremiumUser={isPremiumUser}
          togglePremium={togglePremium}
          openPremiumModal={openPremiumModal}
          openAccountModal={openAccountModal}
          openSettingsModal={openSettingsModal}
          session={session}
        />
      </div>
      <div className="lg:hidden">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentChat={currentChat}
          onChatChange={handleChatChange}
          friendName={friendName}
          isPremiumUser={isPremiumUser}
          togglePremium={togglePremium}
          openPremiumModal={openPremiumModal}
          openAccountModal={openAccountModal}
          openSettingsModal={openSettingsModal}
          session={session}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader
            friendName={friendName}
            currentChat={currentChat}
            isPremiumUser={isPremiumUser}
            onMenuClick={() => setSidebarOpen(true)}
            onJournalClick={openJournalModal}
            onLogoutClick={session ? handleLogout : () => navigate('/login')}
        />

        <MessageList 
          messages={messages} 
          isTyping={isTyping}
          currentChat={currentChat}
          isPremiumUser={isPremiumUser}
          friendName={friendName}
        />

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 bg-card border-t border-border shrink-0"
        >
          <MessageInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isTyping={isTyping}
            isPremiumUser={isPremiumUser}
            currentChat={currentChat}
            friendName={friendName}
            isMessageLimitReached={isMessageLimitReached}
            onUpgradeClick={openPremiumModal}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;
