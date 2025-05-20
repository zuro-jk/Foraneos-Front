import { Bell, Mail, AlertCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "info",
    title: "Bienvenido a Foráneos",
    message: "Tu cuenta ha sido creada exitosamente.",
    date: "2025-05-20",
    icon: <Bell className="text-green-600" />,
  },
  {
    id: 2,
    type: "warning",
    title: "Verifica tu correo",
    message:
      "Por favor, verifica tu correo electrónico para activar todas las funciones.",
    date: "2025-05-19",
    icon: <Mail className="text-yellow-500" />,
  },
  {
    id: 3,
    type: "alert",
    title: "Cambio de contraseña",
    message: "Tu contraseña fue cambiada recientemente.",
    date: "2025-05-18",
    icon: <AlertCircle className="text-red-500" />,
  },
];

const Notifications = () => {
  return (
    <div className="flex flex-col gap-8">
      <span className="text-2xl font-bold">Notificaciones</span>
      <div className="bg-gray-50 rounded-lg p-6 flex flex-col gap-4 max-w-2xl">
        {notifications.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No tienes notificaciones nuevas.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-4 border-b last:border-b-0 py-4"
            >
              <div className="mt-1">{notif.icon}</div>
              <div className="flex-1">
                <div className="font-semibold">{notif.title}</div>
                <div className="text-gray-500 text-sm">{notif.message}</div>
                <div className="text-xs text-gray-400 mt-1">{notif.date}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
