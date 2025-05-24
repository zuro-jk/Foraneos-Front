import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface AddExerciseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddExerciseModal = ({ open, onOpenChange }: AddExerciseModalProps) => {
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

export default AddExerciseModal;
