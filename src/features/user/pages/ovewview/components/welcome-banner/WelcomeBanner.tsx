import { Bot, Plus } from "lucide-react";

function WelcomeBanner() {
  const today = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="col-span-1 lg:col-span-2 xl:col-span-3 bg-gradient-to-r from-zinc-100 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          ¡Hola, Joe! 👋
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">{today}</p>
        <p className="mt-2 text-md text-gray-700 dark:text-gray-200">
          ¿Listo para cocinar rico y ahorrar hoy?
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button className="bg-white dark:bg-blue-600 dark:text-white text-blue-800 px-4 py-2 rounded-xl shadow hover:bg-blue-200 dark:hover:bg-blue-500 transition flex items-center cursor-pointer">
          <Plus /> Añadir receta rápida
        </button>
        <button className="bg-white dark:bg-purple-600 dark:text-white text-purple-800 px-4 py-2 rounded-xl shadow hover:bg-purple-200 dark:hover:bg-purple-500 transition flex items-center cursor-pointer">
          <Bot /> Ir al Chat IA
        </button>
      </div>
    </div>
  );
}

export default WelcomeBanner;
