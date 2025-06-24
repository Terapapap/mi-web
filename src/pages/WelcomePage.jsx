import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Brain, LogIn, AlertTriangle, Shield, Users, Target, Check, HeartHandshake, Flame, Music } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DefinitiveLogo } from '@/components/Logo';
import BackgroundAnimation from '@/components/ui/background-animation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};


const WelcomePage = () => {
  const [friendName, setFriendName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartJourney = () => {
    setIsDisclaimerOpen(true);
  };
  
  const handleAcceptDisclaimer = () => {
    setIsDisclaimerOpen(false);
    setShowNameInput(true);
  };

  const handleNameSubmit = () => {
    if (!friendName.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor, asigna un nombre a tu asistente personal.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem('aiFriendName', friendName);
    navigate('/chat');
  };

  const features = [
    { icon: MessageCircle, title: "Diálogo Constructivo", description: "Conversaciones que te ayudan a reflexionar y crecer." },
    { icon: Music, title: "Tu Banda Sonora", description: "Encuentra la canción perfecta para cada estado de ánimo." },
    { icon: Target, title: "Seguimiento de Metas", description: "Define y alcanza tus objetivos de bienestar personal." }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center bg-background text-foreground p-4">
      <BackgroundAnimation />
      <AlertDialog open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen}>
        <AlertDialogContent className="rounded-xl bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3 text-xl font-semibold text-foreground">
              <AlertTriangle className="text-yellow-500 w-6 h-6 shrink-0"/>
              Información Importante
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-4 text-left text-base text-muted-foreground space-y-4">
              <div className="p-4 bg-card border border-yellow-500/50 rounded-lg">
                <p className="font-semibold text-yellow-600 dark:text-yellow-400">Esta herramienta no sustituye la atención profesional.</p>
                <p className="mt-2 text-muted-foreground">
                  Terap.Ia es una herramienta de apoyo. <strong>No está diseñada para crisis.</strong> Si necesitas ayuda urgente, contacta con un profesional.
                </p>
              </div>
              <div className="p-4 bg-card border border-primary/50 rounded-lg flex items-start gap-4">
                <HeartHandshake className="w-8 h-8 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-primary">Recuerda el valor del contacto humano.</p>
                  <p className="mt-1 text-muted-foreground">
                    Esta IA es un complemento, no un sustituto de amigos y familia. Las relaciones reales son esenciales.
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel asChild>
                <Button variant="outline" className="rounded-lg">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAcceptDisclaimer} className="bg-primary hover:bg-primary/90 rounded-lg">
                Entiendo y acepto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {!showNameInput ? (
            <motion.div
              key="welcome"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <motion.div
                variants={itemVariants}
                className="mx-auto w-24 h-24"
              >
                <DefinitiveLogo />
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight"
              >
                Desbloquea tu potencial, <br/> <span className="text-primary">una conversación a la vez</span>.
              </motion.h1>

              <motion.div variants={itemVariants} className="max-w-3xl mx-auto space-y-4">
                <p className="text-lg md:text-xl text-muted-foreground">
                  Terap.Ia es tu asistente personal de IA, diseñado para el autoconocimiento y el bienestar emocional.
                </p>
                 <p className="text-md md:text-lg text-muted-foreground/80">
                  Creemos en el poder de la conexión. Un verdadero amigo es un espejo que nos ayuda a entendernos mejor y a navegar la vida con más confianza.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-xl text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    </div>
                    <p className="mt-3 text-muted-foreground text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button onClick={handleStartJourney} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-lg w-full sm:w-auto">
                  <Shield className="w-5 h-5 mr-2" />
                  Comenzar Viaje como invitado
                </Button>
                <Button onClick={() => navigate('/login')} size="lg" variant="outline" className="bg-card/50 text-foreground hover:bg-muted px-8 py-3 text-lg font-semibold rounded-lg w-full sm:w-auto">
                  <LogIn className="w-5 h-5 mr-2" />
                  Ya tengo cuenta
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="nameInput"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-xl max-w-lg mx-auto"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 mx-auto mb-6"
                >
                  <DefinitiveLogo />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl md:text-3xl font-semibold text-foreground mb-2"
                >
                  Nombra a tu Asistente
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-base text-muted-foreground mb-6"
                >
                  Este nombre te acompañará en tus conversaciones.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-6"
                >
                  <Input type="text" placeholder="Ej: Kai, Aura, Nómada..." value={friendName} onChange={(e) => setFriendName(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()} className="text-center text-lg py-3 rounded-lg" autoFocus />

                  <div className="flex gap-3 justify-center">
                    <Button onClick={() => setShowNameInput(false)} variant="outline" className="px-6 py-2 rounded-lg bg-card">
                      Atrás
                    </Button>
                    <Button onClick={handleNameSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 rounded-lg">
                      <Check className="w-4 h-4 mr-2" />
                      Confirmar
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WelcomePage;