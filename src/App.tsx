import { Route, Link } from "wouter";
import AdminLayout from "@/components/layouts/admin-layout";
import AdminRoute from "@/components/routes/admin-route";
import CashierRoute from "@/components/routes/cashier-route";
import { Button } from "@/components/ui/button";
import DashboardHome from "@/components/admin/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import LogInPage from "@/components/auth/login-page";
import CashierPage from "@/components/cajero/cashier-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { sections } from "./data/sections";

const queryClient = new QueryClient();

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

function NonAuthorized() {
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

function DashboardLayout() {
  return (
    <AdminLayout>
      <Route path="/dashboard" component={DashboardHome} />
      {sections.slice(1).map((section: any) => (
        <Route
          key={section.href}
          path={section.href}
          component={section.component}
        />
      ))}
    </AdminLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Route path="/" component={LogInPage} />
        <Route path="/NotFound" component={NotFound} />
        <Route path="/non-authorized" component={NonAuthorized} />
        <AdminRoute path="/dashboard" component={DashboardLayout} />
        {sections.slice(1).map((section: any) => (
          <AdminRoute
            key={section.href}
            path={section.href}
            component={DashboardLayout}
          />
        ))}
        <CashierRoute path="/cashier" component={CashierPage} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
