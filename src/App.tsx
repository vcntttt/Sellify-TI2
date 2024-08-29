import { Route } from 'wouter';
import { ThemeProvider } from './components/theme-provider';
import HomeRoute from './components/routes/HomeRoute';
import AdminLogin from './components/login/AdminLogin';
import CajeroLogin from './components/login/CajeroLogin';
import AdminLayout from './components/layouts/AdminLayout';
import DashboardHome from '@/components/admin/Dashboard';
import { sections } from '@/data/sections';
import { Button } from './components/ui/button';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Route path="/" component={HomeRoute} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/cajero-login" component={CajeroLogin} />
      <Route path="/dashboard">
        <AdminLayout>
          <Route path="/dashboard" component={DashboardHome} />
          {sections.slice(1).map((section : any) => (
            <Route key={section.href} path={section.href} component={section.component} />
          ))}
        </AdminLayout>
      </Route>
    </ThemeProvider>
  );
}
