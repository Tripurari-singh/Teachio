const courses = [
  {
    title: "Full-Stack Web Development",
    description: "Build modern web apps with React, Node.js, and databases from scratch.",
    image: "🖥️",
  },
  {
    title: "UI/UX Design Masterclass",
    description: "Learn design thinking, Figma, and create stunning user experiences.",
    image: "🎨",
  },
  {
    title: "Python for Data Science",
    description: "Master Python, pandas, and machine learning fundamentals.",
    image: "📊",
  },
  {
    title: "Mobile App Development",
    description: "Create cross-platform mobile apps with React Native.",
    image: "📱",
  },
  {
    title: "Cloud & DevOps",
    description: "Deploy, scale, and manage apps with AWS, Docker & CI/CD.",
    image: "☁️",
  },
  {
    title: "Cybersecurity Essentials",
    description: "Protect systems and data with ethical hacking and security practices.",
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
          <span style={{ color: "#8B5CF6" }}></span> Teachio
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
    </div>
  );
};

export default Index;
