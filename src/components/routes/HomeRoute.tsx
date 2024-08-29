import { Link } from 'wouter';

const HomeRoute = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-6 text-center text-gray-900">
          Selecciona un modo de Login
        </h1>
        <div className="flex flex-col gap-4">
          <Link href="/admin-login">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150">
              Login Administrador
            </button>
          </Link>
          <Link href="/cajero-login">
            <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150">
              Login Cajero
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeRoute;
