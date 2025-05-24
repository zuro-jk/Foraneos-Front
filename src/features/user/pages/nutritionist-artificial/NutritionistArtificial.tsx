const NutritionistArtificial = () => {

  

  return (
    <div className="container p-4 mx-auto">
      <div className="grid h-screen grid-cols-8">
        <div className="col-span-2 flex flex-col bg-[#416450]/50 backdrop-blur-[30px] p-8 rounded-tl-lg rounded-bl-lg">
          <span className="text-4xl font-bold text-center">Consultas</span>
          <ul className="flex flex-col gap-8 mt-8 flx">
            <li>Tengo que comer menos ...</li>
            <li>Los ejercicios son impor ...</li>
            <li>Puedo comer pastel de choc...</li>
            <li>Dejar de comer es malo?</li>
            <li>El agua es tan importante?</li>
          </ul>
        </div>
        <div className="col-span-6 bg-[#CBFFCD]/70 p-8 rounded-tr-lg rounded-br-lg backdrop-blur-[30px]">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold">Nutricionista IA</span>
            <img
              src="/images/icons/ia-icon.png"
              alt="Nutricionista IA"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionistArtificial;
