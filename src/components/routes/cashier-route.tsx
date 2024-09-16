import { Route, Redirect } from "wouter";
import { useAuthStore } from "@/store/use-auth";

export default function CashierRoute({ component: Component, ...rest }: any) {
  const { user } = useAuthStore();

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
