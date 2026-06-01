import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeaderComponent } from "@/components/common/Header";
import AnimatedWaveFooter from "@/components/common/Footer";
import { getEnrolledCourses } from "@/services/courseService";
import { useAuth } from "@/context/AuthContext";

export function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEnrolledCourses()
      .then(res => setCourses(res.data || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const isInstructor = user?.accountType === "Instructor";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <HeaderComponent />

      <div className="max-w-6xl mx-auto px-8 py-14">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-12">
          <div className="flex items-center gap-5 mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-sky-900/40">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, <span className="text-sky-400">{user?.firstName}</span> 👋
              </h1>
              <p className="text-slate-400 mt-1">{user?.email}</p>
            </div>
          </div>
          <div className="mt-4 inline-flex px-4 py-1.5 rounded-full border border-white/10 bg-neutral-900/60 text-xs text-slate-400 font-medium">
            {isInstructor ? "🎓 Instructor" : "📚 Student"} Account
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: isInstructor ? "Courses Created" : "Enrolled Courses", value: courses.length },
            { label: "Completed",   value: 0 },
            { label: "Certificates", value: 0 },
            { label: "Hours Learned", value: "—" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-gradient-to-b from-neutral-900 to-black border border-white/8 p-5">
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-slate-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Courses section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {isInstructor ? "Your Courses" : "My Learning"}
          </h2>
          <Link to="/courses"
            className="text-sky-400 text-sm hover:text-sky-300 transition-colors">
            {isInstructor ? "Create course →" : "Browse more →"}
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-56 rounded-3xl bg-neutral-900/50 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-24 rounded-3xl border border-white/5 bg-neutral-900/30">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-slate-400 text-lg mb-6">
              {isInstructor ? "You haven't created any courses yet." : "You haven't enrolled in any courses yet."}
            </p>
            <Link to="/courses">
              <motion.button whileHover={{ y: -2 }}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold text-sm">
                {isInstructor ? "Create Your First Course" : "Explore Courses"}
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link to={`/courses/${course._id}`}>
                  <div className="group rounded-3xl bg-gradient-to-b from-neutral-900 to-black border border-white/8 hover:border-sky-500/40 transition-all overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden">
                      {course.thumbnail
                        ? <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.courseName} />
                        : <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">📘</div>
                      }
                    </div>
                    <div className="p-5">
                      <h3 className="text-white font-medium line-clamp-2 group-hover:text-sky-300 transition-colors text-sm">{course.courseName}</h3>
                      <div className="mt-3 h-1 rounded-full bg-neutral-800">
                        <div className="h-1 rounded-full bg-sky-500 w-0" />
                      </div>
                      <p className="text-slate-600 text-xs mt-1">0% complete</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatedWaveFooter />
    </div>
  );
}
