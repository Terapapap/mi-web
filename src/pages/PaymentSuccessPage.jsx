import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, PartyPopper } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BackgroundAnimation from '@/components/ui/background-animation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext.jsx';
import { supabase } from '@/lib/supabaseClient';

const PaymentSuccessPage = () => {
  const { toast } = useToast();
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const upgradeUser = async () => {
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ is_premium: true, updated_at: new Date().toISOString() })
          .eq('id', user.id);

        if (error) {
          toast({
            title: 'Error al actualizar tu cuenta',
            description: 'No pudimos actualizar tu estado a Premium. Por favor, contacta a soporte.',
            variant: 'destructive',
          });
        } else {
          await refreshProfile();
          toast({
            title: '¡Felicidades!',
            description: '¡Ahora eres un miembro Premium! Disfruta de todas las ventajas.',
            className: 'bg-green-600 text-white',
          });
        }
      } else {
        toast({
            title: 'Inicia sesión para ver tu estado Premium',
            description: 'Tu pago fue exitoso. Inicia sesión para activar tus beneficios.',
        });
        navigate('/login');
      }
    };

    upgradeUser();
  }, [user, toast, refreshProfile, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4 relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <PartyPopper className="w-24 h-24 text-primary mb-6" />
        </motion.div>
        <h1 className="text-4xl font-bold text-foreground mb-4">¡Pago completado con éxito!</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          ¡Felicidades y bienvenido a Premium! Tu cuenta ha sido actualizada. Ya puedes disfrutar de todas las funciones exclusivas.
        </p>
        <div className="flex items-center justify-center p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 mb-8">
          <CheckCircle className="w-6 h-6 mr-3" />
          <span className="font-semibold">Tu estado ahora es: Premium</span>
        </div>
        <Button asChild size="lg" className="rounded-lg">
          <Link to="/chat">Volver al Chat</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;