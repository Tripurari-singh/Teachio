import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HeaderComponent } from "@/components/common/Header";
import AnimatedWaveFooter from "@/components/common/Footer";
import { getAllCourses } from "@/services/courseService";

interface Course {
  _id: string; courseName: string; courseDescription: string;
  price: number; thumbnail?: string; instructor?: { firstName: string; lastName: string };
  category?: { name: string }; ratingAndReviews?: any[];
}

const CATEGORIES = ["All", "Web Development", "Python", "AI / ML", "DevOps", "Blockchain"];

export function CoursesPage() {
  const [courses, setCourses]   = useState<Course[]>([]);
  const [filtered, setFiltered] = useState<Course[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [activecat, setActivecat] = useState("All");
  const [searchParams]          = useSearchParams();

  useEffect(() => {
    getAllCourses()
      .then(res => { setCourses(res.data || []); setFiltered(res.data || []); })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActivecat(cat === "webdev" ? "Web Development" : cat === "python" ? "Python" : cat === "aiml" ? "AI / ML" : "All");
  }, [searchParams]);

  useEffect(() => {
    let res = [...courses];
    if (activecat !== "All") res = res.filter(c => c.category?.name === activecat);
    if (search.trim()) res = res.filter(c =>
      c.courseName.toLowerCase().includes(search.toLowerCase()) ||
      c.courseDescription.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(res);
  }, [courses, activecat, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <HeaderComponent />

      {/* Hero bar */}
      <div className="bg-gradient-to-r from-black via-neutral-800 to-black py-16 px-8 text-center border-b border-white/5">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4">
          Explore <span className="text-sky-500">Courses</span>
        </motion.h1>
        <p className="text-slate-400 text-lg mb-8">Learn from industry experts and build real-world skills</p>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full max-w-xl mx-auto block px-6 py-4 rounded-2xl bg-neutral-800/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors text-sm" />
      </div>

      {/* Category tabs */}
      <div className="flex gap-3 overflow-x-auto px-8 py-6 border-b border-white/5 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActivecat(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
              activecat === cat
                ? "bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-900/40"
                : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-neutral-900/50 border border-white/5 h-80 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-xl">No courses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <motion.div key={course._id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <Link to={`/courses/${course._id}`}>
                  <div className="group rounded-3xl bg-gradient-to-b from-neutral-900 to-black border border-white/8 hover:border-sky-500/40 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-sky-900/20 h-full">
                    <div className="h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center overflow-hidden">
                      {course.thumbnail
                        ? <img src={course.thumbnail} alt={course.courseName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="text-6xl opacity-40">📘</div>
                      }
                    </div>
                    <div className="p-6">
                      {course.category && (
                        <span className="text-xs text-sky-400 font-medium uppercase tracking-wider">{course.category.name}</span>
                      )}
                      <h3 className="text-white font-semibold text-lg mt-2 mb-2 line-clamp-2 group-hover:text-sky-300 transition-colors">
                        {course.courseName}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">{course.courseDescription}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          {course.instructor && (
                            <p className="text-slate-400 text-xs">{course.instructor.firstName} {course.instructor.lastName}</p>
                          )}
                          {(course.ratingAndReviews?.length ?? 0) > 0 && (
                            <p className="text-amber-400 text-xs mt-1">★ {course.ratingAndReviews!.length} reviews</p>
                          )}
                        </div>
                        <span className="text-white font-bold text-lg">
                          {course.price === 0 ? <span className="text-green-400 text-sm">Free</span> : `₹${course.price}`}
                        </span>
                      </div>
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
