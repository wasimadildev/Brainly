import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/signin", form);
      alert(res.data.message || "Login successful!");
      navigate("/profile");
    } catch (err : any) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-start px-16 bg-gradient-to-br from-blue-600/30 to-slate-900/30 backdrop-blur-lg">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Welcome Back to <span className="text-blue-400">Brainly</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-md">
          Sign in to your Brainly account and continue learning, sharing ideas, 
          and exploring with your AI-powered assistant.
        </p>
        
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 md:px-10">
        <div className="w-full max-w-md bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-700 p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-white mb-2">Login</h2>
            <p className="text-slate-400 text-sm">Access your Brainly account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="text-sm text-slate-300 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm text-slate-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-slate-400 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
