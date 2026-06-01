import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogoComponent } from "@/components/Logo";
import { sendOtp, signupUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

type Step = "details" | "otp";

export function SignupPage() {
  const [step, setStep]               = useState<Step>("details");
  const [accountType, setAccountType] = useState<"Student" | "Instructor">("Student");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
  });
  const [otp, setOtp]       = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError("Passwords don't match"); return; }
    setError(""); setLoading(true);
    try {
      const res = await sendOtp(form.email);
      if (res.success) setStep("otp");
      else setError(res.message || "Failed to send OTP");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await signupUser({ ...form, accountType, otp });
      if (res.success) { login(res.token, res.user); navigate("/dashboard"); }
      else setError(res.message || "Signup failed");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gradient-to-b from-neutral-900 to-black border border-white/10 rounded-3xl p-10 shadow-2xl shadow-black">

        <div className="flex justify-center mb-8"><LogoComponent /></div>
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          {step === "details" ? "Create account" : "Verify email"}
        </h1>
        <p className="text-slate-400 text-center text-sm mb-8">
          {step === "details" ? "Start your learning journey today" : `OTP sent to ${form.email}`}
        </p>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-2xl bg-red-900/30 border border-red-700/50 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {step === "details" ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            {/* Account type toggle */}
            <div className="flex rounded-2xl bg-neutral-800/60 border border-white/10 p-1 mb-2">
              {(["Student", "Instructor"] as const).map(t => (
                <button key={t} type="button" onClick={() => setAccountType(t)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${accountType === t ? "bg-sky-600 text-white shadow" : "text-slate-400 hover:text-white"}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-slate-400 text-xs mb-1 block">First Name</label>
                <input value={form.firstName} onChange={e => update("firstName", e.target.value)} required
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-800/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors text-sm" />
              </div>
              <div className="flex-1">
                <label className="text-slate-400 text-xs mb-1 block">Last Name</label>
                <input value={form.lastName} onChange={e => update("lastName", e.target.value)} required
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-800/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors text-sm" />
              </div>
            </div>

            {[
              { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
              { label: "Password", key: "password", type: "password", placeholder: "Min 8 characters" },
              { label: "Confirm Password", key: "confirmPassword", type: "password", placeholder: "Repeat password" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-slate-400 text-xs mb-1 block">{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]}
                  onChange={e => update(f.key, e.target.value)} required placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-800/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors text-sm" />
              </div>
            ))}

            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
              className="w-full py-3 mt-2 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold text-sm hover:from-sky-500 hover:to-sky-400 transition-all shadow-lg shadow-sky-900/40 disabled:opacity-60">
              {loading ? "Sending OTP..." : "Send OTP →"}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Enter 6-digit OTP</label>
              <input value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6}
                placeholder="••••••"
                className="w-full px-4 py-4 rounded-2xl bg-neutral-800/80 border border-white/10 text-white text-center text-2xl tracking-[0.5em] placeholder-slate-700 focus:outline-none focus:border-sky-500 transition-colors" />
            </div>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold text-sm disabled:opacity-60">
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
            <button type="button" onClick={() => setStep("details")}
              className="text-slate-500 text-xs text-center hover:text-slate-300 transition-colors">
              ← Back to details
            </button>
          </form>
        )}

        <p className="text-slate-500 text-sm text-center mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
