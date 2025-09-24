import React, { useState } from "react";
import { baseUrl } from "../../variable";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(baseUrl + "/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (!result.success) {
        setError(result?.message);
        return;
      }
      localStorage.setItem("token", result?.token);
      toast.success("Logged In!");
      window.location.reload();
    } catch (err) {
      console.log(err);

      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Sign in to your account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your credentials to continue
        </p>

        {error && (
          <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block mt-4 relative">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-9 text-sm text-gray-600 hover:text-gray-800"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-2 rounded-lg bg-indigo-600 cursor-pointer text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
