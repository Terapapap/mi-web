import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ApiKeysModal = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [apiKey, setApiKey] = useState('');

    const handleSave = () => {
        if (!apiKey.startsWith('sk-')) {
            toast({
                title: 'Clave no válida',
                description: 'La clave de API de OpenAI no parece correcta. Debe empezar con "sk-".',
                variant: 'destructive',
            });
            return;
        }
        
        localStorage.setItem('openai_api_key', apiKey);
        toast({
            title: '¡Clave guardada!',
            description: 'Tu clave de API de OpenAI ha sido guardada de forma segura.',
            className: 'bg-green-500 text-white',
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg glass-effect">
            <DialogHeader>
            <DialogTitle className="flex items-center text-2xl font-bold">
                <KeyRound className="w-7 h-7 mr-3 text-primary" />
                Conectar OpenAI
            </DialogTitle>
            <DialogDescription>
                Introduce tu clave de API de OpenAI para activar la IA avanzada.
            </DialogDescription>
            </DialogHeader>
            
            <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg my-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0"/>
                    <div>
                        <p className="font-semibold text-yellow-300">Importante: Conexión a Supabase Requerida</p>
                        <p className="mt-2 text-yellow-400/80 text-sm">
                            Para usar tu clave de forma segura, primero debes conectar tu proyecto de Supabase. Esto protege tu clave y evita que sea expuesta en el navegador.
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-4 space-y-2">
                <Label htmlFor="api-key">Clave de API de OpenAI</Label>
                <Input 
                    id="api-key" 
                    type="password" 
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-muted border-border"
                />
                <p className="text-xs text-muted-foreground">
                    Tu clave se guardará localmente. Para producción, se usará Supabase. Puedes obtener tu clave en <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com</a>.
                </p>
            </div>

            <DialogFooter>
                <Button variant="ghost" onClick={onClose}>
                    Cancelar
                </Button>
                <Button onClick={handleSave}>
                    Guardar Clave
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
};

export default ApiKeysModal;