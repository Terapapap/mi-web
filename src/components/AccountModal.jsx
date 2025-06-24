
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, Mail, CreditCard, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const AccountModal = ({ isOpen, onClose, session }) => {
    const { toast } = useToast();

    const handleActionClick = (feature) => {
        toast({
            title: "Función no disponible",
            description: `La sección "${feature}" aún no está implementada.`,
            variant: "destructive"
        });
    };

    const handleLogout = async () => {
        onClose();
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast({
                title: "Error al cerrar sesión",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Has cerrado sesión",
                description: "¡Esperamos verte pronto!",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="flex items-center text-2xl font-bold">
                <User className="w-7 h-7 mr-3 text-primary" />
                Mi Cuenta
            </DialogTitle>
            <DialogDescription>
                Gestiona los detalles de tu perfil y suscripción.
            </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground">{session?.user?.email || 'Cargando...'}</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full justify-start gap-3" onClick={() => handleActionClick('Gestionar Suscripción')}>
                    <CreditCard className="w-5 h-5 text-primary"/>
                    Gestionar Suscripción
                </Button>
            </div>
            <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between">
                <Button variant="ghost" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2"/>
                    Cerrar Sesión
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
};

export default AccountModal;
