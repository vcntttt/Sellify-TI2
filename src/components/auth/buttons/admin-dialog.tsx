import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminSelect: () => void;
  onCashierSelect: () => void;
}

export default function AdminDialog({ isOpen, onClose, onAdminSelect, onCashierSelect }: AdminDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecciona un tipo de acceso</DialogTitle>
            <DialogDescription className="sr-only">
              Por favor selecciona si deseas continuar como Admin o Cajero.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button onClick={onAdminSelect}>Administrador</Button>
            <Button onClick={onCashierSelect} variant="outline">Cajero</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Selecciona un tipo de acceso</DrawerTitle>
          <DrawerDescription className="sr-only">
            Por favor selecciona si deseas continuar como Admin o Cajero.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button onClick={onAdminSelect}>Administrador</Button>
          <Button onClick={onCashierSelect} variant="outline">Cajero</Button>
        </div>
        <DrawerClose asChild>
          <Button variant="outline" className="mt-4">Cerrar</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}