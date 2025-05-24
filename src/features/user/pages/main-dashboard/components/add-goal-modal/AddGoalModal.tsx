import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface AddGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddGoalModal = ({ open, onOpenChange }: AddGoalModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hola</DialogTitle>
          <DialogDescription>Hola que deseas hacer hoy ?</DialogDescription>
        </DialogHeader>
        <div>
          <span>Hola</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;
