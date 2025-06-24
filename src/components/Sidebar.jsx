import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  X, 
  MessageCircle, 
  Brain, 
  Heart, 
  Zap, 
  Users, 
  Briefcase,
  CreditCard,
  Settings,
  User, 
  Lock,
  Unlock,
  Wind,
  Music,
  FileText,
  Shield
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DefinitiveLogo } from '@/components/Logo';

const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: "tween", ease: "circOut", duration: 0.4 }
  },
  closed: {
    x: '-100%',
    transition: { type: "tween", ease: "circIn", duration: 0.3 }
  }
};

const navItemsVariants = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 }
  }
};

const navItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { 
    y: 20, 
    opacity: 0 
  }
};

const Sidebar = ({ isOpen, onClose, currentChat, onChatChange, friendName, isPremiumUser, togglePremium, openPremiumModal, openAccountModal, openSettingsModal }) => {
  const { toast } = useToast();

  const chatOptions = [
    { id: 'general', title: 'Conversación General', icon: MessageCircle, isPremium: false },
    { id: 'mood-song', title: 'Canción para tu mood', icon: Music, isPremium: false },
    { id: 'dreams', title: 'Análisis de Sueños', icon: Brain, isPremium: true },
    { id: 'therapy', title: 'Apoyo Emocional', icon: Heart, isPremium: true },
    { id: 'meditation', title: 'Mindfulness', icon: Wind, isPremium: true },
    { id: 'motivation', title: 'Desarrollo Personal', icon: Zap, isPremium: false },
    { id: 'relationships', title: 'Relaciones', icon: Users, isPremium: true },
    { id: 'career', title: 'Carrera Profesional', icon: Briefcase, isPremium: true }
  ];

  const handleChatSelect = (chatId, isPremiumFeature) => {
    if (isPremiumFeature && !isPremiumUser) {
      toast({
        title: "Función Premium",
        description: "Esta función requiere una suscripción premium.",
        variant: "destructive",
      });
      return;
    }
    onChatChange(chatId);
  };

  const handleUpgradeToPremiumClick = () => {
    if (isPremiumUser) {
      toast({
        title: "Ya tienes Premium",
        description: "Disfruta de todas las funciones avanzadas.",
        className: "bg-green-600 text-white"
      });
    } else {
      openPremiumModal();
      if(onClose) onClose();
    }
  };

  const handleTogglePremium = () => {
    togglePremium();
    toast({
      title: `Modo Premium ${!isPremiumUser ? 'Activado' : 'Desactivado'}`,
      description: !isPremiumUser ? "Acceso completo activado." : "Vuelto al plan básico.",
      className: !isPremiumUser ? "bg-green-600 text-white" : "bg-primary text-primary-foreground"
    });
  };
  
  const handleOpenSettings = () => {
    if (openSettingsModal) {
        openSettingsModal();
        if(onClose) onClose();
    }
  };

  const handleOpenAccountModal = () => {
    if (openAccountModal) {
      openAccountModal();
      if(onClose) onClose();
    }
  }

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed left-0 top-0 h-full w-72 bg-card z-50 lg:relative lg:translate-x-0 text-card-foreground"
          >
            <div className="flex flex-col h-full">
              <motion.div 
                variants={navItemVariants}
                className="p-4 border-b border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <DefinitiveLogo className="w-8 h-8" />
                    <h2 className="text-xl font-bold text-foreground">Terap.Ia</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-muted-foreground hover:bg-muted lg:hidden rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <Button variant="ghost" className="w-full justify-start p-2 rounded-lg bg-muted/50 gap-3 h-auto" onClick={handleOpenAccountModal}>
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-left">{friendName}</p>
                    <p className="text-muted-foreground text-sm">Asistente Personal</p>
                  </div>
                </Button>
              </motion.div>

              <motion.div 
                variants={navItemsVariants}
                className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin"
              >
                <motion.h3 variants={navItemVariants} className="text-muted-foreground text-xs font-semibold mb-2 px-2 tracking-wider uppercase">Herramientas</motion.h3>
                
                {chatOptions.map((option) => (
                    <motion.div key={option.id} variants={navItemVariants}>
                      <Button
                        variant="ghost"
                        onClick={() => handleChatSelect(option.id, option.isPremium)}
                        disabled={option.isPremium && !isPremiumUser}
                        className={`w-full justify-start p-3 h-auto rounded-lg transition-all duration-200 text-left ${
                          currentChat === option.id 
                            ? 'bg-primary/10 text-primary font-bold' 
                            : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                        } ${option.isPremium && !isPremiumUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                          <option.icon className={`w-5 h-5 mr-3 shrink-0 ${currentChat === option.id ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{option.title}</span>
                              {option.isPremium && (
                                isPremiumUser ? <span className="premium-badge">PRO</span> : <Lock className="w-3 h-3 text-amber-500" />
                              )}
                            </div>
                          </div>
                      </Button>
                    </motion.div>
                ))}
              </motion.div>

              <motion.div variants={navItemVariants} className="px-4 pb-2 pt-2 border-t border-border">
                <motion.h3 variants={navItemVariants} className="text-muted-foreground text-xs font-semibold mb-2 px-2 tracking-wider uppercase">Legal</motion.h3>
                <motion.div variants={navItemVariants}>
                  <Button asChild variant="ghost" className="w-full justify-start p-3 h-auto rounded-lg text-foreground/80 hover:bg-muted hover:text-foreground" onClick={handleLinkClick}>
                    <Link to="/terms">
                      <FileText className="w-5 h-5 mr-3 shrink-0 text-muted-foreground" />
                      <span className="font-semibold">Términos de Servicio</span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div variants={navItemVariants}>
                  <Button asChild variant="ghost" className="w-full justify-start p-3 h-auto rounded-lg text-foreground/80 hover:bg-muted hover:text-foreground" onClick={handleLinkClick}>
                    <Link to="/privacy">
                      <Shield className="w-5 h-5 mr-3 shrink-0 text-muted-foreground" />
                      <span className="font-semibold">Política de Privacidad</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div variants={navItemVariants} className="p-4 border-t border-border space-y-2">
                <Button
                  onClick={handleUpgradeToPremiumClick}
                  disabled={isPremiumUser} 
                  size="lg"
                  className={`w-full font-bold text-lg rounded-lg transition-all ${isPremiumUser ? 'bg-green-500 hover:bg-green-600 text-white cursor-not-allowed opacity-70' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  {isPremiumUser ? 'Premium Activo' : 'Actualizar'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleTogglePremium}
                  size="sm"
                  className="w-full justify-center text-muted-foreground hover:bg-muted hover:text-foreground rounded-md"
                >
                  {isPremiumUser ? <Unlock className="w-4 h-4 mr-2 text-green-500" /> : <Lock className="w-4 h-4 mr-2 text-amber-500" />}
                   Simular {isPremiumUser ? 'Básico' : 'Premium'}
                </Button>

                <div className="flex gap-2">
                    <Button
                    variant="outline"
                    onClick={handleOpenAccountModal}
                    size="icon"
                    className="flex-1 justify-center text-muted-foreground hover:bg-muted hover:text-foreground rounded-md"
                    >
                    <User className="w-5 h-5" />
                    </Button>
                    <Button
                    variant="outline"
                    onClick={handleOpenSettings}
                    size="icon"
                    className="flex-1 justify-center text-muted-foreground hover:bg-muted hover:text-foreground rounded-md"
                    >
                    <Settings className="w-5 h-5" />
                    </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Sidebar };