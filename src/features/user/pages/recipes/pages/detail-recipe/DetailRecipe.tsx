import { Heart, Printer, Share2, Star } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipe } from "../../hooks/useRecipe";

const DetailRecipe = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const id = Number(recipeId);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { data: recipe, isLoading, isError } = useRecipe(id);

  if (isLoading) {
    return <div className="container mx-auto p-8">Cargando receta...</div>;
  }

  if (isError || !recipe) {
    return (
      <div className="container mx-auto p-8">Error al cargar la receta.</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col bg-white rounded-lg p-12 shadow-lg gap-4">
        <h1 className="text-3xl font-bold text-center">{recipe.name}</h1>

        <div className="flex gap-4 items-center justify-center">
          <div className="flex gap-2">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          4.5 (23 votos)
          <button className="bg-red-500 cursor-pointer rounded-full p-2">
            <Heart size={16} />
          </button>
          <button className="bg-blue-500 cursor-pointer rounded-full p-2">
            <Share2 size={16} />
          </button>
          <button className="bg-gray-500 cursor-pointer rounded-full p-2">
            <Printer size={16} />
          </button>
        </div>

        <div className="informacion-principal grid grid-cols-1 md:grid-cols-3 gap-8 items-start bg-gray-50 rounded-lg p-6 shadow">
          {/* Imagen principal */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={recipe.image || "/images/recipes/receta-1.png"}
              alt={recipe.name}
              className="rounded-lg object-cover w-full max-w-xs h-64 shadow-md border"
            />
            {/* Acciones rápidas */}
            <div className="flex gap-2">
              <button
                className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                title="Favorito"
              >
                <Heart size={18} />
              </button>
              <button
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
                title="Compartir"
              >
                <Share2 size={18} />
              </button>
              <button
                className="bg-gray-500 text-white rounded-full p-2 hover:bg-gray-600 transition"
                title="Imprimir"
              >
                <Printer size={18} />
              </button>
            </div>
            {/* Valoración rápida */}
            <div className="flex items-center gap-1 mt-2">
              <Star
                fill="#facc15"
                color="#facc15"
                size={18}
              />
              <span className="font-bold text-yellow-600">
                {recipe.rating ?? 4.5}
              </span>
              <span className="text-xs text-gray-500">
                ({recipe.votes ?? 23} votos)
              </span>
            </div>
          </div>

          {/* Meta info y descripción */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Nombre y categorías */}
            <div>
              <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
              {recipe.categories && recipe.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {recipe.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Descripción */}
            <div>
              <span className="font-semibold text-base">Descripción</span>
              <p className="text-gray-700 mt-1">
                {recipe.description ??
                  "No hay descripción disponible para esta receta."}
              </p>
            </div>
            {/* Info rápida */}
            <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1 bg-white rounded px-3 py-1 shadow">
                🕒 <span>Preparación:</span>
                <b className="ml-1">{recipe.prepTime ?? "30 minutos"}</b>
              </div>
              <div className="flex items-center gap-1 bg-white rounded px-3 py-1 shadow">
                🍽️ <span>Porciones:</span>
                <b className="ml-1">{recipe.servings ?? "4"}</b>
              </div>
              <div className="flex items-center gap-1 bg-white rounded px-3 py-1 shadow">
                🔥 <span>Calorías:</span>
                <b className="ml-1">{recipe.calories ?? "250"} kcal</b>
              </div>
              <div className="flex items-center gap-1 bg-white rounded px-3 py-1 shadow">
                💰 <span>Costo:</span>
                <b className="ml-1">{recipe.cost ?? "S/7.00"}</b>
              </div>
              {/* Puedes agregar dificultad, autor, fecha, etc. */}
            </div>
            {/* Meta info extra */}
            <div className="flex flex-wrap gap-4 text-gray-500 text-xs mt-2">
              <span>
                Marca: <b>{recipe.brand}</b>
              </span>
              <span>
                Código de barras: <b>{recipe.barcode}</b>
              </span>
              <span>
                ID usuario: <b>{recipe.userId}</b>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <span className="font-semibold text-lg flex items-center gap-2 mb-2">
              🔪 Ingredientes
            </span>
            <ul className="space-y-2">
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 shadow-sm"
                  >
                    <span className="text-green-600 font-bold">{idx + 1}.</span>
                    <span className="font-semibold">
                      {ing.amount}
                      {ing.unit ? ` ${ing.unit}` : ""}
                    </span>
                    <span className="text-gray-700">de {ing.name}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 shadow-sm">
                    <span className="text-green-600 font-bold">1.</span>
                    <span className="font-semibold">2 unidades</span>
                    <span className="text-gray-700">de pechugas de pollo</span>
                  </li>
                  <li className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 shadow-sm">
                    <span className="text-green-600 font-bold">2.</span>
                    <span className="font-semibold">1 unidad</span>
                    <span className="text-gray-700">de cebolla roja</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="">
            <span className="font-semibold text-lg flex items-center gap-2 mb-2">
              📋 Pasos
            </span>
            <ol className="relative border-l-2 border-gray-300 ml-4 mt-2">
              {recipe.preparationSteps &&
                recipe.preparationSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="mb-8 ml-6 last:mb-0 relative flex items-center"
                  >
                    <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white font-bold border-4 border-white shadow">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 ml-4">
                      {step.description || `Paso ${idx + 1}`}
                    </span>
                  </li>
                ))}
            </ol>
          </div>
        </div>

        <div className="mt-6">
          <span className="font-semibold text-lg flex items-center gap-2 mb-2">
            💡 Consejos y variantes
          </span>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3 flex items-start gap-2 shadow-sm">
              <span className="text-yellow-400">💡</span>
              <span>
                Utiliza pechugas de pollo orgánico para un mejor sabor.
              </span>
            </li>
            <li className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3 flex items-start gap-2 shadow-sm">
              <span className="text-yellow-400">🥕</span>
              <span>
                Agrega verduras como zanahorias o pimientos para más color.
              </span>
            </li>
            <li className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3 flex items-start gap-2 shadow-sm">
              <span className="text-yellow-400">🍚</span>
              <span>
                Sirve con arroz blanco o integral para una comida completa.
              </span>
            </li>
          </ul>
        </div>

        <div className="nutricion">
          <span className="font-semibold text-lg flex items-center gap-2 mb-2">
            🍽️ Nutrición
          </span>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="bg-gray-50 rounded p-3 flex flex-col items-center min-w-[110px]">
              <span className="text-xs text-gray-500">Calorías</span>
              <span className="font-bold text-gray-700 text-lg">
                {recipe.calories} kcal
              </span>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 rounded p-3 flex flex-col items-center min-w-[110px]">
              <span className="text-xs text-gray-500">Proteínas</span>
              <span className="font-bold text-green-700 text-lg">
                {recipe.protein}g
              </span>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-3 flex flex-col items-center min-w-[110px]">
              <span className="text-xs text-gray-500">Carbohidratos</span>
              <span className="font-bold text-blue-700 text-lg">
                {recipe.carbs}g
              </span>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3 flex flex-col items-center min-w-[110px]">
              <span className="text-xs text-gray-500">Grasas</span>
              <span className="font-bold text-yellow-700 text-lg">
                {recipe.fat}g
              </span>
            </div>
          </div>
        </div>

        <div className="valoracion flex flex-col gap-2 bg-yellow-50 border-l-4 border-yellow-400 rounded p-4 mt-6 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <Star
              fill="#facc15"
              color="#facc15"
              size={20}
            />
            <span className="font-bold text-lg">{4.5}</span>
            <span className="text-gray-500 text-sm">(23 votos)</span>
          </div>
          <span className="text-sm text-gray-600 mb-1">Tu valoración:</span>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                style={{ cursor: "pointer", transition: "transform 0.1s" }}
                className={star <= (hover || rating) ? "scale-110" : ""}
                title={
                  ["Malo", "Regular", "Bueno", "Muy bueno", "Excelente"][
                    star - 1
                  ]
                }
              >
                <Star
                  fill={star <= (hover || rating) ? "#facc15" : "none"}
                  color={star <= (hover || rating) ? "#facc15" : "#a3a3a3"}
                />
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-400">
            {rating > 0
              ? ["Malo", "Regular", "Bueno", "Muy bueno", "Excelente"][
                  rating - 1
                ]
              : "Selecciona tu puntuación"}
          </span>
        </div>

        <div className="comentarios mt-8">
          <span className="font-semibold text-lg flex items-center gap-2 mb-4">
            💬 Comentarios
          </span>
          <div className="space-y-4 mb-4">
            {/* Ejemplo de comentario, reemplaza por tu array de comentarios */}
            <div className="flex items-start gap-3 bg-gray-50 rounded p-3 shadow-sm">
              <img
                src="https://imgs.search.brave.com/Sg7lo2_LqZHHRBO5FaGn26NfAkky6mARkNAxe1Q4aw8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/Nno0LTJ5QXhUMndB/QUFBTS9yaWNrLWFu/ZC1tb3J0eS1yaWNr/LXByaW1lLmdpZg.jpeg"
                alt="Usuario123"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Usuario123</span>
                  <span className="text-xs text-gray-400">2024-06-01</span>
                </div>
                <div className="text-gray-700">
                  ¡Excelente receta! Muy fácil de seguir y el resultado fue
                  delicioso.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded p-3 shadow-sm">
              <img
                src="https://imgs.search.brave.com/Sg7lo2_LqZHHRBO5FaGn26NfAkky6mARkNAxe1Q4aw8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/Nno0LTJ5QXhUMndB/QUFBTS9yaWNrLWFu/ZC1tb3J0eS1yaWNr/LXByaW1lLmdpZg.jpeg"
                alt="CocineraFeliz"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">CocineraFeliz</span>
                  <span className="text-xs text-gray-400">2024-06-02</span>
                </div>
                <div className="text-gray-700">
                  Me encantó, le añadí un poco de ajo y quedó espectacular.
                </div>
              </div>
            </div>
          </div>
          <textarea
            placeholder="Escribe tu comentario..."
            className="w-full p-2 border rounded mb-2"
            rows={2}
          ></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Enviar comentario
          </button>
        </div>

        <div className="similares-recetas mt-8">
          <span className="font-semibold text-lg flex items-center gap-2 mb-4">
            🥘 Recetas similares
          </span>
          <div className="flex flex-wrap gap-4 mt-2">
            {/* Puedes mapear un array de recetas similares aquí */}
            <div className="bg-white border rounded shadow-sm flex items-center gap-3 p-3 hover:shadow-md transition cursor-pointer min-w-[180px]">
              <span className="text-2xl">🍲</span>
              <div>
                <div className="font-semibold">Arroz chaufa barato</div>
                <button className="text-blue-500 text-xs mt-1 hover:underline">
                  Ver receta
                </button>
              </div>
            </div>
            <div className="bg-white border rounded shadow-sm flex items-center gap-3 p-3 hover:shadow-md transition cursor-pointer min-w-[180px]">
              <span className="text-2xl">🍝</span>
              <div>
                <div className="font-semibold">Tallarines con atún</div>
                <button className="text-blue-500 text-xs mt-1 hover:underline">
                  Ver receta
                </button>
              </div>
            </div>
            <div className="bg-white border rounded shadow-sm flex items-center gap-3 p-3 hover:shadow-md transition cursor-pointer min-w-[180px]">
              <span className="text-2xl">🥦</span>
              <div>
                <div className="font-semibold">Salteado de verduras</div>
                <button className="text-blue-500 text-xs mt-1 hover:underline">
                  Ver receta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="container mx-auto py-8">
    //   <div className="drop-shadow-lg bg-white rounded-lg p-6 flex flex-col md:flex-row gap-8">
    //     {/* Imagen y acciones */}
    //     <div className="flex flex-col items-center md:w-1/3 gap-4">
    //       <img
    //         src="/images/recipes/receta-1.png"
    //         alt={recipe.name}
    //         className="rounded object-cover w-full"
    //       />
    //       <div className="flex gap-2 mt-2">
    //         <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
    //           Agregar a favoritos
    //         </button>
    //         <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
    //           Compartir
    //         </button>
    //         <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition">
    //           Imprimir
    //         </button>
    //       </div>
    //       <div className="mt-4 text-center">
    //         <span className="text-yellow-500 font-bold text-lg">
    //           {"★".repeat(Math.floor(rating))}
    //           {"☆".repeat(5 - Math.floor(rating))}
    //         </span>
    //         <span className="ml-2 text-gray-600 text-sm">({rating}/5)</span>
    //         <div className="text-xs text-gray-400 mt-1">
    //           Valoraciones de usuarios
    //         </div>
    //       </div>
    //     </div>
    //     {/* Detalles */}
    //     <div className="flex-1 flex flex-col gap-6">
    //       {/* Encabezado y meta info */}
    //       <div>
    //         <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
    //         <div className="flex flex-wrap gap-4 text-gray-600 mb-2">
    //           <span>
    //             Marca: <b>{recipe.brand}</b>
    //           </span>
    //           <span>
    //             Código de barras: <b>{recipe.barcode}</b>
    //           </span>
    //           <span>
    //             ID usuario: <b>{recipe.userId}</b>
    //           </span>
    //         </div>
    //         <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-2">
    //           <span>
    //             Autor: <b>{author}</b>
    //           </span>
    //           <span>
    //             Fecha: <b>{createdAt}</b>
    //           </span>
    //           <span>
    //             Dificultad: <b>{difficulty}</b>
    //           </span>
    //           <span>
    //             Porciones: <b>{servings}</b>
    //           </span>
    //           <span>
    //             Preparación: <b>{prepTime}</b>
    //           </span>
    //           <span>
    //             Cocción: <b>{cookTime}</b>
    //           </span>
    //         </div>
    //         {recipe.categories && recipe.categories.length > 0 && (
    //           <div className="mb-2">
    //             <span className="font-semibold">Categorías: </span>
    //             {recipe.categories.map((cat, idx) => (
    //               <span
    //                 key={idx}
    //                 className="inline-block bg-gray-200 rounded px-2 py-1 text-xs mr-2"
    //               >
    //                 {cat}
    //               </span>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //       {/* Información nutricional ampliada */}
    //       <div className="bg-gray-50 rounded p-4 flex flex-wrap gap-6">
    //         <div>
    //           <span className="block text-xs text-gray-500">Calorías</span>
    //           <span className="font-bold">{recipe.calories} cal</span>
    //         </div>
    //         <div>
    //           <span className="block text-xs text-gray-500">Proteínas</span>
    //           <span className="font-bold">{recipe.protein} g</span>
    //         </div>
    //         <div>
    //           <span className="block text-xs text-gray-500">Carbohidratos</span>
    //           <span className="font-bold">{recipe.carbs} g</span>
    //         </div>
    //         <div>
    //           <span className="block text-xs text-gray-500">Grasas</span>
    //           <span className="font-bold">{recipe.fat} g</span>
    //         </div>
    //         {/* Puedes agregar más nutrientes aquí */}
    //       </div>
    //       {/* Ingredientes */}
    //       <div>
    //         <h2 className="text-xl font-semibold mt-4 mb-2">Ingredientes</h2>
    //         <ul className="list-disc list-inside space-y-1">
    //           {recipe.ingredients.map((ing, idx) => (
    //             <li key={idx}>
    //               <span className="font-semibold">
    //                 {ing.amount} {ing.unit ?? ""}
    //               </span>{" "}
    //               {ing.name}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       {/* Pasos de preparación */}
    //       <div>
    //         <h2 className="text-xl font-semibold mt-4 mb-2">Preparación</h2>
    //         <ol className="list-decimal list-inside space-y-1">
    //           {recipe.preparationSteps.map((step) => (
    //             <li key={step.id}>
    //               <span className="font-semibold mr-2">
    //                 Paso {step.stepNumber}:
    //               </span>
    //               {step.description}
    //             </li>
    //           ))}
    //         </ol>
    //       </div>
    //       {/* Sugerencias y comentarios */}
    //       <div className="mt-6">
    //         <h2 className="text-xl font-semibold mb-2">
    //           Comentarios y sugerencias
    //         </h2>
    //         <div className="bg-gray-100 rounded p-4 text-gray-500 italic mb-2">
    //           (Aquí podrían ir comentarios de usuarios, valoraciones, o
    //           sugerencias para mejorar la receta)
    //         </div>
    //         <textarea
    //           className="w-full border rounded p-2 text-sm"
    //           placeholder="Escribe tu comentario o sugerencia..."
    //           rows={3}
    //         />
    //         <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
    //           Enviar comentario
    //         </button>
    //       </div>

    //       {/* Comentarios de ejemplo */}
    //       <div className="mb-6">
    //         <h2 className="text-lg font-semibold mb-2">
    //           Comentarios recientes
    //         </h2>
    //         <div className="space-y-4">
    //           <div className="flex items-start gap-3 bg-gray-50 rounded p-3">
    //             <img
    //               src="/images/avatars/user1.png"
    //               alt="fit_user"
    //               className="w-8 h-8 rounded-full"
    //             />
    //             <div>
    //               <div className="flex items-center gap-2">
    //                 <span className="font-semibold">fit_user</span>
    //                 <span className="text-xs text-gray-400">2024-06-01</span>
    //                 <span className="text-yellow-500 text-sm">★★★★★</span>
    //               </div>
    //               <div className="text-gray-700">
    //                 ¡Me encantó! Fácil y rápida.
    //               </div>
    //             </div>
    //           </div>
    //           <div className="flex items-start gap-3 bg-gray-50 rounded p-3">
    //             <img
    //               src="/images/avatars/user2.png"
    //               alt="healthy_girl"
    //               className="w-8 h-8 rounded-full"
    //             />
    //             <div>
    //               <div className="flex items-center gap-2">
    //                 <span className="font-semibold">healthy_girl</span>
    //                 <span className="text-xs text-gray-400">2024-06-02</span>
    //                 <span className="text-yellow-500 text-sm">★★★★☆</span>
    //               </div>
    //               <div className="text-gray-700">
    //                 Le agregué pollo y quedó genial.
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DetailRecipe;
