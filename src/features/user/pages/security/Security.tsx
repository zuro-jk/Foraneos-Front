import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

const Security = () => {
  const [email, setEmail] = useState("joe@email.com");
  const [phone, setPhone] = useState("+51 999 999 999");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <span className="text-2xl font-bold">Seguridad</span>
      <form className="bg-gray-50 rounded-lg p-6 flex flex-col gap-6 max-w-xl">
        {/* Verificar correo */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold"
          >
            Correo electrónico
          </label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            type="email"
            disabled
          />
          <Button
            type="button"
            variant="outline"
            className="w-fit mt-2"
          >
            Verificar correo
          </Button>
        </div>
        {/* Verificar teléfono */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-sm font-semibold"
          >
            Teléfono
          </label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Teléfono"
            type="tel"
            disabled
          />
          <Button
            type="button"
            variant="outline"
            className="w-fit mt-2"
          >
            Verificar teléfono
          </Button>
        </div>
        {/* Cambiar contraseña */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold"
          >
            Nueva contraseña
          </label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nueva contraseña"
            type="password"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold"
          >
            Confirmar nueva contraseña
          </label>
          <Input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar nueva contraseña"
            type="password"
          />
        </div>
        <Button
          type="submit"
          className="w-fit self-end"
        >
          Cambiar contraseña
        </Button>
      </form>
    </div>
  );
};

export default Security;
