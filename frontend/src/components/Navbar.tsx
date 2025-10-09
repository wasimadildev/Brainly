import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              <Shield className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight">
              Auth System
            </span>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <a
              href="/register"
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              Register
            </a>
            <a
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              Login
            </a>
            <a
              href="/profile"
              className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all ml-2"
            >
              Profile
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}