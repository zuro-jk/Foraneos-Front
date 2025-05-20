import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      <AlertTriangle
        size={64}
        className="text-yellow-500"
      />
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-500 mb-4">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
