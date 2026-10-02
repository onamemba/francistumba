import React, { useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Download, ExternalLink, Linkedin, Github, Code, Terminal, Database, Cloud, Cpu, Globe, Zap, Monitor, Mail, User, GraduationCap } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { CloudBackground } from './components/CloudBackground';
import './App.css';

function GLBModel({ url }: { url: string }) {
 const { scene, animations } = useGLTF(url);
  const { ref, actions } = useAnimations(animations);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      action?.setLoop(2200, 1);
      action?.play();
    }

    // Apply blue emissive to all materials
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material as any;
        mat.emissive = { r: 0, g: 0.3, b: 1 }; // Bright blue
        mat.emissiveIntensity = 1.2;
        mat.metalness = 0.8;
        mat.roughness = 0.2;
      }
    });
  }, [scene, actions]);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={2}
      position={[0, -1, 0]}
    />
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;

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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Framer Motion variants for sections
 const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

  return (
    <motion.div
      className="app scroll-container"
      style={{ backgroundPositionY: backgroundY }}
    >
      <CloudBackground />
      {/* Navigation */}
      <motion.nav 
        className="nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="nav-content">
          <div className="nav-left">
            <motion.h1 
              className="nav-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              FRANCIS TUMBA
            </motion.h1>
            <motion.button 
              className="nav-cta" 
              onClick={() => scrollToSection('contact')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET IN TOUCH <ArrowUpRight size={16} />
            </motion.button>
          </div>
          <div className="nav-right">
            <motion.button 
              className="nav-home"
              onClick={() => scrollToSection('hero')}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
            >
              Home
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="hero scroll-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="hero-content-new">
          <div className="hero-image-container">
            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <img 
                src="images/profile_face_image.jpg"   
                alt="Francis Tumba" 
              />
            </motion.div>
          </div>
          <div className="hero-content-right">
              <motion.h2 
                className="hero-name"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                FRANCIS TUMBA
              </motion.h2>
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              >
                SOFTWARE ENGINEER
              </motion.h1>
              <div className="hero-buttons">
                <motion.button 
                  className="btn-primary" 
                  onClick={() => scrollToSection('contact')}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95, y: 2 }}
                >
                  GET IN TOUCH <ArrowUpRight size={16} />
                </motion.button>
              </div>
          </div>
        </div>
        <motion.div 
          className="section-indicator"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="indicator-icon"><Cloud size={20} /></div>
          <div className="indicator-text">Software | Data | DevOps </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-content">
          <div className="section-left">
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

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-content">
          <div className="section-left">
            <motion.h2 className="section-title" variants={itemVariants}>
              <Cpu size={24} className="title-icon" />
              SKILLS
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="skills-content" variants={itemVariants}>
              <ul className="skills-list">
                <li>
                  <div className="skill-header">
                    <Cloud size={16} />
                    <strong style={{ color: 'white' }}>Cloud Systems & Growth</strong>
                  </div>
                  <p>Expert in setting up cloud systems that keep your website, app or store fast and reliable. I lower costs and help your business grow without tech headaches.</p>
                </li>
                <li>
                  <div className="skill-header">
                    <Code size={16} />
                    <strong style={{ color: 'white' }}>Software Development & Design</strong>
                  </div>
                  <p>Build beautiful, high-performance websites, mobile apps and custom tools. From sleek user interfaces to rock-solid code, I create products people love to use.</p>
                </li>
                <li>
                  <div className="skill-header">
                    <Zap size={16} />
                    <strong style={{ color: 'white' }}>Data, AI & Smart Automation</strong>
                  </div>
                  <p>I use AI to design smarter systems from the start. I generate clean data flows, predict project risks and automate workflows so every solution launches faster, runs smoother and delivers real business results from day one.</p>
                </li>
                <li>
                  <div className="skill-header">
                    <User size={16} />
                    <strong style={{ color: 'white' }}>Project Leadership</strong>
                  </div>
                  <p>Strong at leading tech projects from start to success. I manage teams, timelines and budgets to deliver real results on time every time.</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-content">
          <div className="section-left">
            <motion.h2 className="section-title" variants={itemVariants}>
              <Monitor size={24} className="title-icon" />
              PROJECTS
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="projects-grid" variants={itemVariants}>
              <div className="project-card">
                <div className="project-header">
                  <h3 className="project-title">Bliss Rides</h3>
                  <div className="project-tech">React • TypeScript • Tailwind</div>
                </div>
                <p className="project-description">
                  Modern transportation service platform with booking, scheduling and real-time tracking capabilities.
                </p>
                <div className="project-links">
                  <a href="https://bliss-rides.com" className="project-link">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <h3 className="project-title">City of Rest</h3>
                  <div className="project-tech">React • Node.js • MongoDB</div>
                </div>
                <p className="project-description">
                  Community platform designed to provide resources and support for urban wellness and relaxation.
                </p>
                <div className="project-links">
                  <a href="https://cityofrest.com" className="project-link">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <h3 className="project-title">Francis Tumba Portfolio</h3>
                  <div className="project-tech">React • TypeScript • Framer Motion</div>
                </div>
                <p className="project-description">
                  Personal portfolio website showcasing professional experience, projects, and technical skills.
                </p>
                <div className="project-links">
                  <a href="https://francistumba.com" className="project-link">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

{/* Contact Section */}
      <motion.section
  id="contact"
  className="section scroll-section"
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  <div className="contact-grid">
    {/* LEFT: Title */}
    <div className="contact-left">
      <motion.h2 className="section-title" variants={itemVariants}>
        <Mail size={24} className="title-icon" />
        CONTACT
      </motion.h2>
    </div>

    {/* CENTER: Text + Links */}
    <div className="contact-center">
      <motion.div className="contact-content" variants={itemVariants}>
        <motion.p variants={itemVariants}>
          Ready to collaborate? Let's discuss your next project.
        </motion.p>

        <motion.div variants={itemVariants} className="contact-links">
          <a href="mailto:onamemba@gmail.com" className="contact-link">
            <Mail size={16} /> onamemba@gmail.com
          </a>
          <a href="https://linkedin.com/in/francis-tumba-8628b4127" className="contact-link">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="https://github.com/NewSeasonTech" className="contact-link">
            <Github size={16} /> GitHub
          </a>
        </motion.div>
      </motion.div>
    </div>

  </div>
</motion.section>
    </motion.div>
  );
}

export default App;