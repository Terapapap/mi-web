import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DefinitiveLogo } from '@/components/Logo';
import {
  X,
  MessageSquare,
  Moon,
  Sun,
  Palette,
  Brain,
  Zap,
  Heart,
  Briefcase,
  Sparkles,
  Lock,
  Star,
  Users,
} from 'lucide-react';

const LegacySidebar = ({ isOpen, onClose, currentChat, onChatChange, friendName, openThemeCustomizer, isPremiumUser, togglePremium, openPremiumModal }) => {
  const chatOptions = [
    { id: 'general', icon: Users, label: `Chat con ${friendName}`, isPremium: false },
    { id: 'dreams', icon: Brain, label: 'Análisis de Sueños', isPremium: true },
    { id: 'therapy', icon: Heart, label: 'Terapia Virtual', isPremium: true },
    { id: 'motivation', icon: Zap, label: 'Motivación', isPremium: false },
    { id: 'relationships', icon: Sparkles, label: 'Relaciones', isPremium: true },
    { id: 'career', icon: Briefcase, label: 'Carrera', isPremium: true },
    { id: 'meditation', icon: Moon, label: 'Meditación', isPremium: true },
  ];

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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 flex flex-col"
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <div className="w-10 h-10">
                <DefinitiveLogo />
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <p className="text-sm font-semibold text-muted-foreground px-2 mb-2">HERRAMIENTAS</p>
              {chatOptions.map(option => (
                <Button
                  key={option.id}
                  variant={currentChat === option.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-3"
                  onClick={() => onChatChange(option.id)}
                >
                  <option.icon className="w-5 h-5" />
                  <span>{option.label}</span>
                  {option.isPremium && !isPremiumUser && <Lock className="w-4 h-4 ml-auto text-yellow-500" />}
                </Button>
              ))}
            </div>

            <div className="p-4 border-t border-border space-y-2">
               <Button variant="outline" className="w-full justify-start gap-3" onClick={openThemeCustomizer}>
                <Palette className="w-5 h-5" /> Personalizar Tema
              </Button>
               <Button variant="premium" className="w-full justify-start gap-3" onClick={openPremiumModal}>
                <Star className="w-5 h-5" /> Premium
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LegacySidebar;
