import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowUpRight, Bot, BarChart3, Code, Database, Dumbbell, ExternalLink, Github, Monitor, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ---------- Image with a built-in fallback ----------
   If the file in /public/images is missing, a blocky blue placeholder
   is shown instead, so nothing looks broken while you add your images. */
function SmartImage({ src, alt, icon: Icon }: { src: string; alt: string; icon: LucideIcon }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="img-fallback" role="img" aria-label={alt}>
        <Icon size={56} strokeWidth={1.5} />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ---------- CORE COMPETENCIES ---------- */
const COMPETENCIES: { title: string; text: string; img: string; icon: LucideIcon }[] = [
  {
    title: 'AI Automation',
    text: 'Smart workflows, data flows and AI agents that save time and cut manual work.',
    img: '/images/ai-automation.png',
    icon: Zap,
  },
  {
    title: 'Software',
    text: 'Fast, reliable web and mobile apps, from clean interfaces to solid cloud backends.',
    img: '/images/software.png',
    icon: Code,
  },
  {
    title: 'Data',
    text: 'Clean pipelines, dashboards and insights that turn raw data into decisions.',
    img: '/images/data.png',
    icon: Database,
  },
];

export function Competencies() {
  return (
    <section id="expertise" className="section scroll-section sec-wide">
      <motion.div
        className="sec-wide-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div className="sec-head" variants={fadeUp}>
          <div>
            <div className="sec-label">02. EXPERTISE</div>
            <h2 className="section-title">Core Competencies</h2>
          </div>
        </motion.div>

        <div className="comp-grid">
          {COMPETENCIES.map((c) => (
            <motion.article key={c.title} className="comp-card" variants={fadeUp}>
              <div className="card-media">
                <SmartImage src={c.img} alt={c.title} icon={c.icon} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- WORK ----------
   Fill in `live` with each project's URL to show the "Live Demo" button.
   Buttons only appear when the link is not empty. */
const PROJECTS: {
  name: string;
  text: string;
  tags: string[];
  img: string;
  icon: LucideIcon;
  live: string;
  code: string;
}[] = [
  {
    name: 'Early Coach',
    text: 'An AI fitness training app that builds personalized plans and adapts them as you progress.',
    tags: ['React', 'TypeScript', 'AI'],
    img: '/images/early-coach.png',
    icon: Dumbbell,
    live: '',
    code: 'https://github.com/NewSeasonTech',
  },
  {
    name: 'Personalized Chatbot',
    text: 'An LLM chatbot that answers questions using your own documents.',
    tags: ['LLM', 'RAG', 'Node.js'],
    img: '/images/chatbot.png',
    icon: Bot,
    live: '',
    code: 'https://github.com/NewSeasonTech',
  },
  {
    name: 'Social Management',
    text: 'A website analytics dashboard that brings all your social platforms into one place.',
    tags: ['React', 'Analytics', 'APIs'],
    img: '/images/social-management.png',
    icon: BarChart3,
    live: '',
    code: 'https://github.com/NewSeasonTech',
  },
];

export function Work() {
  const goContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="work" className="section scroll-section sec-wide">
      <motion.div
        className="sec-wide-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="sec-head" variants={fadeUp}>
          <div>
            <div className="sec-label">03. WORK</div>
            <h2 className="section-title">
              <Monitor size={24} className="title-icon" />
              Work
            </h2>
            <p className="sec-intro">A look at what I build: AI products, data tools and web apps made to be used.</p>
          </div>
          <button className="pill-btn" onClick={goContact}>
            Get in touch <span className="dot" />
          </button>
        </motion.div>

        <div className="work-list">
          {PROJECTS.map((p) => (
            <motion.article key={p.name} className="work-row" variants={fadeUp}>
              <div className="work-text">
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <div className="tag-row">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="work-actions">
                  {p.live && (
                    <a className="mini-btn solid" href={p.live} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {p.code && (
                    <a className="mini-btn" href={p.code} target="_blank" rel="noreferrer">
                      <Github size={16} /> GitHub <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
              <div className="work-media">
                <SmartImage src={p.img} alt={p.name} icon={p.icon} />
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
