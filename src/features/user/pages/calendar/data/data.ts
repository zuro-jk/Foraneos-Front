export const EVENT_CATEGORIES = [
  {
    name: "comida",
    label: "Comidas",
    color: "bg-green-500",
  },
  {
    name: "estudio",
    label: "Estudio",
    color: "bg-blue-500",
  },
  {
    name: "ejercicio",
    label: "Ejercicio",
    color: "bg-red-500",
  },
  {
    name: "compras",
    label: "Compras",
    color: "bg-yellow-500",
  },
  {
    name: "social",
    label: "Social",
    color: "bg-purple-500",
  },
  {
    name: "otro",
    label: "Otro",
    color: "bg-gray-500",
  },
];



export const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Desayuno con amigos",
    description: "Desayuno saludable",
    category: "comida",
    startDate: new Date("2025-04-02T09:00:00"),
    endDate: new Date("2025-04-02T11:00:00"),
    startTime: "09:00",
    endTime: "11:00",
  },
  {
    id: 2,
    title: "Clase de React",
    description: "Repaso hooks",
    category: "estudio",
    startDate: new Date("2025-04-05T10:00:00"),
    endDate: new Date("2025-04-05T11:00:00"),
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 3,
    title: "Gimnasio",
    description: "Entrenamiento de fuerza",
    category: "ejercicio",
    startDate: new Date("2025-04-07T18:00:00"),
    endDate: new Date("2025-04-07T20:00:00"),
    startTime: "18:00",
    endTime: "20:00",
  },
  {
    id: 4,
    title: "Almuerzo familiar",
    description: "Comida en casa",
    category: "comida",
    startDate: new Date("2025-04-10T13:00:00"),
    endDate: new Date("2025-04-10T14:00:00"),
    startTime: "13:00",
    endTime: "14:00",
  },
  {
    id: 5,
    title: "Estudio de matemáticas",
    description: "Preparar examen",
    category: "estudio",
    startDate: new Date("2025-04-12T16:00:00"),
    endDate: new Date("2025-04-12T18:00:00"),
    startTime: "16:00",
    endTime: "18:00",
  },
  {
    id: 6,
    title: "Correr en el parque",
    description: "Cardio",
    category: "ejercicio",
    startDate: new Date("2025-04-15T19:00:00"),
    endDate: new Date("2025-04-15T20:00:00"),
    startTime: "19:00",
    endTime: "20:00",
  }
]
