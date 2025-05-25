import { Button } from "@/shared/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Clock } from "lucide-react";
import CardBodyDifficult from "./components/card-body-difficult/CardBodyDifficult";

const exercises = [
  {
    exercise: "Crunch Abdominales",
    image: "/images/calistesnia/crunch-abdominales.jpg",
    series: 3,
    repetitions: 10,
    calories: 50,
    restTime: "30 seg",
  },
  {
    exercise: "Twist Ruso",
    image: "/images/calistesnia/twist-ruso.jpg",
    series: 3,
    repetitions: 10,
    calories: 50,
    restTime: "30 seg",
  },
  {
    exercise: "Escalada de montaña",
    image: "/images/calistesnia/escalada-de-montaña.webp",
    series: 3,
    repetitions: 10,
    calories: 50,
    restTime: "30 seg",
  },
  {
    exercise: "Toque al talón",
    image: "/images/calistesnia/toque-al-talon.jpg",
    series: 3,
    repetitions: 10,
    calories: 50,
    restTime: "30 seg",
  },
];

const Calisthenics = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8 py-8">
        <div className="flex flex-col col-span-9 gap-4 p-8 bg-white/70 rounded-xl">
          <div className="flex gap-4">
            <div
              className="flex justify-between p-4 text-white rounded-lg shadow-lg w-52 drop-shadow bg-amber-600"
              style={{
                background:
                  "linear-gradient(135deg, #FFB700 0%, #F49900 21%, #D34400 82%, #B80000 100%)",
              }}
            >
              <div className="flex flex-col">
                <span>Racha Actual</span>
                <span className="font-bold">7 días</span>
                <span>Sigue así!!</span>
              </div>
              <img
                src="/images/icons/zap.png"
                alt="Zap"
                className="w-[20px] h-[20px]"
              />
            </div>
            <div
              className="flex justify-between p-4 text-white rounded-lg shadow-lg w-52 drop-shadow"
              style={{
                background:
                  "linear-gradient(90deg, #00FF09 0%, #56E876 29%, #4E7CD7 84%, #5D62FF 100%)",
              }}
            >
              <div className="flex flex-col">
                <span>Ejercicios hechos</span>
                <span className="font-bold">3</span>
                <span>Bien hecho!</span>
              </div>
              <img
                src="/images/icons/target.png"
                alt="Zap"
                className="w-[20px] h-[20px]"
              />
            </div>
            <div
              className="flex justify-between p-4 text-white rounded-lg shadow-lg w-52 drop-shadow bg-amber-600"
              style={{
                background:
                  "linear-gradient(90deg, #B028FF 0%, #CB3CF4 26%, #F258E5 91%, #FF62E0 100%)",
              }}
            >
              <div className="flex flex-col">
                <span>Tiempo total</span>
                <span className="font-bold">15 min</span>
                <span>Resistencia crack!</span>
              </div>
              <img
                src="/images/icons/time.png"
                alt="Zap"
                className="w-[20px] h-[20px]"
              />
            </div>
            <div
              className="flex justify-between p-4 text-white rounded-lg shadow-lg w-52 drop-shadow bg-amber-600"
              style={{
                background:
                  "linear-gradient(90deg, #FFFB00 0%, #FFE200 27%, #FFBF01 64%, #FFB701 100%)",
              }}
            >
              <div className="flex flex-col">
                <span>Calorías</span>
                <span className="font-bold">320</span>
                <span>Buen metabolismo!!</span>
              </div>
              <img
                src="/images/icons/stadistic.png"
                alt="Zap"
                className="w-[20px] h-[20px]"
              />
            </div>
          </div>
          <span className="text-xl text-">Ejercicio seleccionado</span>
          <div className="grid h-full grid-cols-2 gap-4 p-4 bg-white shadow-xl auto-rows-auto rounded-xl">
            <div className="">
              <img
                src="/images/calistesnia/calistesnia.png"
                alt="Calistesnia"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-[#FF0000]/50 rounded-full flex items-center justify-center w-fit px-4">
                <span className="text-xs font-extralight">Principiante</span>
              </div>
              <span className="text-xl">Abdominales</span>
              <span className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-4 h-4" /> 4 min
              </span>
              <span className="text-justify">
                Para hacer abdominales correctamente, acuéstate boca arriba con
                las rodillas dobladas y los pies en el suelo. Cruza los brazos
                sobre el pecho o pon las manos detrás de la cabeza sin jalar el
                cuello. Contrae el abdomen y eleva el tronco lentamente hasta
                que los hombros se despeguen del suelo, luego baja con control.
                Exhala al subir e inhala al bajar. Haz el movimiento despacio y
                evita impulsarte o arquear la espalda.
              </span>
              <ul className="flex flex-col ml-4 text-sm">
                <li className="list-disc">3 series</li>
                <li className="list-disc">10 repeticiones</li>
                <li className="list-disc">30 seg de descanso por serie</li>
              </ul>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="w-fit"
                >
                  Realizar
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 p-4 bg-white/70 rounded-xl">
          <span className="font-bold">Ejercicios centrados en el cuerpo</span>

          <div className="flex flex-col h-full gap-4">
            <CardBodyDifficult
              title="Abdomen"
              description="Prepárate para tener un six pack en tu abdomen"
              image="/images/calistesnia/abdomen.svg"
            />
            <CardBodyDifficult
              title="Pecho"
              description="Pectorales firmes y fuertes para lucir piola"
              image="/images/calistesnia/pecho.svg"
            />
            <CardBodyDifficult
              title="Pierna"
              description="Fortalece tus piernas para saltar más alto"
              image="/images/calistesnia/piernas.svg"
            />
          </div>
        </div>

        <div className="col-span-12 p-8 bg-white rounded-xl">
          <Table>
            <TableCaption>
              <span className="text-sm text-gray-500">
                Selecciona el ejercicio que deseas realizar
              </span>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Ejercicios para abdomen</TableHead>
                <TableHead className="text-center">Series</TableHead>
                <TableHead className="text-center">Repeticiones</TableHead>
                <TableHead className="text-center">
                  Tiempo de descanso por series
                </TableHead>
                <TableHead>Calorias</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise.exercise}>
                  <TableCell>{exercise.exercise}</TableCell>
                  <TableCell className="text-center">
                    {exercise.series}
                  </TableCell>
                  <TableCell className="text-center">
                    {exercise.repetitions}
                  </TableCell>
                  <TableCell className="text-center">
                    {exercise.restTime}
                  </TableCell>
                  <TableCell>{exercise.calories}</TableCell>
                  <TableCell>
                    <Button className="text-white bg-green-500 cursor-pointer hover:bg-green-800">
                      Seleccionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Calisthenics;
