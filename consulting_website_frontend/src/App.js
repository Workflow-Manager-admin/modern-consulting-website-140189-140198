import React, { useState, useRef } from "react";
import "./App.css";

// Color palette and styling constants
const COLORS = {
  primary: "#2B2D42",
  secondary: "#8D99AE",
  accent: "#EF233C",
  light: "#fff",
  bgSection: "#F9FAFB",
};

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Why Us", id: "whyus" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

// Simple services showcase
const SERVICES = [
  {
    title: "Digital Transformation",
    description:
      "Empower your business with tailored digital solutions, process automation, and technology advisory.",
    icon: "🔗",
  },
  {
    title: "Strategy & Operations",
    description:
      "Insight-driven business strategies, market entry, operational excellence, and organizational change.",
    icon: "📈",
  },
  {
    title: "Sustainability Consulting",
    description:
      "Build sustainable roadmaps, align with ESG benchmarks, and innovate for a better tomorrow.",
    icon: "🌱",
  },
];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// PUBLIC_INTERFACE
function App() {
  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formErr, setFormErr] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Animation triggers for section reveals
  const [revealSections, setRevealSections] = useState({
    about: false,
    whyus: false,
    work: false,
    contact: false,
  });

  // Section refs for intersection observer
  const sectionRefs = {
    about: useRef(),
    whyus: useRef(),
    work: useRef(),
    contact: useRef(),
  };

  // Reveal animation on section in viewport
  React.useEffect(() => {
    const handleReveal = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.id;
          setRevealSections((prev) => ({ ...prev, [section]: true }));
        }
      });
    };
    const observer = new window.IntersectionObserver(handleReveal, {
      threshold: 0.18,
    });
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, []);

  // Validate contact form
  function validate(form) {
    const err = {};
    if (!form.name.trim()) err.name = "Name required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[a-z]+$/i.test(form.email))
      err.email = "Valid email required";
    if (!form.message.trim() || form.message.length < 10)
      err.message = "Message must be at least 10 characters";
    return err;
  }

  // PUBLIC_INTERFACE
  function handleFormChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setFormErr((err) => ({ ...err, [e.target.name]: undefined }));
  }

  // PUBLIC_INTERFACE
  function handleFormSubmit(e) {
    e.preventDefault();
    const err = validate(form);
    setFormErr(err);
    if (Object.keys(err).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
      setForm({ name: "", email: "", message: "" });
    }
  }

  return (
    <div className="main-root">
      {/* Fixed Navigation */}
      <nav className="navbar" style={{ background: COLORS.light, color: COLORS.primary }}>
        <div className="navbar-content">
          <a className="navbar-brand" href="#about" onClick={() => scrollToSection("about")}>
            <span style={{ color: COLORS.accent }}>consulting.</span>
          </a>
          <ul className="navbar-links">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id}>
                <a href={"#" + id}
                  onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                  className="nav-link"
                >{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* About Section */}
      <section
        id="about"
        ref={sectionRefs.about}
        className={"section about-section" + (revealSections.about ? " reveal" : "")}
        style={{ background: COLORS.light }}
      >
        <div className="container vertical-center">
          <h1 className="big-title animate-slideup">
            Welcome to <span style={{ color: COLORS.accent }}>Your Consulting Partner</span>
          </h1>
          <p className="subtitle animate-fadein">
            We empower organizations with modern strategies, digital solutions, and sustainable growth—tailored to your vision.
          </p>
          <div className="accent-bar"></div>
          <div className="cta-row">
            <button className="cta-btn" style={{ background: COLORS.accent }}
              onClick={() => scrollToSection("contact")}
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section
        id="whyus"
        ref={sectionRefs.whyus}
        className={"section whyus-section" + (revealSections.whyus ? " reveal" : "")}
        style={{ background: COLORS.bgSection }}
      >
        <div className="container-wide">
          <h2 className="section-title animate-slideup">Why Choose Us</h2>
          <div className="whyus-features">
            <div className="whyus-feature-card animate-pop">
              <div className="feature-icon" role="img" aria-label="Expertise">
                🧠
              </div>
              <div className="feature-title">Proven Expertise</div>
              <p>
                Decades of cross-industry experience and deep domain knowledge to solve business-critical challenges.
              </p>
            </div>
            <div className="whyus-feature-card animate-pop delay1">
              <div className="feature-icon" role="img" aria-label="Collaboration">
                🤝
              </div>
              <div className="feature-title">Client-Centric Approach</div>
              <p>
                We partner closely with you, ensuring every solution fits your unique needs—not just best practices.
              </p>
            </div>
            <div className="whyus-feature-card animate-pop delay2">
              <div className="feature-icon" role="img" aria-label="Innovation">
                🚀
              </div>
              <div className="feature-title">Innovation-Driven</div>
              <p>
                Embracing the latest technologies and fresh thinking to unlock new opportunities and lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section: Service Showcase */}
      <section
        id="work"
        ref={sectionRefs.work}
        className={"section work-section" + (revealSections.work ? " reveal" : "")}
        style={{
          background: COLORS.light,
        }}
      >
        <div className="container">
          <h2 className="section-title animate-slideup">Our Services</h2>
          <div className="services-list">
            {SERVICES.map((service, idx) => (
              <div className={"service-card animate-float delay" + idx} key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <div className="service-title">{service.title}</div>
                <div className="service-desc">{service.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={sectionRefs.contact}
        className={"section contact-section" + (revealSections.contact ? " reveal" : "")}
        style={{ background: COLORS.bgSection }}
      >
        <div className="container">
          <h2 className="section-title animate-slideup">Let's Talk</h2>
          <div className="contact-form-wrapper">
            <form
              className="contact-form animate-fadein"
              autoComplete="off"
              onSubmit={handleFormSubmit}
              noValidate
            >
              <div className="form-row">
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={form.name}
                    onChange={handleFormChange}
                    aria-invalid={!!formErr.name}
                  />
                  {formErr.name && <span className="input-err">{formErr.name}</span>}
                </label>
              </div>
              <div className="form-row">
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={form.email}
                    onChange={handleFormChange}
                    aria-invalid={!!formErr.email}
                  />
                  {formErr.email && <span className="input-err">{formErr.email}</span>}
                </label>
              </div>
              <div className="form-row">
                <label htmlFor="message">
                  Message
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleFormChange}
                    aria-invalid={!!formErr.message}
                  />
                  {formErr.message && <span className="input-err">{formErr.message}</span>}
                </label>
              </div>
              <div className="form-row">
                <button
                  className="cta-btn"
                  type="submit"
                  style={{ background: COLORS.accent, minWidth: "120px" }}
                  disabled={submitted}
                >
                  {submitted ? "Sent ✔" : "Send Message"}
                </button>
                {submitted && (
                  <span className="success-msg">Thank you! We'll reply soon.</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ background: COLORS.primary, color: COLORS.secondary }}>
        <div className="footer-content">
          <span>
            &copy; {new Date().getFullYear()} consulting. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
