import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Cloud, User } from 'lucide-react';
import { CloudBackground } from './components/CloudBackground';
import { Header } from './components/Header';
import { Competencies, Work } from './components/Sections';
import { Contact } from './components/Contact';
import './App.css';

function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Framer Motion variants for sections
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      className="app scroll-container"
      style={{ backgroundPositionY: backgroundY }}
    >
      <CloudBackground />

      {/* Header: title left, glass nav center, Get in touch right */}
      <Header />

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

      {/* Core Competencies */}
      <Competencies />

      {/* Work */}
      <Work />

      {/* Contact */}
      <Contact />
    </motion.div>
  );
}

export default App;
