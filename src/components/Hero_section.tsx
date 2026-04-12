const courses = [
  {
    title: "Full-Stack Web Development",
    description: "Build modern web apps with React, Node.js, and databases from scratch.",
    price: "$49.99",
    image: "🖥️",
  },
  {
    title: "UI/UX Design Masterclass",
    description: "Learn design thinking, Figma, and create stunning user experiences.",
    price: "$39.99",
    image: "🎨",
  },
  {
    title: "Python for Data Science",
    description: "Master Python, pandas, and machine learning fundamentals.",
    price: "$59.99",
    image: "📊",
  },
  {
    title: "Mobile App Development",
    description: "Create cross-platform mobile apps with React Native.",
    price: "$44.99",
    image: "📱",
  },
  {
    title: "Cloud & DevOps",
    description: "Deploy, scale, and manage apps with AWS, Docker & CI/CD.",
    price: "$54.99",
    image: "☁️",
  },
  {
    title: "Cybersecurity Essentials",
    description: "Protect systems and data with ethical hacking and security practices.",
    price: "$64.99",
    image: "🔒",
  },
];

const Index = () => {
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 2rem",
        borderBottom: "1px solid #1a1a1a",
      }}>
        <span style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          <span style={{ color: "#8B5CF6" }}>⚡</span> CourseHub
        </span>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#courses" style={{ color: "#999", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}>Courses</a>
          <a href="#" style={{ color: "#999", textDecoration: "none", fontSize: "0.9rem" }}>Pricing</a>
          <button style={{
            background: "transparent",
            border: "1px solid #333",
            color: "#fff",
            padding: "0.5rem 1.25rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}>
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "6rem 2rem 5rem",
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "inline-block",
          padding: "0.35rem 1rem",
          borderRadius: "999px",
          border: "1px solid #2a2a2a",
          fontSize: "0.8rem",
          color: "#8B5CF6",
          marginBottom: "2rem",
          background: "rgba(139,92,246,0.05)",
        }}>
           Start learning today — 10,000+ students enrolled
        </div>

        <h1 style={{
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          marginBottom: "1.5rem",
          position: "relative",
        }}>
          Master New Skills,{" "}
          <span style={{
            background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Transform Your Career
          </span>
        </h1>

        <p style={{
          color: "#777",
          fontSize: "1.1rem",
          lineHeight: 1.7,
          maxWidth: "560px",
          margin: "0 auto 2.5rem",
        }}>
          Access industry-leading courses taught by experts. Learn at your own pace and build real-world projects that matter.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#courses" style={{
            background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
            color: "#fff",
            padding: "0.85rem 2rem",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            boxShadow: "0 0 30px rgba(139,92,246,0.3)",
            transition: "box-shadow 0.3s",
          }}>
            Browse Courses →
          </a>
          <a href="#" style={{
            background: "transparent",
            color: "#ccc",
            padding: "0.85rem 2rem",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.95rem",
            border: "1px solid #2a2a2a",
          }}>
            Watch Demo
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          marginTop: "4rem",
          flexWrap: "wrap",
        }}>
          {[
            { value: "10K+", label: "Students" },
            { value: "200+", label: "Courses" },
            { value: "4.9★", label: "Avg Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{stat.value}</div>
              <div style={{ color: "#666", fontSize: "0.85rem", marginTop: "0.25rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" style={{ padding: "4rem 2rem 6rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
            Featured Courses
          </h2>
          <p style={{ color: "#666", fontSize: "1rem" }}>
            Hand-picked courses to accelerate your learning journey
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {courses.map((course) => (
            <div
              key={course.title}
              style={{
                background: "#111",
                borderRadius: "14px",
                border: "1px solid #1e1e1e",
                overflow: "hidden",
                transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#8B5CF6";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(139,92,246,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e1e1e";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image placeholder */}
              <div style={{
                background: "linear-gradient(135deg, #1a1a1a, #0d0d0d)",
                height: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
              }}>
                {course.image}
              </div>

              <div style={{ padding: "1.5rem" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.3, flex: 1, marginRight: "0.75rem" }}>
                    {course.title}
                  </h3>
                  <span style={{
                    background: "rgba(139,92,246,0.15)",
                    color: "#8B5CF6",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}>
                    {course.price}
                  </span>
                </div>

                <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  {course.description}
                </p>

                <button style={{
                  width: "100%",
                  padding: "0.7rem",
                  borderRadius: "8px",
                  border: "1px solid #2a2a2a",
                  background: "transparent",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#8B5CF6";
                    e.currentTarget.style.borderColor = "#8B5CF6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "#2a2a2a";
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
