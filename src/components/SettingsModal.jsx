
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Palette, Trash2, AlertTriangle, Settings } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, onOpenThemeCustomizer, onClearHistory }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClearClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmClear = () => {
    onClearHistory();
    setIsConfirmOpen(false);
    onClose();
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <Settings className="mr-2 h-6 w-6 text-primary" />
              Configuración
            </DialogTitle>
            <DialogDescription>
              Gestiona las preferencias de tu aplicación.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              onClick={() => {
                onOpenThemeCustomizer();
                onClose();
              }}
              className="justify-start p-6 text-base"
            >
              <Palette className="mr-3 h-5 w-5 text-primary" />
              Personalizar Tema
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearClick}
              className="justify-start p-6 text-base bg-destructive/10 text-destructive-foreground hover:bg-destructive/20 border border-destructive/20"
            >
              <Trash2 className="mr-3 h-5 w-5" />
              Limpiar historial de chats
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-destructive"/>
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-2">
              Esta acción es irreversible. Se eliminarán todos los mensajes de todos tus chats de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClear} className="bg-destructive hover:bg-destructive/90">
              Sí, eliminar todo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SettingsModal;
