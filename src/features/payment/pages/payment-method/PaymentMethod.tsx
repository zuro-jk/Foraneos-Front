import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const PaymentMethod = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 bg-white rounded-xl shadow-xl p-4 h-[40rem]">
        <div className="flex flex-col gap-4 p-4">
          <span className="text-[51px] [font-family:'Cookie',sans-serif] text-[#324001] text-center">
            Foraneos
            <span className="text-lg relative top-2 [font-family:'RibeyeMarrow'] uppercase">
              IA
            </span>
          </span>

          <span className="text-center text-2xl mb-8">
            Registra tu tarjeta para continuar con el plan Premium
          </span>

          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="card-form">
              <AccordionTrigger className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-base font-medium transition ease-out hover:bg-gray-50 hover:no-underline cursor-pointer">
                Agregar Tarjeta
              </AccordionTrigger>
              <AccordionContent>
                <form className="flex flex-col gap-4 mt-4">
                  <Label htmlFor="owner-name">Nombre del propietario</Label>
                  <Input
                    type="text"
                    id="owner-name"
                    placeholder="Nombre del propietario"
                  />
                  <Label htmlFor="card-number">Número de tarjeta</Label>
                  <Input
                    type="text"
                    id="card-number"
                    placeholder="Número de tarjeta"
                    maxLength={16}
                  />
                  <div className="flex gap-2">
                    <div className="flex-1 flex flex-col gap-2">
                      <Label htmlFor="expiration-date">
                        Fecha de vencimiento
                      </Label>
                      <Input
                        type="number"
                        id="expiration-date"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        type="number"
                        id="cvv"
                        placeholder="CVV"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    variant="outline"
                  >
                    Pagar
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-l-black gap-4 p-4">
          <div className="grid grid-rows-2 grid-cols-2 gap-4 rounded-xl shadow-xl p-4 border border-black/20 w-[20rem] bg-white">
            {/* Div superior: ocupa las dos columnas */}
            <div className="col-span-2 flex flex-col items-start">
              <span className="font-bold">Plan Premium</span>
              <span>Beneficios</span>
              <span>Cero Anuncios</span>
            </div>
            {/* Inferior izquierdo */}
            <div className="flex items-center justify-start">
              <span>Costo total</span>
            </div>
            {/* Inferior derecho */}
            <div className="flex items-center justify-end">
              <span>S/7.99</span>
            </div>
          </div>

          <img
            src="/images/payment/payment-card-example.png"
            alt="card-example"
            className="w-[20rem] h-auto object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
