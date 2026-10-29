import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  return user ? <Outlet /> : <Navigate to={"/"} replace />;
}
