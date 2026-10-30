import LoginForm from "../components/LoginForm";

export default function Login() {
  const handleLogin = async (credentials) => {
    console.log("Login details:", credentials);
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
