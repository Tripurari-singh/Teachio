

"use client";
import { motion } from "framer-motion";

export function LogoComponent() {
  return (
    <motion.div
    className="rounded-2xl"
      whileHover={{ y: -2  , boxShadow: "0px 8px 20px rgba(255,255,255,0.15)" }}         // rotate a bit on hover
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <div className="">
        <div className="flex items-center gap-1 select-none border-white/30 bg-gradient-to-r from-black via-neutral-600 to-black shadow-2xl shadow-slate-400 rounded-2xl tracking-normal px-4 py-1">
          {/* Capital Letter Icon */}
          <div className="text-4xl font-bold bg-gradient-to-b from-white to-black text-transparent bg-clip-text ">
            T
          </div>

          {/* Brand Name */}
          <div className="text-2xl font-bold bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
            eachio
          </div>
        </div>
      </div>
    </motion.div>
  );
}
