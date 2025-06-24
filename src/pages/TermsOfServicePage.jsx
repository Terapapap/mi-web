
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import BackgroundAnimation from '@/components/ui/background-animation';

const TermsOfServicePage = () => {
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
            <FileText className="w-8 h-8 mr-4 text-primary" />
            <h1 className="text-3xl font-bold">Términos de Servicio</h1>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
            <p><strong>Última actualización:</strong> 20 de junio de 2025</p>
            <p>Bienvenido a Terap.Ia. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web y servicios.</p>

            <h2 className="text-xl font-semibold text-foreground">1. Aceptación de los Términos</h2>
            <p>Al acceder a esta aplicación, asumimos que aceptas estos términos y condiciones. No continúes usando Terap.Ia si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.</p>

            <h2 className="text-xl font-semibold text-foreground">2. Uso de la Licencia</h2>
            <p>Se concede permiso para descargar temporalmente una copia de los materiales en la aplicación Terap.Ia solo para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título.</p>
            
            <h2 className="text-xl font-semibold text-foreground">3. Descargo de Responsabilidad</h2>
            <p>Los materiales en la aplicación Terap.Ia se proporcionan 'tal cual'. Terap.Ia no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías. Terap.Ia no es un sustituto de la terapia profesional o el consejo médico.</p>

            <h2 className="text-xl font-semibold text-foreground">4. Limitaciones</h2>
            <p>En ningún caso Terap.Ia o sus proveedores serán responsables de los daños (incluidos, entre otros, los daños por pérdida de datos o ganancias, o por interrupción del negocio) que surjan del uso o la imposibilidad de usar los materiales en Terap.Ia.</p>

            <h2 className="text-xl font-semibold text-foreground">5. Modificaciones</h2>
            <p>Terap.Ia puede revisar estos términos de servicio para su aplicación en cualquier momento sin previo aviso. Al usar esta aplicación, aceptas estar sujeto a la versión actual de estos términos de servicio.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
