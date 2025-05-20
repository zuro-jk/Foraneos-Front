import { Beef } from "lucide-react";
import { toast } from "react-toastify";

const MainDashboard = () => {
  const notify = () =>
    toast("¡Hola, Juanito! Bienvenido a tu panel de nutrición");

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-6 gap-8 p-8">
        <div className="col-span-2 shadow-xl flex flex-col items-center justify-center p-4">
          <div className="flex items-center justify-center gap-4">
            <Beef size={24} />
            <div>
              <span className="text-4xl text-blue-500">227</span>
              <span>g</span>
            </div>
          </div>
          <span className="uppercase text-gray-500 text-center">Protein</span>
          <div className="h-2 w-24 bg-red-500 rounded" />
        </div>
        <div className="col-span-2">CARD</div>
        <div className="col-span-2">CARD</div>

        <div className="col-span-3">Total Calories</div>
        <div className="col-span-3">Meal Calories</div>

        <div className="col-span-3">Macro goals</div>
        <div className="col-span-3">Logged Meals</div>
      </div>
    </div>
  );
};

export default MainDashboard;
