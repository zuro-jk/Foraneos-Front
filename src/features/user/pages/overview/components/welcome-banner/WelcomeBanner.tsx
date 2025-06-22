import { useUserStore } from "@/store/userStore";
import { Bot, CalendarDays, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function WelcomeBanner() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "¡Buenos días"
      : hour < 18
      ? "¡Buenas tardes"
      : "¡Buenas noches";

  return (
    <section className="col-span-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-zinc-800 dark:to-zinc-700 p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all">
      {/* Texto de bienvenida */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          👋 {greeting}, {user?.username}!
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <CalendarDays size={16} /> {today}
        </p>
        <p className="text-base text-gray-700 dark:text-gray-200">
          ¿Listo para cocinar rico y ahorrar hoy? 🥗
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          aria-label="Añadir receta rápida"
          onClick={() =>
            toast.info("Pronto podrás añadir tus propias recetas 😋")
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm shadow-md transition flex items-center gap-2 justify-center cursor-pointer"
        >
          <Plus size={18} /> Añadir receta rápida
        </button>

        <button
          aria-label="Ir al chat de IA"
          onClick={() => navigate("/user/nutritionist-ia")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm shadow-md transition flex items-center gap-2 justify-center cursor-pointer"
        >
          <Bot size={18} /> Ir al Chat IA
        </button>
      </div>
    </section>
  );
}

export default WelcomeBanner;
