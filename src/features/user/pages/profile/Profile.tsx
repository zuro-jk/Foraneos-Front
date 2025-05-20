import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { PencilLine } from "lucide-react";

const Profile = () => {
  return (
    <div className="flex flex-col col-span-6 p-4 gap-8 bg-white">
      <span className="text-2xl font-bold">Mi Perfil</span>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <Avatar className="cursor-pointer w-24 h-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Joe Luna</span>
            <span className="text-sm text-gray-500 font-semibold">
              Team Manager
            </span>
            <span className="text-xs text-gray-400">Perú</span>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm cursor-pointer h-fit text-gray-500">
          Editar <PencilLine size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-12">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-bold">Información personal</span>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm cursor-pointer h-fit text-gray-500">
              Editar <PencilLine size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Nombres</span>
              <span className="text-sm">Joe Demetrio</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Apellidos</span>
              <span className="text-sm">Gutierrez Luna</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Email</span>
              <span className="text-sm">DarckProyect2@gmail.com</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Celular</span>
              <span className="text-sm">+51 932 246 590</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Bio</span>
              <span className="text-sm">
                Desarrollador de software con experiencia en React y Node.js.
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="font-bold">Dirección</span>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm cursor-pointer h-fit text-gray-500">
              Editar <PencilLine size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Country</span>
              <span className="text-sm">Perú</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">City/State</span>
              <span className="text-sm">Ica, Perú</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Codigo Postal</span>
              <span className="text-sm">Ica 11001</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">TAX ID</span>
              <span className="text-sm">123456789</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
