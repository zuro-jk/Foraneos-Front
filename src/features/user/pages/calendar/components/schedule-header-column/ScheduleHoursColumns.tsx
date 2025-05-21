type ScheduleHoursColumnProps = {
  timeSlots: {
    hour: number;
    minute: number;
  }[];
};

function formatSpanishHour(hour: number, minute: number) {
  const isAM = hour < 12;
  let displayHour = hour % 12;
  if (displayHour === 0) displayHour = 12;
  const period = isAM ? "a.m." : "p.m.";
  return `${displayHour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${period}`;
}


const ScheduleHoursColumn = ({ timeSlots }: ScheduleHoursColumnProps) => (
  <div className="flex flex-col">
    {timeSlots.map((slot, idx) => (
      <div
        key={idx}
        className="h-12 flex items-center justify-end pr-2 border-b border-gray-200 border-r"
      >
        {slot.minute === 0 || slot.minute === 30 ? (
          <span className="flex items-center text-xs font-semibold">
            {formatSpanishHour(slot.hour, slot.minute)}
          </span>
        ) : null}
      </div>
    ))}
  </div>
);

export default ScheduleHoursColumn;