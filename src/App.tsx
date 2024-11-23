import { Route } from "wouter";
import AdminLayout from "@/components/layouts/admin-layout";
import AdminRoute from "@/components/routes/admin-route";
import CashierRoute from "@/components/routes/cashier-route";
import AutoservRoute from "@/components/routes/autoserv-route"; 
import Auto from "@/components/Autoserv/autoserv"
import DashboardHome from "@/components/admin/dashboard/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import LogInPage from "@/components/auth/login-page";
import CashierPage from "@/components/cajero/cashier-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { sections } from "./data/sections";
import NotFound from "@/components/routes/not-found";
import NonAuthorized from "@/components/routes/non-authorized";
import { NotificationProvider } from "@/components/NotificationProvider";
import BarcodeDisplayPage from "./barcde";

const queryClient = new QueryClient();

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
  // return <BarcodeDisplayPage />;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <NotificationProvider /> 
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
        <AutoservRoute path="/autoserv" component={Auto} />
        <CashierRoute path="/cashier" component={CashierPage} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}