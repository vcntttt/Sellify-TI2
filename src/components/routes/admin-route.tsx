import { Route, Redirect } from 'wouter';
import useStore from '@/store/use-auth'

export default function AdminRoute({ component: Component,...rest }: any ) {
  const { user } = useStore()

  return (
    <Route
      {...rest}
      component={(props) =>
        user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/non-authorized" />
        )
      }
    />
  );
}

