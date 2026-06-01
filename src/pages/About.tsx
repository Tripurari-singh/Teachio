import { motion } from "framer-motion";
import { HeaderComponent } from "@/components/common/Header";
import AnimatedWaveFooter from "@/components/common/Footer";
import { HighlightedText } from "@/components/HighlightedTextComponent";
import { FeatureComponent } from "@/components/FeaturesComponent";
import { BsPersonAdd } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdOutlineSchedule } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";

const team = [
  { name: "Aarav Sharma",  role: "Founder & CEO",     emoji: "👨‍💻" },
  { name: "Priya Singh",   role: "Head of Curriculum", emoji: "👩‍🏫" },
  { name: "Rohan Gupta",   role: "Lead Engineer",      emoji: "🧑‍💻" },
  { name: "Neha Joshi",    role: "Community Manager",  emoji: "👩‍🎤" },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <HeaderComponent />

      {/* Hero */}
      <div className="text-center py-24 px-8 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <HighlightedText HeadingLabel_1="About" HeadingLabel_2="Teachio" />
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make world-class tech education accessible to everyone, everywhere.
            Built by developers, for developers.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b border-white/5">
        {[["10K+","Students"],["200+","Courses"],["50+","Instructors"],["4.9★","Rating"]].map(([v,l]) => (
          <motion.div key={l} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-b from-neutral-900 to-black border border-white/8 p-8">
            <p className="text-4xl font-bold text-sky-400">{v}</p>
            <p className="text-slate-400 mt-2">{l}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto px-8 py-16 text-center border-b border-white/5">
        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Teachio was born from the belief that great education shouldn't be gatekept by geography or finances.
          We partner with top engineers and educators to create structured, practical courses that get you
          from zero to job-ready as fast as possible.
        </p>
      </div>

      {/* What we offer */}
      <div className="max-w-5xl mx-auto px-8 py-16 border-b border-white/5">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">What We Offer</h2>
        <div className="flex flex-col gap-5 items-center">
          {[
            { h1: "Expert Teachers",    h2: "Learn from the best minds in the industry.", Icon: <BsPersonAdd /> },
            { h1: "Certified Learning", h2: "Get recognized certifications for your career.", Icon: <AiFillSafetyCertificate /> },
            { h1: "Flexible Schedule",  h2: "Learn at your own pace, anytime, anywhere.", Icon: <MdOutlineSchedule /> },
            { h1: "Practical Projects", h2: "Apply knowledge with hands-on projects.", Icon: <FaCode /> },
            { h1: "Community Support",  h2: "Join a thriving community of learners.", Icon: <RiUserCommunityFill /> },
          ].map(f => <FeatureComponent key={f.h1} Heading_1={f.h1} Heading_2={f.h2} Icon={f.Icon} />)}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map(m => (
            <motion.div key={m.name} whileHover={{ y: -4 }}
              className="rounded-3xl bg-gradient-to-b from-neutral-900 to-black border border-white/8 p-8 text-center hover:border-sky-500/30 transition-all">
              <div className="text-5xl mb-4">{m.emoji}</div>
              <p className="text-white font-semibold">{m.name}</p>
              <p className="text-slate-500 text-sm mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatedWaveFooter />
    </div>
  );
}
