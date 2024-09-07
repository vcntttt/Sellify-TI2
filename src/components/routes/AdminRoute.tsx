import { Route, useLocation } from 'wouter'; 
import useAuthStore from '@/store/useAuthStore'; 

interface AdminRouteProps {
  path: string; 
}

export default function AdminRoute({ path }: AdminRouteProps) {
  const { user } = useAuthStore(); 
  const [, setLocation] = useLocation(); 

  // Función de renderizado condicional
  const renderComponent = () => {
    if (user?.role === 'admin') {
      setLocation('/dashboard'); 
      return null; 
    } else {
      setLocation('/non-authorized'); 
    }
  };

  return <Route path={path} component={renderComponent} />; 
}
