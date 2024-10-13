import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string; 
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-6 py-0.5 text-sm font-low ${className}`}
    >
      {children}
    </span>
  );
}