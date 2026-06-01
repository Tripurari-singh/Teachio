import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeaderComponent } from "@/components/common/Header";
import AnimatedWaveFooter from "@/components/common/Footer";
import { getCourseDetails } from "@/services/courseService";
import { useAuth } from "@/context/AuthContext";

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!id) return;
    getCourseDetails(id)
      .then(res => setCourse(res.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleSection = (sid: string) =>
    setExpanded(p => p.includes(sid) ? p.filter(x => x !== sid) : [...p, sid]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!course) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <p className="text-2xl">Course not found</p>
      <Link to="/courses" className="text-sky-400 hover:underline">← Back to courses</Link>
    </div>
  );

  const totalLectures = course.courseContent?.reduce((a: number, s: any) => a + (s.subSection?.length || 0), 0) ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <HeaderComponent />

      {/* Hero */}
      <div className="bg-gradient-to-r from-black via-neutral-900 to-black border-b border-white/5 py-16 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {course.category && <span className="text-sky-400 text-sm font-medium uppercase tracking-wider">{course.category.name}</span>}
            <h1 className="text-4xl font-bold text-white mt-3 mb-4 leading-tight">{course.courseName}</h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">{course.courseDescription}</p>
            {course.instructor && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                  {course.instructor.firstName?.[0]}{course.instructor.lastName?.[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{course.instructor.firstName} {course.instructor.lastName}</p>
                  <p className="text-slate-500 text-xs">Instructor</p>
                </div>
              </div>
            )}
          </div>

          {/* Enroll card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-b from-neutral-900 to-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {course.thumbnail
                ? <img src={course.thumbnail} alt={course.courseName} className="w-full h-48 object-cover" />
                : <div className="w-full h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-6xl opacity-30">📘</div>
              }
              <div className="p-6">
                <div className="text-3xl font-bold text-white mb-1">
                  {course.price === 0 ? <span className="text-green-400">Free</span> : `₹${course.price}`}
                </div>
                <div className="flex gap-2 mt-5 flex-col">
                  {token ? (
                    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold hover:from-sky-500 hover:to-sky-400 transition-all shadow-lg shadow-sky-900/40">
                      Enroll Now
                    </motion.button>
                  ) : (
                    <Link to="/login">
                      <motion.button whileHover={{ y: -2 }}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold transition-all">
                        Login to Enroll
                      </motion.button>
                    </Link>
                  )}
                </div>
                <div className="mt-5 flex flex-col gap-2 text-sm text-slate-400">
                  <p>📚 {totalLectures} lectures</p>
                  <p>⏱ {course.courseContent?.length || 0} sections</p>
                  <p>♾ Lifetime access</p>
                  <p>📜 Certificate of completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-3xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">Course Curriculum</h2>
        {course.courseContent?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {course.courseContent.map((section: any) => (
              <div key={section._id} className="rounded-2xl border border-white/8 overflow-hidden bg-neutral-900/40">
                <button onClick={() => toggleSection(section._id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors">
                  <span className="font-medium text-white">{section.sectionName}</span>
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    {section.subSection?.length || 0} lectures
                    <span className="text-lg">{expanded.includes(section._id) ? "▲" : "▼"}</span>
                  </span>
                </button>
                {expanded.includes(section._id) && (
                  <div className="border-t border-white/5">
                    {section.subSection?.map((sub: any) => (
                      <div key={sub._id} className="flex items-center gap-3 px-6 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <span className="text-slate-500">▶</span>
                        <span className="text-slate-300 text-sm">{sub.title}</span>
                        {sub.timeDuration && <span className="ml-auto text-slate-500 text-xs">{sub.timeDuration}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">Curriculum coming soon.</p>
        )}
      </div>

      <AnimatedWaveFooter />
    </div>
  );
}
