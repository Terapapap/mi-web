import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DefinitiveLogo } from '@/components/Logo';
import { useAuth } from '@/context/AuthContext.jsx';

const LoginPage = () => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message === 'Invalid login credentials' ? 'El correo o la contraseña son incorrectos.' : error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "¡Bienvenido de vuelta!",
        description: "Has iniciado sesión exitosamente.",
      });
    }
    setIsLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.password.length < 6) {
      toast({
        title: "Contraseña débil",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const { data, error } = await signUp({
      email: registerData.email,
      password: registerData.password,
      options: {
        data: {
          full_name: registerData.name,
        },
      },
    });

    if (error) {
      toast({
        title: "Error al registrarse",
        description: error.message,
        variant: "destructive",
      });
    } else if (data.user) {
      toast({
        title: "¡Bienvenido!",
        description: "Tu cuenta ha sido creada exitosamente.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="text-foreground hover:bg-muted rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-card border border-border/50 p-8 rounded-xl shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-4">
              <DefinitiveLogo />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bienvenido a Terap.Ia</h1>
            <p className="text-muted-foreground">
              Accede para continuar tu viaje.
            </p>
          </motion.div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted rounded-lg p-1">
              <TabsTrigger value="login" className="rounded-md">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-md">
                Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="pl-12 py-3 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="font-semibold">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="pl-12 py-3 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold rounded-lg flex items-center justify-center"
                >
                  {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                  {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                </Button>
              </motion.form>
            </TabsContent>

            <TabsContent value="register">
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">Nombre</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="name" type="text" placeholder="Tu nombre" value={registerData.name} onChange={(e) => setRegisterData({...registerData, name: e.target.value})} className="pl-12 py-3 rounded-lg" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="reg-email" type="email" placeholder="tu@email.com" value={registerData.email} onChange={(e) => setRegisterData({...registerData, email: e.target.value})} className="pl-12 py-3 rounded-lg" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="font-semibold">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="reg-password" type="password" placeholder="Mínimo 6 caracteres" value={registerData.password} onChange={(e) => setRegisterData({...registerData, password: e.target.value})} className="pl-12 py-3 rounded-lg" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="font-semibold">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="confirm-password" type="password" placeholder="Repite la contraseña" value={registerData.confirmPassword} onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})} className="pl-12 py-3 rounded-lg" required />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold rounded-lg mt-4 flex items-center justify-center">
                  {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                  {isLoading ? 'Creando...' : 'Crear Cuenta'}
                </Button>
              </motion.form>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;