import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";


interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, title, children, className }) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onClose}>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30" />
      <DialogPrimitive.Content className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg ${className}`}>
        <DialogPrimitive.Title className="text-2xl font-bold mb-4">{title}</DialogPrimitive.Title>
        <DialogPrimitive.Close className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </DialogPrimitive.Close>
        <div>{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
