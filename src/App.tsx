import { useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Linkedin,
  Github,
  Mail,
  User,
  Cloud,
  Menu,
  X,
  Send,
  Brain,
  Code,
  Database,
} from 'lucide-react';
import { CloudBackground } from './components/CloudBackground';
import { MinecraftCube } from './components/MinecraftCube';
import { supabase } from './lib/supabase';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'expertise', 'work', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <motion.div
      className="app scroll-container"
      style={{ backgroundPositionY: backgroundY }}
    >
      <CloudBackground />

      {/* ===== STICKY HEADER ===== */}
      <motion.nav
        className="nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="nav-bar">
          {/* Left: Logo */}
          <div className="nav-logo" onClick={() => scrollToSection('hero')}>
            FRANCIS TUMBA
          </div>

          {/* Center: Glass Nav Pill (desktop) */}
          <div className="nav-pill">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`nav-pill-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: CTA + Mobile Toggle */}
          <div className="nav-actions">
            <button
              className="nav-cta-btn"
              onClick={() => scrollToSection('contact')}
            >
              Get in touch <ArrowUpRight size={16} />
            </button>
            <button
              className="nav-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`mobile-menu-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
            <button
              className="mobile-menu-link cta"
              onClick={() => scrollToSection('contact')}
            >
              Get in touch <ArrowUpRight size={16} />
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* ===== HERO ===== */}
      <motion.section
        id="hero"
        className="hero scroll-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="hero-content-new">
          <div className="hero-image-container">
            <motion.div
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <img src="images/profile_face_image.jpg" alt="Francis Tumba" />
            </motion.div>
          </div>
          <div className="hero-content-right">
            <motion.div
              className="hero-label"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              01. INTRODUCTION
            </motion.div>
            <motion.h2
              className="hero-name"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              FRANCIS TUMBA
            </motion.h2>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            >
              SOFTWARE ENGINEER
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Building intelligent systems at the intersection of AI, software and data.
            </motion.p>
            <div className="hero-buttons">
              <motion.button
                className="btn-primary"
                onClick={() => scrollToSection('contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                GET IN TOUCH <ArrowUpRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>
        <motion.div
          className="section-indicator"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <div className="indicator-icon"><Cloud size={20} /></div>
          <div className="indicator-text">Software | Data | AI</div>
        </motion.div>
      </motion.section>

      {/* ===== ABOUT ===== */}
      <motion.section
        id="about"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-content">
          <div className="section-left">
            <div className="section-label">01. ABOUT</div>
            <motion.h2 className="section-title" variants={itemVariants}>
              <User size={24} className="title-icon" />
              ABOUT ME
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="about-content" variants={itemVariants}>
              <motion.p variants={itemVariants}>
                Imagine turning chaos into clarity with a single idea. That's the spark that drives me every day.
                I love using technology to turn big ideas into simple, powerful solutions. Making work flow easier. Building systems
                that grow without a hitch.
              </motion.p>
              <motion.p variants={itemVariants}>
                Curiosity fuels my growth. Discipline sharpens my focus. Collaboration unlocks my best work. I communicate clearly, lead with purpose, and always push forward.
              </motion.p>
              <motion.p variants={itemVariants}>
                Let's build something incredible together.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== CORE COMPETENCIES (was Skills) ===== */}
      <motion.section
        id="expertise"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="competencies-wrapper">
          <div className="section-label centered">02. EXPERTISE</div>
          <motion.h2 className="section-title-centered" variants={itemVariants}>
            CORE COMPETENCIES
          </motion.h2>
          <div className="competencies-grid">
            {[
              {
                icon: <Brain size={22} />,
                title: 'AI Automation',
                desc: 'Automating workflows, data flows and smart agents that save time.',
                img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              },
              {
                icon: <Code size={22} />,
                title: 'Software',
                desc: 'Building fast, reliable web and mobile apps from UI to cloud.',
                img: 'https://images.pexels.com/photos/6424583/pexels-photo-6424583.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              },
              {
                icon: <Database size={22} />,
                title: 'Data',
                desc: 'Turning raw data into clean pipelines, dashboards and insights.',
                img: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="competency-card"
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                <div className="competency-card-image">
                  <img src={card.img} alt={card.title} />
                  <div className="competency-card-icon">{card.icon}</div>
                </div>
                <div className="competency-card-body">
                  <h3 className="competency-card-title">{card.title}</h3>
                  <p className="competency-card-desc">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== WORK (was Projects) ===== */}
      <motion.section
        id="work"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="work-wrapper">
          <div className="work-header-row">
            <div>
              <div className="section-label">03. WORK</div>
              <motion.h2 className="section-title-centered left-aligned" variants={itemVariants}>
                WORK
              </motion.h2>
              <motion.p className="work-intro" variants={itemVariants}>
                A selection of projects where AI, software and data come together.
              </motion.p>
            </div>
            <motion.button
              className="pill-cta"
              onClick={() => scrollToSection('contact')}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              Get in touch <ArrowUpRight size={16} />
            </motion.button>
          </div>

          <div className="work-rows">
            {[
              {
                name: 'Early Coach',
                desc: 'An AI fitness training app with personalized plans.',
                tags: ['React Native', 'Python', 'OpenAI', 'FastAPI'],
                img: 'https://images.pexels.com/photos/4162581/pexels-photo-4162581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                demo: '#',
                github: '#',
              },
              {
                name: 'Personalized Chatbot',
                desc: 'An LLM chatbot that answers from your own documents.',
                tags: ['Next.js', 'LangChain', 'Pinecone', 'TypeScript'],
                img: 'https://images.pexels.com/photos/16027824/pexels-photo-16027824.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                demo: '#',
                github: '#',
              },
              {
                name: 'Social Management',
                desc: 'A website analytics dashboard for all your social platforms.',
                tags: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
                img: 'https://images.pexels.com/photos/10020092/pexels-photo-10020092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                demo: '#',
                github: '#',
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                className={`work-row ${i % 2 === 1 ? 'image-right' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="work-row-text">
                  <h3 className="work-row-title">{project.name}</h3>
                  <p className="work-row-desc">{project.desc}</p>
                  <div className="work-row-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="work-row-buttons">
                    <a href={project.demo} className="work-btn primary">
                      <ExternalLink size={15} /> Live Demo
                    </a>
                    <a href={project.github} className="work-btn secondary">
                      <Github size={15} /> GitHub
                    </a>
                  </div>
                </div>
                <div className="work-row-image">
                  <img src={project.img} alt={project.name} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== CONTACT ===== */}
      <ContactSection sectionVariants={sectionVariants} itemVariants={itemVariants} />
    </motion.div>
  );
}

function ContactSection({
  sectionVariants,
  itemVariants,
}: {
  sectionVariants: any;
  itemVariants: any;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email';
    if (!message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const { error } = await supabase.from('contact_messages').insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    setSubmitting(false);

    if (error) {
      setErrors({ message: 'Something went wrong. Please try again.' });
      return;
    }

    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <motion.section
      id="contact"
      className="section scroll-section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="contact-wrapper">
        <div className="section-label centered">04. CONTACT</div>
        <div className="contact-two-col">
          {/* Left: Form + Links */}
          <div className="contact-form-side">
            <motion.h2 className="section-title-centered left-aligned" variants={itemVariants}>
              CONTACT
            </motion.h2>
            <motion.p className="contact-intro" variants={itemVariants}>
              Have a project in mind or want to collaborate? Send me a message.
            </motion.p>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Message</label>
                <textarea
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={5}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send'} <Send size={16} />
              </button>

              {success && (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>

            <div className="contact-links-list">
              <a href="mailto:onamemba@gmail.com" className="contact-link">
                <Mail size={16} /> onamemba@gmail.com
              </a>
              <a href="https://linkedin.com/in/francis-tumba-8628b4127" className="contact-link">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href="https://github.com/NewSeasonTech" className="contact-link">
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

          {/* Right: 3D Minecraft Cube */}
          <div className="contact-cube-side">
            <Suspense fallback={<div className="cube-loading">Loading 3D...</div>}>
              <MinecraftCube />
            </Suspense>
            <p className="cube-hint">Drag to rotate and move the cube</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default App;
