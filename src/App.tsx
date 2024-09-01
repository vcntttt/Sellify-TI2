import { Route, Link } from "wouter";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminRoute from "./components/routes/AdminRoute";
import CashierRoute from "./components/routes/CashierRoute";
import { Button } from "./components/ui/button";
import DashboardHome from "@/components/admin/Dashboard";
import { sections } from "@/data/sections";
import { ThemeProvider } from "./components/theme-provider";
import LogInPage from "./components/LogInPage"
import PopUp from "./components/cashier/PopUp";

function Cajero() {
  return (<div className="p-4">

    <PopUp>
      <h2 className="text-xl font-semibold mb-4">Detalles de la Boleta</h2>
      <p>Aquí puedes mostrar la información de la boleta, como el número, fecha, items, etc.</p>
    </PopUp>
    <PopUp>
        <p className="text-justify font-normal text-slate-50">Ingrese el RUT</p>
        <input type="text"></input>
        <p className="text-justify font-normal text-slate-50">Ingrese el nombre del cliente</p>
        <input type="text" />
        <p className="text-justify font-normal text-slate-50">Ingrese el apellido del cliente</p>
        <input type="text" />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 relative left-20">
        Confirmar Registro</button>
    </PopUp>
    <PopUp>
      <div className="relative">
        <input placeholder="Nombre Cliente"></input><input placeholder="fecha"></input>
        <input placeholder="Dirección Cliente"></input>
        <input></input>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 relative left-72">
      Confirmar factura</button>
    </PopUp>
  </div>)
}


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
      {sections.slice(1).map((section : any) => (
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
      {sections.slice(1).map((section : any) => (
        <AdminRoute key={section.href} path={section.href} component={DashboardLayout} />
      ))}
      <CashierRoute path="/cashier" component={Cajero} />
      </ThemeProvider>
  );
}
