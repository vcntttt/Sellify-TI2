import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>Registros</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Botones de filtro */}
        <div className="flex gap-4 justify-end mb-4">
          <Button variant="outline" className="p-2">
            Filtro
          </Button>
          <Button variant="outline" className="p-2">
            Filtro
          </Button>
          <Button variant="outline" className="p-2">
            Filtro
          </Button>
        </div>
        <DataTable columns={columns} data={notifications} isLoading={false} />
      </CardContent>
    </Card>
  );
}