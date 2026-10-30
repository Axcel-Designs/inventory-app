import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { loginWithEmail } from "../lib/auth";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async ({ email, password }) => {
    return loginWithEmail(email, password);
  };

  return (
    <main>
      <LoginForm
        onSubmit={handleLogin}
        onForgotPassword={() => {
          console.log("Forgot password");
        }}
      />
    </main>
  );
}
