import { Link } from "wouter";
import { Button } from "@/components/ui/button";


export default function NonAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">403</h1>
      <p className="text-lg text-gray-600">
        No tienes permiso para acceder a esta página.
      </p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}