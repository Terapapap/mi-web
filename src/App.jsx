
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import WelcomePage from '@/pages/WelcomePage';
import ChatPage from '@/pages/ChatPage';
import LoginPage from '@/pages/LoginPage';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import PremiumModal from '@/components/PremiumModal';
import JournalModal from '@/components/JournalModal';
import AccountModal from '@/components/AccountModal';
import SettingsModal from '@/components/SettingsModal';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PaymentCancelPage from '@/pages/PaymentCancelPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

const AppContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, loading, isPremium } = useAuth();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();

    const storedHue = localStorage.getItem('themeHue');
    const storedSaturation = localStorage.getItem('themeSaturation');
    const storedLightness = localStorage.getItem('themeLightness');
    const storedThemeMode = localStorage.getItem('themeMode');
    
    const hue = storedHue ? parseInt(storedHue, 10) : 24;
    const saturation = storedSaturation ? parseInt(storedSaturation, 10) : 95;
    const lightness = storedLightness ? parseInt(storedLightness, 10) : 53;
    const isDark = storedThemeMode ? storedThemeMode === 'dark' : false;

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.documentElement.style.setProperty('--primary-hue', hue);
    document.documentElement.style.setProperty('--primary-saturation', `${saturation}%`);
    document.documentElement.style.setProperty('--primary-lightness', `${lightness}%`);


    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  const handleClearHistory = async () => {
    if (session) {
      const { error } = await supabase.from('messages').delete().eq('user_id', session.user.id);
      if (error) {
        toast({ title: 'Error', description: 'No se pudo borrar el historial.', variant: 'destructive' });
      } else {
        toast({ title: 'Éxito', description: 'Tu historial de chat ha sido eliminado.' });
      }
    } else {
      Object.keys(localStorage)
        .filter(key => key.startsWith('guest-chat-') || key.startsWith('guest-') && key.endsWith('-count'))
        .forEach(key => localStorage.removeItem(key));
      toast({ title: 'Éxito', description: 'Tu historial de chat de invitado ha sido eliminado.' });
    }
    navigate('/');
    setTimeout(() => navigate('/chat'), 50);
  };

  const togglePremium = () => {
    const newPremiumStatus = !isPremium;
    localStorage.setItem('isPremiumUser', newPremiumStatus.toString());
    window.location.reload();
  };

  const openPremiumModalHandler = () => {
    setIsPremiumModalOpen(true);
  };
  const closePremiumModal = () => setIsPremiumModalOpen(false);
  
  const openJournalModalHandler = () => {
    if (!session) {
      navigate('/login');
    } else {
      setIsJournalModalOpen(true);
    }
  };
  const closeJournalModal = () => setIsJournalModalOpen(false);

  const openAccountModalHandler = () => {
    if (!session) {
      navigate('/login');
    } else {
      setIsAccountModalOpen(true);
    }
  };
  const closeAccountModal = () => setIsAccountModalOpen(false);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Terap.Ia - Asistente de Bienestar Personal</title>
        <meta name="description" content="Plataforma profesional de asistencia personal con IA. Herramientas para el bienestar emocional, análisis de patrones y desarrollo personal." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="h-full w-full overflow-y-auto bg-background text-foreground transition-colors duration-300">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/chat" />} />
          <Route path="/chat" element={
            <ChatPage 
              session={session}
              openThemeCustomizer={() => setIsCustomizerOpen(true)} 
              isPremiumUser={isPremium}
              togglePremium={togglePremium} 
              openPremiumModal={openPremiumModalHandler}
              openJournalModal={openJournalModalHandler}
              openAccountModal={openAccountModalHandler}
              openSettingsModal={() => setIsSettingsModalOpen(true)}
            />
          } />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-cancel" element={<PaymentCancelPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
        <Toaster />
        <ThemeCustomizer open={isCustomizerOpen} onOpenChange={setIsCustomizerOpen} />
        <SettingsModal 
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          onOpenThemeCustomizer={() => setIsCustomizerOpen(true)}
          onClearHistory={handleClearHistory}
        />
        <PremiumModal isOpen={isPremiumModalOpen} onClose={closePremiumModal} session={session} />
        {session && <JournalModal isOpen={isJournalModalOpen} onClose={closeJournalModal} />}
        {session && <AccountModal isOpen={isAccountModalOpen} onClose={closeAccountModal} session={session} />}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
