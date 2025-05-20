import {
  ArrowUpRight,
  BarChart,
  ChevronDown,
  Clock,
  Heart,
  Plus,
  Siren,
} from "lucide-react";
import { toast } from "react-toastify";
import CardActivityInformation from "./components/card-activity-information/CardActivityInformation";
import ChartCalories from "./components/chart-activity/ChartCalories";
import ChartMacronutrients from "./components/chart-activity/ChartMacronutrients";
import ChartTotalCalories from "./components/chart-activity/ChartTotalCalories";

const informationActivity = [
  {
    icon: Siren,
    iconColor: "transparent",
    backgroundColor: "transparent",
    title: "Calorías",
    value: "2,000",
    percentage: "12% más que ayer",
    percentageIcon: ArrowUpRight,
    percentageColor: "text-green-600",
  },
  {
    icon: Heart,
    iconColor: "text-blue-600",
    backgroundColor: "bg-blue-200",
    title: "Ingesta de proteinas",
    value: "82g",
    percentage: "8% sobre el objetivo",
    percentageIcon: ArrowUpRight,
    percentageColor: "text-green-600",
  },
  {
    icon: Clock,
    iconColor: "text-pink-600",
    backgroundColor: "bg-pink-200",
    title: "Recuento de comidas",
    value: "4/5",
    percentage: "En camino",
    percentageIcon: ArrowUpRight,
    percentageColor: "text-yellow-600",
  },
  {
    icon: BarChart,
    iconColor: "text-purple-600",
    backgroundColor: "bg-purple-200",
    title: "Ingesta de agua",
    value: "1.8L",
    percentage: "0.7L restantes",
    percentageIcon: ChevronDown,
    percentageColor: "text-red-600",
  },
];

const todaysMeals = [
  {
    id: 1,
    title: "Desayuno",
  },
  {
    id: 2,
    title: "Almuerzo",
  },
  {
    id: 3,
    title: "Cena",
  },
  {
    id: 4,
    title: "Aperitivos",
  },
];

const MainDashboard = () => {
  const notify = () =>
    toast("¡Hola, Juanito! Bienvenido a tu panel de nutrición");

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8 p-8">
        <div className="col-span-12">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <span className="text-gray-500 text-normal">
            Seguimiento de sus objetivos de nutrición y salud
          </span>
        </div>

        {informationActivity.map((item, index) => (
          <div
            className="col-span-3"
            key={index}
          >
            <CardActivityInformation
              icon={item.icon}
              backgroundColor={item.backgroundColor}
              iconColor={item.iconColor}
              title={item.title}
              value={item.value}
              percentage={item.percentage}
              percentageIcon={item.percentageIcon}
              percentageColor={item.percentageColor}
            />
          </div>
        ))}

        <div className="border-2 border-gray-300 border-dashed rounded shadow p-4 col-span-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out">
          <span className="text-lg flex items-center justify-center gap-2">
            <Plus />
            Añadir Comida
          </span>
        </div>
        <div className="border-2 border-gray-300 border-dashed rounded shadow p-4 col-span-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out">
          <span className="text-lg flex items-center justify-center gap-2">
            <Plus />
            Registrar Ejercicio
          </span>
        </div>
        <div className="border-2 border-gray-300 border-dashed rounded shadow p-4 col-span-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out">
          <span className="text-lg flex items-center justify-center gap-2">
            <Plus />
            Fijar un nuevo objetivo
          </span>
        </div>

        <div className="col-span-full flex flex-col gap-2 p-4 drop-shadow-lg rounded bg-white">
          <span className="font-bold text-lg">Comidas de hoy</span>
          <div className="grid grid-cols-4 gap-4">
            {todaysMeals.map((meal) => (
              <div
                className="border border-solid rounded shadow p-4 flex flex-col gap-1"
                key={meal.id}
              >
                <span>{meal.title}</span>
                <div className="border-2 border-dashed p-4 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out">
                  <span className="flex items-center justify-center text-gray-500 text-sm gap-2">
                    <Plus /> Añadir {meal.title.toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white drop-shadow-2xl rounded p-8 col-span-6">
          <span className="font-bold text-lg">Consumo semanal de calorías</span>
          <div className="flex flex-col items-center justify-center">
            <ChartTotalCalories />
          </div>
        </div>
        <div className="bg-white drop-shadow-2xl rounded p-8 col-span-6">
          <span className="font-bold text-lg">Total de calorías</span>
          <ChartCalories />
        </div>

        <div className="bg-white drop-shadow-2xl rounded p-8 col-span-6">
          <span className="font-bold text-lg">
            Distribución de macronutrientes
          </span>
          <ChartMacronutrients />
        </div>

        <div className="bg-white drop-shadow-2xl rounded p-8 col-span-6">
          <span className="font-bold text-lg">Comidas registradas</span>
          <div className="flex items-center justify-center h-full">
            <div className="bg-blue-800/10 w-[30rem] h-[16rem] p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="bg-gray-400/60 rounded-full px-4 py-1 w-fit text-white uppercase">
                  Desayuno
                </span>
                <ChartTotalCalories
                  value={60} // porcentaje de progreso, por ejemplo 60%
                  size={48} // tamaño pequeño
                  strokeWidth={6}
                  color="#2563eb" // azul, puedes cambiarlo
                  bgColor="#dbeafe" // azul claro, puedes cambiarlo
                  text="83"
                  showPercentageText={false}
                  className="justify-end"
                />
              </div>
              <div className="flex flex-col py-2 px-6">
                <div className="flex items-center justify-between border-b border-gray-300 py-2">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-red-300 rounded-full text-white">
                      P
                    </span>
                    <span>4 Huevos Blancos</span>
                  </div>
                  <span className="text-blue-700/80">60 Cal</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-300 py-2">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-300 rounded-full text-white">
                      F
                    </span>
                    <span>1 Aguacate</span>
                  </div>
                  <span className="text-blue-700/80">60 Cal</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-300 py-2">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-blue-300 rounded-full text-white">
                      C
                    </span>
                    <span>1 Taza de avena</span>
                  </div>
                  <span className="text-blue-700/80">60 Cal</span>
                </div>

                <div className="flex items-center justify-center">
                  <button className="absolute left-1/2 bottom-10 -translate-x-1/2 cursor-pointer drop-shadow-xl bg-blue-500 text-white rounded-full p-2">
                    <Plus size={34} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
