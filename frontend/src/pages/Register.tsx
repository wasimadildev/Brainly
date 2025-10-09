import { useState } from "react";
import api from "../api/api";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/signup", form);
      alert(res.data.message || "Registered successfully!");
    } catch (err :any) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-start px-16 bg-gradient-to-br from-blue-600/30 to-slate-900/30 backdrop-blur-lg">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Welcome to <span className="text-blue-400">Brainly</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-md">
          Join Brainly today — where you can learn smarter, take better notes, 
          and collaborate with an AI-powered assistant designed for your growth.
        </p>
       
      </div>

      {/* Right Section - Register Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 md:px-10">
        <div className="w-full max-w-md bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-700 p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-white mb-2">
              Create Account
            </h2>
            <p className="text-slate-400 text-sm">
              Fill in your details to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="text-sm text-slate-300 mb-2 block">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

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
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-slate-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
