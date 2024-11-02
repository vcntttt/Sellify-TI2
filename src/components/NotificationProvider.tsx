import { Toaster, toast } from "sonner";

export const NotificationProvider = () => {
  return <Toaster position="top-right" />;
};

export const showNotification = (message: string) => {
  toast(message);
};