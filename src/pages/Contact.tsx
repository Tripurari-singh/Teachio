import { useState } from "react";
import { motion } from "framer-motion";
import { HeaderComponent } from "@/components/common/Header";
import AnimatedWaveFooter from "@/components/common/Footer";
import { HighlightedText } from "@/components/HighlightedTextComponent";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]   = useState(false);
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <HeaderComponent />

      <div className="text-center py-20 px-8 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <HighlightedText HeadingLabel_1="Get in" HeadingLabel_2="Touch" />
          <p className="text-slate-400 text-lg mt-4">We'd love to hear from you. Drop us a message.</p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Contact Info</h2>
          {[
            { icon: "📧", label: "Email",   value: "Teachio@gmail.com" },
            { icon: "📞", label: "Phone",   value: "+91 98765 43210" },
            { icon: "📍", label: "Address", value: "123 Innovation Street, Tech City, TC 12345" },
            { icon: "🕐", label: "Hours",   value: "Mon–Fri, 9 AM – 6 PM IST" },
          ].map(i => (
            <div key={i.label} className="flex items-start gap-4 mb-6 p-5 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-sky-500/20 transition-colors">
              <span className="text-2xl">{i.icon}</span>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">{i.label}</p>
                <p className="text-white mt-1">{i.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
          <div className="bg-gradient-to-b from-neutral-900 to-black border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>

            {sent && (
              <div className="mb-5 px-4 py-3 rounded-2xl bg-green-900/30 border border-green-700/50 text-green-400 text-sm text-center">
                ✓ Message sent! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { k: "name",    label: "Name",    type: "text",  ph: "Your full name" },
                { k: "email",   label: "Email",   type: "email", ph: "you@example.com" },
                { k: "subject", label: "Subject", type: "text",  ph: "How can we help?" },
              ].map(f => (
                <div key={f.k}>
                  <label className="text-slate-400 text-xs mb-1 block">{f.label}</label>
                  <input type={f.type} value={(form as any)[f.k]}
                    onChange={e => update(f.k, e.target.value)} required placeholder={f.ph}
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-800/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors text-sm" />
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Message</label>
                <textarea value={form.message} onChange={e => update("message", e.target.value)} required
                  rows={5} placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-800/80 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors text-sm resize-none" />
              </div>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold text-sm hover:from-sky-500 hover:to-sky-400 transition-all shadow-lg shadow-sky-900/40">
                Send Message →
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      <AnimatedWaveFooter />
    </div>
  );
}
