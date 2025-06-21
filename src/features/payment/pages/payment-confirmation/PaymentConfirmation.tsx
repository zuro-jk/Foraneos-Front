const PaymentConfirmation = () => {
  return (
    <div className="flex flex-col items-center h-[75vh] max-h-screen px-4 py-12">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1 className="text-9xl [font-family:'Cookie',sans-serif] text-[#324001] text-center">
          Bienvenido a Foraneos
          <span className="text-lg relative top-2 [font-family:'RibeyeMarrow'] uppercase">
            IA
          </span>
          Juanito
        </h1>
      </div>
      <button
        className="mt-auto mb-4 bg-green-300 px-8 py-8 text-xl font-bold uppercase rounded-lg shadow-lg hover:bg-green-400 transition duration-300 ease-in-out"
        variant="outline"
      >
        Continuar
      </button>
    </div>
  );
};

export default PaymentConfirmation;
