import { Route, Link } from "wouter";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminRoute from "./components/routes/AdminRoute1";
import CashierRoute from "./components/routes/CashierRoute";
import { Button } from "./components/ui/button";
import DashboardHome from "@/components/admin/Dashboard";
import { sections } from "@/data/sections";
import { ThemeProvider } from "./components/theme-provider";
import LogInPage from "@/components/Auth/login-page";
import CashierPage from "@/components/cashier/cashier-page"

function NonAuthorized() {
  return (
    <>
      <h2>Non Authorized</h2>
      <Button asChild>
        <Link href="/">Volver</Link>
      </Button>
    </>
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
      <Route path="/non-authorized" component={NonAuthorized} />
      <AdminRoute path="/dashboard" component={DashboardLayout} />
      {sections.slice(1).map((section: any) => (
        <AdminRoute key={section.href} path={section.href} component={DashboardLayout} />
      ))}
      <CashierRoute path="/cashier" component={CashierPage} />
    </ThemeProvider>
  );
}





