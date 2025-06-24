
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import BackgroundAnimation from '@/components/ui/background-animation';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <BackgroundAnimation />
      <div className="max-w-4xl mx-auto relative z-10">
        <Button asChild variant="outline" className="mb-8">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Inicio
          </Link>
        </Button>
        <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 mr-4 text-primary" />
            <h1 className="text-3xl font-bold">Política de Privacidad</h1>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
            <p><strong>Última actualización:</strong> 20 de junio de 2025</p>
            <p>Tu privacidad es importante para nosotros. Es política de Terap.Ia respetar tu privacidad con respecto a cualquier información que podamos recopilar de ti a través de nuestra aplicación.</p>

            <h2 className="text-xl font-semibold text-foreground">1. Información que recopilamos</h2>
            <p>Solo pedimos información personal cuando realmente la necesitamos para brindarte un servicio. La recopilamos por medios justos y legales, con tu conocimiento y consentimiento. También te informamos por qué la recopilamos y cómo se utilizará.</p>
            
            <h2 className="text-xl font-semibold text-foreground">2. Uso de datos</h2>
            <p>Solo retenemos la información recopilada durante el tiempo necesario para brindarte el servicio solicitado. Los datos que almacenamos, los protegeremos dentro de medios comercialmente aceptables para evitar pérdidas y robos, así como el acceso, la divulgación, la copia, el uso o la modificación no autorizados.</p>

            <h2 className="text-xl font-semibold text-foreground">3. Seguridad de los datos</h2>
            <p>La seguridad de tus datos es importante para nosotros, pero recuerda que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger tus Datos personales, no podemos garantizar su seguridad absoluta.</p>

            <h2 className="text-xl font-semibold text-foreground">4. Enlaces a otros sitios</h2>
            <p>Nuestra aplicación puede contener enlaces a otros sitios que no son operados por nosotros. Si haces clic en un enlace de un tercero, serás dirigido al sitio de ese tercero. Te recomendamos encarecidamente que revises la Política de privacidad de cada sitio que visites.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
