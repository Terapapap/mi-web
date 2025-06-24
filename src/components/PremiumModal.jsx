import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageSquare, 
  Star, 
  CreditCard,
  Infinity,
  Zap,
  Shield,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PremiumModal = ({ isOpen, onClose, session }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const premiumFeatures = [
    { icon: Infinity, text: "Conversaciones y herramientas ilimitadas." },
    { icon: Zap, text: "Respuestas prioritarias y más rápidas." },
    { icon: Brain, text: "Acceso a los modelos de IA más avanzados." },
    { icon: MessageSquare, text: "Historial completo de conversaciones." },
    { icon: Star, text: "Funciones exclusivas y acceso anticipado." },
  ];

  const handlePurchase = () => {
    if (!session) {
      toast({
        title: "Inicio de sesión requerido",
        description: "Debes iniciar sesión para comprar Premium y guardar tu estado.",
        variant: "destructive",
        duration: 5000,
      });
      navigate('/login');
      onClose();
      return;
    }

    const stripePaymentLink = 'https://buy.stripe.com/4gM6oIaYwf483CXg968g000';
    let finalUrl = stripePaymentLink;

    if (session.user.email) {
      finalUrl = `${stripePaymentLink}?prefilled_email=${encodeURIComponent(session.user.email)}`;
    }
    
    window.location.href = finalUrl;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border border-border/50 rounded-2xl">
        <div className="p-6">
          <DialogHeader className="items-center text-center">
            <div className="p-3 bg-primary/10 rounded-full inline-block mb-4">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-semibold text-foreground">
              Desbloquea Terap.Ia Premium
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base mt-2">
              Lleva tu bienestar al siguiente nivel con herramientas ilimitadas.
            </DialogDescription>
          </DialogHeader>

          <div className="text-center bg-muted p-3 rounded-lg my-4">
              <p className="text-sm text-muted-foreground">Plan gratuito: <strong className="text-foreground">15 mensajes</strong> incluidos.</p>
          </div>

          <div className="my-6 bg-background p-4 rounded-lg border border-border">
            <div className="space-y-3">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <p className="text-foreground text-sm">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-col gap-3 p-6 bg-muted border-t border-border">
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground">
              €9.99<span className="text-base font-normal text-muted-foreground">/mes</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">Cancela en cualquier momento. Sin compromisos.</p>
          </div>
          <Button 
            size="lg" 
            onClick={handlePurchase}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium rounded-lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Actualizar a Premium
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full text-muted-foreground">
            Quizás más tarde
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;