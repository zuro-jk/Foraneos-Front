export const mockMeals = [
  {
    id: 1,
    title: "Desayuno",
    icon: "🍳",
    foods: [
      {
        id: 1,
        name: "Huevos",
        calories: 120,
        image:
          "https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2022/07/22/huevos.jpeg", // ejemplo
      },
      {
        id: 2,
        name: "Pan integral",
        calories: 80,
        image:
          "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/f1ec1b78-4db1-45ac-9189-40619b7fad74/Derivates/2c238c6b-e380-486e-b9dc-39e41695a5ba.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Almuerzo",
    icon: "🍗",
    foods: [
      {
        id: 3,
        name: "Pollo a la plancha",
        calories: 200,
        image:
          "https://www.paulinacocina.net/wp-content/uploads/2023/06/pollo-a-la-plancha-receta.jpg",
      },
      {
        id: 4,
        name: "Arroz",
        calories: 150,
        image:
          "https://recetas.encolombia.com/wp-content/uploads/2021/02/Arroz-blanco-receta.webp",
      },
      {
        id: 5,
        name: "Ensalada",
        calories: 60,
        image:
          "https://imag.bonviveur.com/ensalada-de-lechuga-y-tomate-foto-cerca.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Merienda",
    icon: "☕",
    foods: [
      {
        id: 6,
        name: "Batido",
        calories: 150,
        image:
          "https://s2.abcstatics.com/media/bienestar/2020/07/04/batidos-saludables-kdhH--1248x698@abc.jpeg",
      },
    ],
  },
  {
    id: 4,
    title: "Cena",
    icon: "🍽️",
    foods: [],
  },
];


export const macroGoals = { calories: 2000, protein: 120, carbs: 250, fat: 70 };
export const macroToday = { calories: 1320, protein: 70, carbs: 180, fat: 40 };
