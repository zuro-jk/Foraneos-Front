const IngredientsPage = () => {
  return (
    <div className=" bg-[url('/images/ingredients/ingredients-background.png')] h-[876px] bg-cover bg-center">
      <div className="container mx-auto grid grid-cols-4 grid-rows-2 py-8 h-full gap-8">
        <div className="bg-green-400 row-span-2">
          <span className="font-bold text-xl">Proteínas</span>
          <ul>
            <li>Huevo</li>
            <li>Pollo</li>
            <li>Atún</li>

            <li>Huevo</li>
            <li>Pollo</li>
            <li>Atún</li>

            <li>Huevo</li>
            <li>Pollo</li>
            <li>Atún</li>

            <li>Huevo</li>
            <li>Pollo</li>
            <li>Atún</li>
          </ul>
        </div>
     
      </div>
    </div>
  );
};

export default IngredientsPage;
