import { Link } from 'wouter';
import { Button } from '../ui/button';
import useStore from '@/store/useAuthStore'

const CajeroLayout = () => {
  const { user } = useStore();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 fixed top-0 left-0 w-full flex justify-between items-center z-10">
        <h2 className="text-2xl font-semibold text-gray-800">Panel de Cajero</h2>
        <div className="text-gray-600 flex flex-col items-end">
          <p className="text-sm">Cajero: <span className="font-medium">{user.name}</span></p>
          <p className="text-xl font-semibold mt-1">Total: <span className="font-bold text-blue-600">$200</span></p>
        </div>
      </header>

      <div className="flex flex-1 pt-20">
        {/* Sidebar Section */}
        <aside className="bg-white shadow-md rounded-lg p-4 w-64 h-full fixed top-20 left-0 border-r border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Opciones</h3>
          <div className="flex flex-col gap-4">
            <Button 
              size="lg"
              className="bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 rounded-lg shadow-md transition duration-200"
            >
              Ver Productos
            </Button>
            <Button 
              size="lg"
              className="bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 rounded-lg shadow-md transition duration-200"
            >
              Ingresar Cliente
            </Button>
            <Button 
              asChild
              variant="secondary" 
              size="lg" 
              className="bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900 rounded-lg shadow-md transition duration-200 w-full"
            >
              <Link href="/">Salir del Panel</Link>
            </Button>
          </div>
        </aside>

        {/* Main Content Section */}
        <main className="flex-1 ml-64 p-6 flex flex-col">
          <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6 flex-grow min-h-[400px]">
            <h3 className="text-lg font-semibold mb-4">Productos en la Compra</h3>
            <div className="text-gray-700 text-lg">Aquí se mostrarán los productos que se vayan ingresando.</div>
          </section>

          <section className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col" style={{ minHeight: '120px' }}>
            <h3 className="text-lg font-semibold mb-4">Código de Producto y Cantidad</h3>
            <div className="text-gray-700 flex-grow">
              <p className="mb-2">Código del Producto: <span className="font-semibold">123456</span></p>
              <p>Cantidad: <span className="font-semibold">10</span></p>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button 
                size="lg"
                className="bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 rounded-lg shadow-md transition duration-200"
              >
                Confirmar
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900 rounded-lg shadow-md transition duration-200"
              >
                Rechazar
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CajeroLayout;
