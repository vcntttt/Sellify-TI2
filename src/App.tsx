import { Route, Link } from "wouter";
import AdminLayout from "@/components/layouts/admin-layout";
import AdminRoute from "@/components/routes/admin-route";
import CashierRoute from "@/components/routes/cashier-route";
import { Button } from "@/components/ui/button";
import DashboardHome from "@/components/admin/dashboard";
import { sections } from "@/data/sections";
import { ThemeProvider } from "@/components/theme-provider";
import LogInPage from "@/components/auth/login-page";
import CashierPage from "@/components/cashier/cashier-page";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600">Página no encontrada</p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}

function DashboardLayout() {
  return (
    <AdminLayout>
      <Route path="/dashboard" component={DashboardHome} />
      {sections.slice(1).map((section: any) => (
        <Route key={section.href} path={section.href} component={section.component} />
      ))}
    </AdminLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Route path="/" component={LogInPage} />
      <Route path="/NotFound" component={NotFound} />
      <AdminRoute path="/dashboard" component={DashboardLayout} />
      {sections.slice(1).map((section: any) => (
        <AdminRoute key={section.href} path={section.href} component={DashboardLayout} />
      ))}
      <CashierRoute path="/cashier" component={CashierPage} />
    </ThemeProvider>
  );
}