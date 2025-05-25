interface CardBodyDifficultProps {
  title: string;
  image: string;
  description: string;
}

const CardBodyDifficult = ({
  title,
  description,
  image,
}: CardBodyDifficultProps) => {
  return (
    <div className="flex h-[12rem] gap-4 p-2 overflow-y-auto bg-white rounded-lg">
      <div className="">
        <img
          src={image}
          alt="Abdomen"
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold">{title}</span>
        <span className="text-sm font-light">{description}</span>
        <div className="flex flex-wrap gap-1">
          <div
            className="rounded-lg bg-gradient-to-r from-[#3FB225] to-[#4BFF3B] w-fit text-white flex px-1 gap-1 cursor-pointer"
            style={{
              boxShadow: "inset 0 2px 2px 0 rgba(0,0,0,0.15)",
            }}
          >
            <img
              src="/images/icons/calisthenics/beginner.svg"
              alt="Principiante"
              
            />
            <span className="text-xs font-light">Principiante</span>
          </div>
          <div
            className="rounded-lg bg-gradient-to-r from-[#FBFF00] to-[#A4A71C] w-fit text-white flex px-1 gap-2 cursor-pointer"
            style={{
              boxShadow: "inset 0 2px 2px 0 rgba(0,0,0,0.15)",
            }}
          >
            <img
              src="/images/icons/calisthenics/intermediate.svg"
              alt="Intermedio"
              className="w-4 h-4"
            />
            <span className="text-xs font-light">Intermedio</span>
          </div>
          <div
            className="rounded-lg bg-gradient-to-r from-[#3FB225] to-[#4BFF3B] w-fit text-white flex px-1 gap-2 cursor-pointer"
            style={{
              background:
                "linear-gradient(90deg, #FF5751 0%, #EC4844 48%, #B01919 100%)",
              boxShadow: "inset 0 2px 2px 0 rgba(0,0,0,0.15)",
            }}
          >
            <img
              src="/images/icons/calisthenics/advanced.svg"
              alt="Intermedio"
              className="w-4 h-4"
            />
            <span className="text-xs font-light">Avanzado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBodyDifficult;
