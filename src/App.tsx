import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Download, ExternalLink, Linkedin, Github, Code, Terminal, Database, Cloud, Cpu, Globe, Zap, Monitor, Mail, User } from 'lucide-react';
import './App.css';

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
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.95,
      rotateX: 10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };
  return (
    <motion.div
      className="app scroll-container"
      style={{ backgroundPositionY: backgroundY }}
    >
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
                CLOUD ENGINEER
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
              ABOUT ME
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="section-icon-container" variants={itemVariants}>
              <User size={24} className="section-icon" />
            </motion.div>
            <motion.h3 className="section-subtitle" variants={itemVariants}>
              Software Engineer
            </motion.h3>
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
            <motion.div className="section-cta" variants={itemVariants}>
              <motion.a 
                href="https://linkedin.com/in/francistumba" 
                className="btn-outline"
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <Linkedin size={16} /> LINKEDIN
              </motion.a>
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
              SKILLS
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="section-icon-container" variants={itemVariants}>
              <Cpu size={24} className="section-icon" />
            </motion.div>
            <motion.h3 className="section-subtitle" variants={itemVariants}>
              Areas of Expertise
            </motion.h3>
            <motion.div className="skills-content" variants={itemVariants}>
              <ul className="skills-list">
                <motion.li variants={itemVariants}>
                  • Describe a skill or area of expertise.
                </motion.li>
                <motion.li variants={itemVariants}>
                  • Describe a skill or area of expertise.
                </motion.li>
                <motion.li variants={itemVariants}>
                  • Describe a skill or area of expertise.
                </motion.li>
                <motion.li variants={itemVariants}>
                  • Describe a skill or area of expertise.
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        id="experience"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-content">
          <div className="section-left">
            <motion.h2 className="section-title" variants={itemVariants}>
              WORK
              <br />
              EXPERIENCE
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="experience-item" variants={itemVariants}>
              <div className="experience-header">
                <div className="experience-company">Double Tap</div>
                <div className="experience-period">2024 - 2025</div>
              </div>
              <div className="experience-role">IT Technician /</div>
              <ul className="experience-details">
                <motion.li variants={itemVariants}>• Managed and maintained IT infrastructure for a high-traffic gaming venue with 99.9% uptime</motion.li>
                <motion.li variants={itemVariants}>• Provided technical support and troubleshooting for both software and hardware issues, reducing downtime by 40%</motion.li>
                <motion.li variants={itemVariants}>• Implemented security protocols and automated backup systems to ensure data protection and privacy</motion.li>
                <motion.li variants={itemVariants}>• Optimized network performance and managed system backups using cloud-based solutions</motion.li>
              </ul>
            </motion.div>

            <motion.div className="experience-item" variants={itemVariants}>
              <div className="experience-header">
                <div className="experience-company">Shoprite Holdings</div>
                <div className="experience-period">2021 - 2024</div>
              </div>
              <div className="experience-role">Senior Data Engineer /</div>
              <ul className="experience-details">
                <motion.li variants={itemVariants}>• Designed and managed ETL pipelines processing 10TB+ of data daily using AWS and Snowflake</motion.li>
                <motion.li variants={itemVariants}>• Optimized data warehouses and automated reporting, reducing manual work by 80%</motion.li>
                <motion.li variants={itemVariants}>• Built real-time analytics dashboards that improved business decision-making speed by 50%</motion.li>
                <motion.li variants={itemVariants}>• Led data architecture initiatives and mentored junior engineers on best practices</motion.li>
              </ul>
            </motion.div>

            <motion.div className="experience-item" variants={itemVariants}>
              <div className="experience-header">
                <div className="experience-company">AutumnLeaf IT Solutions</div>
                <div className="experience-period">2019 - 2021</div>
              </div>
              <div className="experience-role">DevOps Engineer /</div>
              <ul className="experience-details">
                <motion.li variants={itemVariants}>• Improved CI/CD pipelines and automated deployments, reducing deployment time by 60%</motion.li>
                <motion.li variants={itemVariants}>• Managed infrastructure using AWS CloudFormation and Docker, supporting 500+ daily transactions</motion.li>
                <motion.li variants={itemVariants}>• Implemented monitoring and alerting systems that improved system reliability by 35%</motion.li>
                <motion.li variants={itemVariants}>• Collaborated with development teams to optimize application performance and scalability</motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-content">
          <div className="section-left">
            <motion.h2 className="section-title" variants={itemVariants}>
              EDUCATION
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="education-content" variants={itemVariants}>
              <motion.div className="education-item" variants={itemVariants}>
                <h3 className="education-degree">Master of Science in Data Science & Quantitative Analysis</h3>
                <p className="education-school">WorldQuant University / Graduated: 2024</p>
              </motion.div>
              <motion.div className="education-item" variants={itemVariants}>
                <h3 className="education-degree">Bachelor of Technology in Information Technology</h3>
                <p className="education-school">Cape Peninsula University of Technology / Graduated: 2019</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section
        id="certifications"
        className="section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-content">
          <div className="section-left">
            <motion.h2 className="section-title" variants={itemVariants}>
              CERTIFICATIONS
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="certifications-list" variants={itemVariants}>
              <motion.div className="certification-item" variants={itemVariants}>
                <div className="certification-name">AWS Certified Machine Learning – Specialty</div>
              </motion.div>
              
              <motion.div className="certification-item" variants={itemVariants}>
                <div className="certification-name">AWS Certified Data Analytics – Specialty</div>
              </motion.div>
              
              <motion.div className="certification-item" variants={itemVariants}>
                <div className="certification-name">AWS Certified DevOps Engineer – Professional</div>
              </motion.div>

              <motion.div className="certification-item" variants={itemVariants}>
                <div className="certification-name">Snowflake SnowPro Core Certification</div>
              </motion.div>

              <motion.div className="certification-item" variants={itemVariants}>
                <div className="certification-name">Python Institute Certification (PCAP)</div>
              </motion.div>
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
        <div className="section-content">
          <div className="section-left">
            <motion.h2 className="section-title" variants={itemVariants}>
              CONTACT
            </motion.h2>
          </div>
          <div className="section-right">
            <motion.div className="contact-content" variants={itemVariants}>
              <motion.p variants={itemVariants}>Ready to collaborate? Let's discuss your next project.</motion.p>
              <motion.div className="contact-links" variants={itemVariants}>
                <motion.a 
                  href="mailto:onamemba@gmail.com" 
                  className="contact-link"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <Mail size={16} /> onamemba@gmail.com
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/in/francistumba" 
                  className="contact-link"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <Linkedin size={16} /> LinkedIn
                </motion.a>
                <motion.a 
                  href="https://github.com/francistumba" 
                  className="contact-link"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <Github size={16} /> GitHub
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default App;