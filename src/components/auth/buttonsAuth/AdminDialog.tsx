import { Dialog,DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminSelect: () => void;
  onCashierSelect: () => void;
}

export default function AdminDialog({ isOpen, onClose, onAdminSelect, onCashierSelect }: AdminDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecciona un tipo de acceso</DialogTitle>
          <DialogDescription>
            Por favor selecciona si deseas continuar como Admin o Cajero.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onAdminSelect}>Admin</Button>
          <Button onClick={onCashierSelect} variant="outline">Cajero</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
