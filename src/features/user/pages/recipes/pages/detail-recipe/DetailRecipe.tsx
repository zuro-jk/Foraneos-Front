const DetailRecipe = () => {
  return (
    <div className="container mx-auto">

      <div className="drop-shadow-lg bg-white rounded-lg p-4">
        <div>
          
        </div>
  
        <div>
          <h1>Nombre de la receta</h1>
          <p>Descripción de la receta</p>
          <p>Tiempo de preparación: 30 minutos</p>
          <p>Porciones: 4</p>
          <p>Precio: $14.99</p>
          <p>Calorías: 485 cal</p>
        </div>
  
        <div className="contenido">
          <div className="card_ingredientes"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailRecipe;
