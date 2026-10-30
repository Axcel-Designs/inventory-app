import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiLoader,
} from "react-icons/fi";
import { useNavigate } from "react-router";

export default function LoginForm({ onSubmit, onForgotPassword }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!onSubmit) {
      setError("Login functionality is not configured.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        email,
        password,
        rememberMe,
      });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf5ee] px-4 py-10 font-['Manrope']">
      <div className="w-full max-w-md rounded-xl border border-[#d8d0c8]/60 bg-[#f6f0e8] p-6 shadow-[0_2px_16px_rgba(58,48,42,0.04)] sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-['EB_Garamond'] text-4xl font-semibold text-[#3a302a]">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-[#605850]">
            Sign in to access your inventory dashboard.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#3a302a]"
            >
              Email Address
            </label>

            <div className="flex h-12 items-center gap-3 rounded-lg border border-[#d8d0c8] bg-white px-3 transition-all focus-within:border-[#c2652a] focus-within:ring-2 focus-within:ring-[#c2652a]/10">
              <FiMail size={18} className="shrink-0 text-[#9a9088]" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="h-full w-full bg-transparent text-sm text-[#3a302a] outline-none placeholder:text-[#b5aaa0"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#3a302a]"
              >
                Password
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs font-medium text-[#c2652a] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="flex h-12 items-center gap-3 rounded-lg border border-[#d8d0c8] bg-white px-3 transition-all focus-within:border-[#c2652a] focus-within:ring-2 focus-within:ring-[#c2652a]/10">
              <FiLock size={18} className="shrink-0 text-[#9a9088]" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="h-full w-full bg-transparent text-sm text-[#3a302a] outline-none placeholder:text-[#b5aaa0]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 text-[#9a9088] hover:text-[#c2652a]"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#605850]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 accent-[#c2652a]"
              />
              Remember me
            </label>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#c2652a] px-4 font-semibold text-white transition-all hover:bg-[#a95120] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" size={18} />
                Signing in...
              </>
            ) : (
              <>
                <FiLogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full border-t border-[#d8d0c8]" />

          <span className="absolute px-3 bg-[#faf5ee] text-xs font-semibold uppercase tracking-wider text-[#605850]">
            Or continue with
          </span>
        </div>

        {/* Social Login */}
        <div className="grid grid-col gap-2.5">
          <button
            type="button"
            onClick={() => console.log("Google login")}
            className="h-10 px-3 rounded-lg bg-[#f0e9e0] hover:bg-[#e8ded2] text-[#3a302a] text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <FaGoogle className="w-4 h-4 shrink-0" />
            <span className="truncate">Google</span>
          </button>
        </div>
      </div>
    </main>
  );
}
