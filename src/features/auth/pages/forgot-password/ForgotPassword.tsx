import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="container mx-auto h-[90vh] flex items-center justify-center">
      <div className="flex bg-white shadow-xl rounded-3xl overflow-hidden items-stretch">
        <img
          src="/images/auth/AuthFoodImage.png"
          alt="Food Image"
          className="object-cover h-full flex-1"
        />
        <div className="flex flex-col justify-center px-24 w-[30rem]">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[51px] [font-family:'Cookie',sans-serif] text-[#324001]">
                Foraneos
                <span className="text-lg relative top-2 [font-family:'RibeyeMarrow'] uppercase">
                  IA
                </span>
              </span>
              <span className="text-center text-sm">
                Ingresa tu correo electrónico para restablecer tu contraseña
              </span>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <Label
                htmlFor="email"
                className="text-sm font-semibold"
              >
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Correo electrónico"
                className="w-full"
              />
              <Button
                type="submit"
                variant="outline"
                className="cursor-pointer w-full bg-[#95b32d] text-white hover:bg-[#69b32d] transition duration-300 hover:text-white"
              >
                Restablecer contraseña
              </Button>
              <p className="flex items-center justify-center gap-2 text-xs ">
                ¿Ya tienes una cuenta?
                <Link to="/login">
                  <span className="text-yellow-500">Inicia sesión</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
