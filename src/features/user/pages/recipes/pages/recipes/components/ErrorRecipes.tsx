import { Button } from '@/shared/ui/button';
import { AlertTriangle } from 'lucide-react';

const ErrorRecipes = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <AlertTriangle className="w-10 h-10 text-red-500" />
      <span className="text-lg text-red-600 font-semibold">
        No se pudieron cargar las recetas
      </span>
      <span className="text-gray-500">
        Por favor, verifica tu conexión o intenta nuevamente.
      </span>
      <Button
        onClick={() => window.location.reload()}
        variant="outline"
      >
        Reintentar
      </Button>
    </div>
  );
}

export default ErrorRecipes