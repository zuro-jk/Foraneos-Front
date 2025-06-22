import { Bot, Calendar, ClipboardList, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Añadir receta",
      icon: PlusCircle,
      bg: "bg-blue-100 dark:bg-blue-800",
      textColor: "text-blue-700 dark:text-blue-200",
      onClick: () => toast("Ir a añadir receta"),
    },
    {
      title: "Ver lista de compras",
      icon: ClipboardList,
      bg: "bg-green-100 dark:bg-green-800",
      textColor: "text-green-700 dark:text-green-200",
      onClick: () => navigate("/user/shopping-list"),
    },
    {
      title: "Nutricionista IA",
      icon: Bot,
      bg: "bg-purple-100 dark:bg-purple-800",
      textColor: "text-purple-700 dark:text-purple-200",
      onClick: () => navigate("/user/nutritionist-ia"),
    },
    {
      title: "Planificador semanal",
      icon: Calendar,
      bg: "bg-yellow-100 dark:bg-yellow-700",
      textColor: "text-yellow-800 dark:text-yellow-100",
      onClick: () => navigate("/user/weekly-planner"),
    },
  ];

  return (
    <div className="col-span-1 lg:col-span-2 xl:col-span-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        ⚡ Accesos Rápidos
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map(({ title, icon: Icon, bg, textColor, onClick }) => (
          <button
            key={title}
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow ${bg} ${textColor} hover:brightness-105 transition cursor-pointer`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
