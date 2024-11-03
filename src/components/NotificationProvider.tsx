import { Toaster, toast } from "sonner";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"; // Importar el ícono de advertencia

export const NotificationProvider = () => {
  return <Toaster position="top-right" />;
};

export const showNotification = (
  message: string,
  type: "success" | "error" | "info" | "warning" = "info", 
  description?: string,
  richColor?: string
) => {
  const backgroundColor = 
    type === "error" 
      ? "#FFBABA" 
      : type === "warning" 
      ? "#FFF3CD"
      : richColor || (type === "success" ? "#DFF2BF" : "#BDE5F8");

  const textColor = 
    type === "error" 
      ? "#F44336" 
      : type === "warning" 
      ? "#856404" 
      : type === "success" 
      ? "#4CAF50" 
      : "#2196F3";

  const Icon = 
    type === "success" 
      ? CheckCircle 
      : type === "error" 
      ? XCircle 
      : type === "warning" 
      ? AlertTriangle 
      : Info;

  toast.custom(
    (t) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3px",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor,
          color: textColor,
          maxWidth: "300px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <Icon size={20} color={textColor} /> 
        <div>
          <strong>{message}</strong>
          {description && <p style={{ margin: 0, fontSize: "12px", color: textColor }}>{description}</p>}
        </div>
      </div>
    ),
    { duration: 2000 }
  );
};
