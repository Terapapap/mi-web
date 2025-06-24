import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle, Frown } from 'lucide-react';
import BackgroundAnimation from '@/components/ui/background-animation';
import { motion } from 'framer-motion';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4 relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <Frown className="w-24 h-24 text-destructive mb-6" />
        </motion.div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Pago cancelado</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          Parece que has cancelado el proceso de pago. No te preocupes, puedes volver a intentarlo cuando quieras.
        </p>
        <div className="flex items-center justify-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 mb-8">
          <XCircle className="w-6 h-6 mr-3" />
          <span className="font-semibold">Tu plan sigue siendo el Básico.</span>
        </div>
        <Button asChild size="lg" className="rounded-lg">
          <Link to="/chat">Volver al Chat</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentCancelPage;