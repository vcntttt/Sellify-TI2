import { Toaster, toast } from "sonner";
import { CheckCircle, XCircle, Info } from "lucide-react";

export const NotificationProvider = () => {
  return <Toaster position="top-right" />;
};

export const showNotification = (
  message: string,
  type: "success" | "error" | "info" = "info",
  description?: string,
  richColor?: string
) => {
  const backgroundColor = type === "error" 
    ? "#FFBABA" 
    : richColor || (type === "success" ? "#DFF2BF" : "#BDE5F8");

  const textColor = type === "error" 
    ? "#F44336" 
    : type === "success" ? "#4CAF50" : "#2196F3";

  const Icon = type === "success" 
    ? CheckCircle 
    : type === "error" 
    ? XCircle 
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
        <Icon size={20} color={textColor} /> {/* Lucide icon based on type */}
        <div>
          <strong>{message}</strong>
          {description && <p style={{ margin: 0, fontSize: "7px", color: textColor }}>{description}</p>}
        </div>
      </div>
    ),
    { duration: 2000 } 
  );
};