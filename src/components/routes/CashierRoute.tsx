import { Route, Redirect } from 'wouter';
import useStore from '@/store/useStore'

export default function CashierRoute({ component: Component,...rest }: any ) {
  const { role } = useStore()

  return (
    <Route
      {...rest}
      component={(props) =>
        role === "cashier" || role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/non-authorized" />
        )
      }
    />
  );
}

