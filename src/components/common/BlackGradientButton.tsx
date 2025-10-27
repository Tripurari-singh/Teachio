//  interface BlackButtonInterface {
//     Label : string
// }
// export function BlackGradientButton({Label} : BlackButtonInterface){
//     return(
//         <div>
//            <button className=" px-8 py-3 border-2 border-white/30 rounded-2xl shadow-2xl shadow-slate-500 transition-transform duration-150 hover:-translate-y-0.5 bg-gradient-to-r from-black via-neutral-600 to-black">{Label}</button>
//         </div>
//     )
// }


"use client";
import { motion } from "framer-motion";

interface BlackButtonInterface {
  Label: string;
}

export function BlackGradientButton({ Label }: BlackButtonInterface) {
  return (
    <motion.div
    className="rounded-2xl"
      whileHover={{
        y: -2,
        boxShadow: "0px 8px 20px rgba(255,255,255,0.15)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <button className="px-8 py-3 border-2 border-white/30 rounded-2xl shadow-2xl shadow-slate-500 transition-transform duration-150 hover:-translate-y-0.5 bg-gradient-to-r from-black via-neutral-600 to-black">
        {Label}
      </button>
    </motion.div>
  );
}
