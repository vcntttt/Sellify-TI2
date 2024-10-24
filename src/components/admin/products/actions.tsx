import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddCategory } from "@/components/admin/products/add-category";
import { useState } from "react";
import { AddProductForm } from "@/components/admin/products/add-product";
import { ResponsiveModal } from "@/components/responsive-modal";

export default function ProductActions() {
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <ResponsiveModal
        trigger={<Button variant={"outline"}>Agregar Producto</Button>}
        title="Agregar Producto"
        description="Agrega un nuevo producto"
        className="sm:max-w-[625px] sm:min-h-[400px]"
        state={isProductDialogOpen}
        setState={setIsProductDialogOpen}
      >
        <AddProductForm onClose={() => setIsProductDialogOpen(false)} />
      </ResponsiveModal>

      <Dialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
      >
        <DialogTrigger asChild>
          <Button variant={"outline"}>Agregar Categoria</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Categoria</DialogTitle>
            <DialogDescription>Agregar una nueva categoria</DialogDescription>
          </DialogHeader>
          <AddCategory onClose={() => setIsCategoryDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
