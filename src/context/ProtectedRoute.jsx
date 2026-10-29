import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";
import LoadingSec from "../components/LoadingSec";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

   if (loading) {
    return <LoadingSec/>;
  }

  return user ? <Outlet /> : <Navigate to={"/"} replace />;
}
