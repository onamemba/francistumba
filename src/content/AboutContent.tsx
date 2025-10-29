import React from 'react';

const AboutContent: React.FC = () => {
  return (
    <div className="about-content">
      <h1 className="main-title">Francis Tumba</h1>
      <h2 className="subtitle">Engineer | Technologist | Developer</h2>
      
      <div className="about-bio">
        <p>
          From a young age, I have had a curiosity about how things worked. This 
          eventually led me to become intimately involved with tech, and I fell in love with 
          programming. I started my journey in web development during my middle 
          school years, when my first real exposure to programming began.
        </p>
        <p>
          Today, I'm focused on creating innovative solutions that combine cutting-edge 
          technology with practical applications. My expertise spans across multiple domains 
          of software engineering, from frontend development to system architecture.
        </p>
      </div>
      
      <div className="about-skills">
        <div className="skills-title">Technical Skills</div>
        <div className="skills-list">
          <div className="skill-item">JavaScript/TypeScript</div>
          <div className="skill-item">React</div>
          <div className="skill-item">Node.js</div>
          <div className="skill-item">Python</div>
          <div className="skill-item">AWS</div>
          <div className="skill-item">Docker</div>
          <div className="skill-item">System Design</div>
          <div className="skill-item">CI/CD</div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;