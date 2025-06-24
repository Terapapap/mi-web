
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';

const ThemeCustomizer = ({ open, onOpenChange }) => {
  const [hue, setHue] = useState(217); 
  const [saturation, setSaturation] = useState(91);
  const [lightness, setLightness] = useState(60);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedHue = localStorage.getItem('themeHue');
    const storedSaturation = localStorage.getItem('themeSaturation');
    const storedLightness = localStorage.getItem('themeLightness');
    const storedThemeMode = localStorage.getItem('themeMode');

    if (storedHue) setHue(parseInt(storedHue, 10));
    if (storedSaturation) setSaturation(parseInt(storedSaturation, 10));
    if (storedLightness) setLightness(parseInt(storedLightness, 10));
    if (storedThemeMode) setIsDarkTheme(storedThemeMode === 'dark');
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.setProperty('--primary-hue', hue);
    document.documentElement.style.setProperty('--primary-saturation', `${saturation}%`);
    document.documentElement.style.setProperty('--primary-lightness', `${lightness}%`);
    
    localStorage.setItem('themeHue', hue.toString());
    localStorage.setItem('themeSaturation', saturation.toString());
    localStorage.setItem('themeLightness', lightness.toString());
    localStorage.setItem('themeMode', isDarkTheme ? 'dark' : 'light');
  }, [hue, saturation, lightness, isDarkTheme]);

  const handleReset = () => {
    setHue(217);
    setSaturation(91);
    setLightness(60);
    setIsDarkTheme(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-sans rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center font-display text-2xl">
            <Palette className="mr-2 h-6 w-6 text-primary" />
            Personalizar Tema
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Ajusta la apariencia de la aplicación a tu gusto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="hue-slider" className="font-semibold text-foreground">Tono ({hue}°)</Label>
            <Slider
              id="hue-slider"
              min={0}
              max={360}
              step={1}
              value={[hue]}
              onValueChange={(value) => setHue(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="saturation-slider" className="font-semibold text-foreground">Saturación ({saturation}%)</Label>
            <Slider
              id="saturation-slider"
              min={0}
              max={100}
              step={1}
              value={[saturation]}
              onValueChange={(value) => setSaturation(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lightness-slider" className="font-semibold text-foreground">Luminosidad ({lightness}%)</Label>
            <Slider
              id="lightness-slider"
              min={0}
              max={100}
              step={1}
              value={[lightness]}
              onValueChange={(value) => setLightness(value[0])}
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="theme-mode-toggle" className="font-semibold text-foreground">Modo Oscuro</Label>
            <Button 
              variant="outline"
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className="w-28 rounded-md"
            >
              {isDarkTheme ? "Activado" : "Desactivado"}
            </Button>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleReset} className="text-foreground rounded-md hover:bg-muted">Restablecer</Button>
          <Button onClick={() => onOpenChange(false)} className="bg-primary text-primary-foreground rounded-md">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeCustomizer;
