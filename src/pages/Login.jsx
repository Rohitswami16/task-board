import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const isAuth =
      localStorage.getItem("auth") === "true" ||
      sessionStorage.getItem("auth") === "true";

    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }

    if (isAuth) {
      navigate("/board");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "intern@demo.com" && password === "intern123") {
      if (remember) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("rememberedEmail", email);
      } else {
        sessionStorage.setItem("auth", "true");
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/board");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-10 space-y-6 transition-all duration-500"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black drop-shadow-sm">
            Welcome Back
          </h2>
          <p className="text-gray-800 text-sm mt-1">
            Sign in to continue to your board
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-black/80 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 placeholder-black/50 text-black focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none backdrop-blur-sm transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password with Toggle */}
        <div className="relative">
          <label className="block text-sm font-medium text-black/80 mb-1">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-3 pr-16 rounded-xl border border-white/30 bg-white/20 placeholder-black/50 text-black focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none backdrop-blur-sm transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-10 text-sm text-black/70 hover:text-black font-medium transition"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-sm text-black/80">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="accent-blue-400 w-4 h-4"
            />
            Remember me
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 text-red-700 text-sm px-3 py-2 rounded-lg border border-red-300/30">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-black bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 hover:scale-105 active:scale-95 transition transform duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
