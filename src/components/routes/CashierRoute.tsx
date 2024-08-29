import { Route, Redirect } from 'wouter';
import useStore from '@/store/useAuthStore'

export default function CashierRoute({ component: Component,...rest }: any ) {
  const { user } = useStore()

  return (
    <Route
      {...rest}
      component={(props) =>
        user.role === "cashier" || user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/non-authorized" />
        )
      }
    />
  );
}

