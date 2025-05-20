interface CardActivityInformationProps {
  icon: React.ElementType;
  iconColor?: string;
  backgroundColor?: string;
  title: string;
  value: string;
  percentage: string;
  percentageIcon: React.ElementType;
  percentageColor: string;
}

const CardActivityInformation = ({
  icon: Icon,
  iconColor,
  backgroundColor,
  title,
  value,
  percentage,
  percentageIcon: PercentageIcon,
  percentageColor,
}: CardActivityInformationProps) => {
  return (
    <div className="flex flex-col justify-between bg-white drop-shadow-lg gap-4 p-4 h-full">
      <div className="flex items-center justify-start gap-8">
        <div className={`${backgroundColor} p-2.5 rounded-full`}>
          <Icon size={24} className={`${iconColor}`} />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm font-semibold">{title}</span>
          <span className="font-bold text-3xl">{value}</span>
        </div>
      </div>
      <span className={`${percentageColor} flex items-center gap-1 text-sm`}>
        <PercentageIcon /> {percentage}
      </span>
    </div>
  );
};

export default CardActivityInformation;
