import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import ShoppingListAddItem from "./ShoppingListAddItem";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AddItemDialog({ open, onOpenChange }: AddItemDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar nuevo ingrediente</DialogTitle>
        </DialogHeader>

        <ShoppingListAddItem closeModal={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default AddItemDialog;
