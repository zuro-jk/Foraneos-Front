import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface NotificationCardProps {
  isLast?: boolean;
}

const NotificationCard = ({isLast = false} : NotificationCardProps) => {
  return (
    <div className={cn(`flex items-center gap-2 p-2 border-b border-b-gray-200`,
      isLast ? "border-b-0" : "border-b-gray-200"
    )}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm">
          <span className="font-semibold">Anna Srzand</span> joined to 👀{" "}
          <span className="font-semibold">Final Presentation</span>
        </span>
        <span className="text-xs">2h ago - Hobby plan</span>
      </div>
    </div>
  );
};

export default NotificationCard;
