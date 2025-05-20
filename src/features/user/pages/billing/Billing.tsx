import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";

const invoices = [
  {
    id: "INV-001",
    date: "2025-05-01",
    amount: "$19.99",
    status: "Pagado",
    url: "#",
  },
  {
    id: "INV-002",
    date: "2025-04-01",
    amount: "$19.99",
    status: "Pagado",
    url: "#",
  },
  {
    id: "INV-003",
    date: "2025-03-01",
    amount: "$19.99",
    status: "Pendiente",
    url: "#",
  },
];

const Billing = () => {
  return (
    <div className="flex flex-col gap-8">
      <span className="text-2xl font-bold">Facturación</span>
      <div className="bg-gray-50 rounded-lg p-6 flex flex-col gap-6 max-w-2xl">
        {/* Resumen de suscripción */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-lg">Suscripción actual</span>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Plan Pro</span>
              <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Activo
              </span>
            </div>
            <Button
              variant="outline"
              className="text-sm"
            >
              Cambiar plan
            </Button>
          </div>
          <div className="text-gray-500 text-sm">Renovación: 01/06/2025</div>
        </div>

        {/* Historial de facturación */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-lg">
            Historial de facturación
          </span>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Fecha</th>
                  <th className="py-2 px-4">Monto</th>
                  <th className="py-2 px-4">Estado</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b last:border-b-0"
                  >
                    <td className="py-2 px-4">{inv.id}</td>
                    <td className="py-2 px-4">{inv.date}</td>
                    <td className="py-2 px-4">{inv.amount}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          inv.status === "Pagado"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <a
                        href={inv.url}
                        className="text-green-600 hover:underline"
                      >
                        Ver PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Método de pago */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-lg">Método de pago</span>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Visa **** 4242</span>
              <span className="ml-2 text-xs text-gray-400">Expira 12/27</span>
            </div>
            <Link to="/user/payment-method">
              <Button
                variant="outline"
                className="text-sm cursor-pointer"
              >
                Actualizar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
