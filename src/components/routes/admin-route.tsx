import { Route, Redirect } from "wouter";
import { useAuthStore } from "@/store/auth";

export default function AdminRoute({ component: Component, ...rest }: any) {
  const { user } = useAuthStore();

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