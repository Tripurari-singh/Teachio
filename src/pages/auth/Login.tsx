import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogoComponent } from "@/components/Logo";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.success) { login(res.token, res.user); navigate("/dashboard"); }
      else setError(res.message || "Login failed");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gradient-to-b from-neutral-900 to-black border border-white/10 rounded-3xl p-10 shadow-2xl shadow-black">

        <div className="flex justify-center mb-8"><LogoComponent /></div>
        <h1 className="text-3xl font-bold text-white text-center mb-2">Welcome back</h1>
        <p className="text-slate-400 text-center text-sm mb-8">Sign in to continue learning</p>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-2xl bg-red-900/30 border border-red-700/50 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-slate-400 text-sm mb-2 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-2xl bg-neutral-800/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors text-sm" />
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-neutral-800/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors text-sm" />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sky-500 text-xs hover:text-sky-400 transition-colors">
              Forgot password?
            </Link>
          </div>

          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold text-sm hover:from-sky-500 hover:to-sky-400 transition-all shadow-lg shadow-sky-900/40 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <p className="text-slate-500 text-sm text-center mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
