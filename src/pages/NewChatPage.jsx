import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import LegacySidebar from '@/components/legacy-chat/LegacySidebar';
import LegacyChatHeader from '@/components/legacy-chat/LegacyChatHeader';
import LegacyMessageList from '@/components/legacy-chat/LegacyMessageList';
import LegacyMessageInput from '@/components/legacy-chat/LegacyMessageInput';
import { generateAIResponse, getLegacyChatTitle } from '@/lib/legacyChatUtils';

const NewChatPage = ({ openThemeCustomizer, isPremiumUser, togglePremium, openPremiumModal, openJournalModal }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState('general');
  const [friendName, setFriendName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedName = localStorage.getItem('aiFriendName');
    if (!storedName) {
      navigate('/');
      return;
    }
    setFriendName(storedName);
  }, [navigate]);

  useEffect(() => {
    const storedName = localStorage.getItem('aiFriendName');
    if (!storedName) return;

    const chatOptions = {
      general: { isPremium: false, welcome: `¡Hola! Soy ${storedName}, tu amigo IA. Estoy aquí para escucharte y ayudarte en lo que necesites. ¿Cómo te sientes hoy?` },
      dreams: { isPremium: true, welcome: `Hola, soy ${storedName}. Cuéntame tus sueños, ¡vamos a explorarlos juntos! (Función Premium ✨)` },
      therapy: { isPremium: true, welcome: `Hola, soy ${storedName}. Este es un espacio seguro. ¿Cómo te sientes? (Función Premium ✨)` },
      motivation: { isPremium: false, welcome: `¡Hola! Soy ${storedName}. ¡Estoy aquí para darte un impulso de energía! ¿List@?` },
      relationships: { isPremium: true, welcome: `Hola, soy ${storedName}. Hablemos de relaciones. (Función Premium ✨)` },
      career: { isPremium: true, welcome: `Hola, soy ${storedName}. ¿Necesitas orientación profesional? (Función Premium ✨)`},
      meditation: { isPremium: true, welcome: `Hola, soy ${storedName}. Encuentra un lugar cómodo y prepárate para relajarte. ¿Estás listo para empezar tu sesión de meditación? (Función Premium ✨)` }
    };
    
    const currentChatOption = chatOptions[currentChat];

    if (currentChatOption.isPremium && !isPremiumUser) {
      setMessages([{
        id: 1,
        type: 'ai',
        content: `Esta función de "${getLegacyChatTitle(currentChat, friendName, isPremiumUser, true)}" es Premium. Actualiza tu plan para acceder.`,
        timestamp: new Date().toISOString()
      }]);
      return;
    }

    const storedMessages = localStorage.getItem(`messages_${currentChat}_${storedName}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([{
        id: 1,
        type: 'ai',
        content: currentChatOption.welcome,
        timestamp: new Date().toISOString()
      }]);
    }
  }, [currentChat, friendName, isPremiumUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const storedName = localStorage.getItem('aiFriendName');
    if (messages.length > 0 && storedName) {
      localStorage.setItem(`messages_${currentChat}_${storedName}`, JSON.stringify(messages));
    }
  }, [messages, currentChat, friendName]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const currentChatDef = {
        dreams: { isPremium: true }, therapy: { isPremium: true }, relationships: { isPremium: true },
        career: { isPremium: true }, meditation: { isPremium: true }
    }[currentChat];

    if (currentChatDef?.isPremium && !isPremiumUser) {
      toast({
        title: "Función Premium Bloqueada",
        description: `No puedes enviar mensajes en "${getLegacyChatTitle(currentChat, friendName, isPremiumUser, true)}" sin ser premium.`,
        variant: "destructive",
      });
      return;
    }

    const userMessage = { id: Date.now(), type: 'user', content: message, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1, type: 'ai',
        content: generateAIResponse(message, currentChat, friendName),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleChatChange = (chatType) => {
    setCurrentChat(chatType);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('aiFriendName');
    localStorage.removeItem('isPremiumUser');
    navigate('/');
  };

  const currentChatDefinition = {
    dreams: { isPremium: true }, therapy: { isPremium: true }, relationships: { isPremium: true },
    career: { isPremium: true }, meditation: { isPremium: true }
  }[currentChat];
  const isCurrentChatPremiumLocked = currentChatDefinition?.isPremium && !isPremiumUser;

  return (
    <div className="h-screen flex bg-background text-foreground transition-colors duration-300">
      <LegacySidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentChat={currentChat}
        onChatChange={handleChatChange}
        friendName={friendName}
        openThemeCustomizer={openThemeCustomizer}
        isPremiumUser={isPremiumUser}
        togglePremium={togglePremium}
        openPremiumModal={openPremiumModal}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <LegacyChatHeader
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
          onJournalClick={openJournalModal}
          title={getLegacyChatTitle(currentChat, friendName, isPremiumUser)}
          isPremiumLocked={isCurrentChatPremiumLocked}
        />
        <LegacyMessageList
          messages={messages}
          isTyping={isTyping}
          isPremiumLocked={isCurrentChatPremiumLocked}
          messagesEndRef={messagesEndRef}
        />
        <LegacyMessageInput
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
          friendName={friendName}
          isTyping={isTyping}
          isPremiumLocked={isCurrentChatPremiumLocked}
        />
      </div>
    </div>
  );
};

export default NewChatPage;
