import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁 toggle state

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue to your board
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="intern@demo.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password with Toggle */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 pr-16 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="accent-blue-600 w-4 h-4"
            />
            Remember me
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded-lg border border-red-300">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition transform duration-150 shadow-md"
        >
          Login
        </button>

        {/* <p className="text-xs text-center text-gray-400">
          Demo Credentials: intern@demo.com / intern123
        </p> */}
      </form>
    </div>
  );
}
