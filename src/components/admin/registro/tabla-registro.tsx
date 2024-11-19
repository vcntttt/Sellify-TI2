import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AdminSection from "../section-template";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  description?: string;
  timestamp: string;
  user: string;
};

export default function TablaRegistro() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedNotifications = localStorage.getItem("notifications");
      if (storedNotifications) {
        const parsedNotifications: Notification[] = JSON.parse(storedNotifications).map(
          (notification: Notification) => ({
            ...notification,
            user: notification.user || user?.name || "Desconocido",
          })
        );
        setNotifications(parsedNotifications);
      }
    };
    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user]);

  return (
        <AdminSection title="Registros">
        <DataTable columns={columns} data={notifications} isLoading={false} />
      </AdminSection>
  );
}
