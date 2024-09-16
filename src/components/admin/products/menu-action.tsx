import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddCategory } from "./add-category";
import { useState } from "react";
import { AddProductForm } from "./add-product";

export default function ProductActions() {
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  return (
    <div className="flex gap-4">
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            Agregar Producto
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Producto</DialogTitle>
            <DialogDescription>
              Agrega un nuevo producto
            </DialogDescription>
          </DialogHeader>
           <AddProductForm onClose={() => setIsProductDialogOpen(false)}/>
        </DialogContent>
      </Dialog>
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            Agregar Categoria
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Categoria</DialogTitle>
            <DialogDescription>
              Agregar una nueva categoria
            </DialogDescription>
          </DialogHeader>
           <AddCategory onClose={() => setIsCategoryDialogOpen(false)}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
