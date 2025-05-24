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
          <DialogTitle>
            <span className="text-2xl font-bold">Agregar Objetivo</span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-sm text-gray-500">
              Selecciona un objetivo para tu entrenamiento.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="card">
            <img src="/images/" alt="target" />
            <span>Quemar Grasa</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;
