
import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { BookHeart, Save, CalendarDays, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

const moods = [
  { emoji: '😄', label: 'Feliz' },
  { emoji: '😊', label: 'Bien' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😟', label: 'Preocupado' },
  { emoji: '😢', label: 'Triste' },
  { emoji: '😠', label: 'Enfadado' },
];

const JournalModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('today');
  const today = new Date().toISOString().split('T')[0];

  const fetchTodaysEntry = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('created_at', today)
      .single();

    if (data) {
      setSelectedMood({ emoji: data.mood_emoji, label: data.mood_label });
      setJournalText(data.content || '');
    } else {
      setSelectedMood(null);
      setJournalText('');
    }
    setIsLoading(false);
  }, [today]);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error", description: "No se pudo cargar el historial.", variant: "destructive" });
    } else {
      setEntries(data.map(entry => ({
        date: entry.created_at,
        mood: { emoji: entry.mood_emoji, label: entry.mood_label },
        entry: entry.content
      })));
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'today') {
        fetchTodaysEntry();
      } else {
        fetchHistory();
      }
    }
  }, [isOpen, activeTab, fetchTodaysEntry, fetchHistory]);

  const handleSave = async () => {
    if (!selectedMood) {
      toast({
        title: 'Selecciona un estado de ánimo',
        description: 'Por favor, elige cómo te sientes hoy.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Error", description: "Debes iniciar sesión para guardar.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    const entryData = {
      user_id: user.id,
      created_at: today,
      mood_emoji: selectedMood.emoji,
      mood_label: selectedMood.label,
      content: journalText,
    };

    const { error } = await supabase
      .from('journal_entries')
      .upsert(entryData, { onConflict: 'user_id, created_at' });

    setIsLoading(false);

    if (error) {
      toast({ title: "Error al guardar", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: '¡Entrada guardada!',
        description: 'Tu diario ha sido actualizado en la nube.',
        className: 'bg-green-600 text-white',
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center text-2xl font-bold">
            <BookHeart className="w-7 h-7 mr-3 text-primary" />
            Mi Diario Emocional
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base mt-2">
            Un espacio seguro para registrar tu ánimo y tus pensamientos, sincronizado en la nube.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 mx-auto rounded-none">
            <TabsTrigger value="today" className="py-3 text-base">Hoy</TabsTrigger>
            <TabsTrigger value="history" className="py-3 text-base">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-foreground">¿Cómo te sientes hoy?</h3>
                    <div className="flex justify-around items-center p-4 bg-muted/50 rounded-2xl">
                      {moods.map(mood => (
                        <motion.button
                          key={mood.label}
                          onClick={() => setSelectedMood(mood)}
                          className={`flex flex-col items-center gap-2 transition-all duration-200 ${selectedMood?.label === mood.label ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className={`text-4xl transition-transform duration-200 ${selectedMood?.label === mood.label ? 'scale-125' : ''}`}>{mood.emoji}</span>
                          <span className="text-xs font-medium">{mood.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Añade una nota a tu día:</h3>
                    <Textarea
                      placeholder="Escribe aquí tus pensamientos, ideas o lo que te apetezca..."
                      value={journalText}
                      onChange={(e) => setJournalText(e.target.value)}
                      className="min-h-[150px] bg-muted/50 border-border rounded-2xl text-base"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="history" className="p-6 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {entries.length > 0 ? (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {entries.map(entry => (
                        <motion.div
                          key={entry.date}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-muted/50 rounded-2xl border border-border/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{entry.mood.emoji}</span>
                              <p className="font-semibold text-lg text-foreground">{new Date(entry.date + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground whitespace-pre-wrap">{entry.entry || 'Sin nota para este día.'}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarDays className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">No hay entradas todavía</h3>
                    <p className="text-muted-foreground mt-2">Empieza a registrar tu día en la pestaña "Hoy".</p>
                  </div>
                )}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-6 bg-muted/30 border-t border-border">
          <Button variant="ghost" onClick={onClose}>Cerrar</Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Guardar Entrada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JournalModal;
