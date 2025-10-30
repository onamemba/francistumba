import React, { useState, Suspense } from 'react';
import { Github, Instagram, Globe2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Earth() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4287f5" wireframe />
    </mesh>
  );
}

const WebsiteContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return (
          <div className="page-content font-sharemono text-sm">
            <div className="flex gap-6 items-start">
              <img
                src="/images/profile_face_image.jpg"
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover border-4 border-gray-300 shadow-[10px_8px_0px_0px_rgba(128,128,128,0.10)] flex-shrink-0"
                style={{ objectPosition: 'center 0%', transform: 'scale(2.2)' }}
              />
              <div className="flex-1">
                <h1 className="page-content font-press-start text-lg mb-4">About Me</h1>
                <p className="text-xs mb-4">
                  Imagine turning chaos into clarity with a single idea. That's the spark that drives me every day.
                </p>
                <p className="text-xs mb-4">
                  I love using technology to turn big ideas into simple, powerful solutions. Making work flow easier. Building systems that grow without a hitch.
                </p>
                <p className="text-xs">
                  Curiosity fuels my growth. Discipline sharpens my focus. Collaboration unlocks my best work. I communicate clearly, lead with purpose, and always push forward.
                </p>
                <p className="text-xs mt-4">
                  Let's build something incredible together.
                </p>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="page-content font-sharemono text-sm">
            <div className="mb-8">
              <h3 className="page-content font-press-start text-sm mb-2">IT Technician</h3>
              <div className="flex justify-between text-sm">
                <span>Double Tap - USA</span>
                <span>2024 - Now</span>
              </div>
              <ul className="list-disc pl-6 text-sm mt-2">
                <li>Managed and maintained IT infrastructure for a high-traffic gaming venue.</li>
                <li>Provided technical support and troubleshooting for both software and hardware issues.</li>
                <li>Implemented security protocols to ensure data protection and privacy.</li>
                <li>Optimized network performance and managed system backups.</li>
              </ul>
            </div>
      
            <div className="mb-8">
              <h3 className="page-content font-press-start text-sm mb-2">Big Data Engineer</h3>
              <div className="flex justify-between text-sm">
                <span>Shoprite - South Africa</span>
                <span>2021 - 2024</span>
              </div>
              <ul className="list-disc pl-6 text-sm mt-2">
                <li>Designed and implemented scalable data pipelines for real-time analytics.</li>
                <li>Worked with large-scale distributed systems for data storage and processing.</li>
                <li>Optimized ETL processes to reduce latency and improve data accuracy.</li>
                <li>Collaborated with cross-functional teams to build data-driven solutions.</li>
              </ul>
            </div>
      
            <div className="mb-8">
              <h3 className="page-content font-press-start text-sm mb-2">IT Engineer</h3>
              <div className="flex justify-between text-sm">
                <span>Autumn Leaf IT - South Africa</span>
                <span>2019 - 2021</span>
              </div>
              <ul className="list-disc pl-6 text-sm mt-2">
                <li>Provided IT support for corporate clients, ensuring minimal downtime.</li>
                <li>Configured and maintained enterprise-level networks and servers.</li>
                <li>Managed software updates, security patches, and data backups.</li>
                <li>Led troubleshooting efforts for network and hardware issues.</li>
              </ul>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="page-content font-sharemono text-sm">
            <h2 className="page-content font-press-start text-xs mb-2">Projects</h2>
            <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="project-card bg-gray-100 border-2 border-gray-300 p-4 rounded-xl shadow-md">
                <div className="flex items-center mb-2">
                  <Globe2 className="w-5 h-5 mr-2" />
                  <h3 className="page-content font-press-start text-xs">Re-Col-Let</h3>
                </div>
                <p className="text-sm mb-4">Re-Col-Let uses AI to record and summarize your speech into organized notes. Capture ideas hands-free and review them anytime.</p>
                <a href="https://lecture-summarizer-web-ai.vercel.app/" className="text-sm text-blue-500 underline">Code</a>
              </div>
              <div className="project-card bg-gray-100 border-2 border-gray-300 p-4 rounded-xl shadow-md">
                <div className="flex items-center mb-2">
                  <Globe2 className="w-5 h-5 mr-2" />
                  <h3 className="page-content font-press-start text-xs">Book Store</h3>
                </div>
                <p className="text-sm mb-4">Wisdom for Living is a monthly devotional designed to strengthen your daily walk of faith. Find encouragement, guidance, and biblical truth for every day.</p>
                <a href="https://tangerine-marzipan-a710e0.netlify.app/" className="text-sm text-blue-500 underline">Demo</a> | <a href="https://tangerine-marzipan-a710e0.netlify.app/" className="text-sm text-blue-500 underline">Code</a>
              </div>
              <div className="project-card bg-gray-100 border-2 border-gray-300 p-4 rounded-xl shadow-md">
                <div className="flex items-center mb-2">
                  <Globe2 className="w-5 h-5 mr-2" />
                  <h3 className="page-content font-press-start text-xs">Social Media Management</h3>
                </div>
                <p className="text-sm mb-4">Manage all your social media accounts from one intuitive dashboard. Schedule posts, track engagement, and streamline your online presence.</p>
                <a href="https://startling-starship-8b7b9c.netlify.app/" className="text-sm text-blue-500 underline">Demo</a> | <a href="https://startling-starship-8b7b9c.netlify.app/" className="text-sm text-blue-500 underline">Code</a>
              </div>
              <div className="project-card bg-gray-100 border-2 border-gray-300 p-4 rounded-xl shadow-md">
                <div className="flex items-center mb-2">
                  <Globe2 className="w-5 h-5 mr-2" />
                  <h3 className="page-content font-press-start text-xs">PianoEar</h3>
                </div>
                <p className="text-sm mb-4">PianoEar is a fun online game to train your musical ear. Learn to recognize notes, chords, and intervals using a virtual piano.</p>
                <a href="https://relaxed-heliotrope-5a37a7.netlify.app/" className="text-sm text-blue-500 underline">Demo</a> | <a href="https://relaxed-heliotrope-5a37a7.netlify.app/" className="text-sm text-blue-500 underline">Code</a>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="page-content font-sharemono text-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="page-content font-press-start text-xs mb-2">Contact</h2>
                <div className="contact-form">
                  <div className="form-group">
                    <label className="text-sm">Name:</label>
                    <input type="text" className="form-input text-sm" />
                  </div>
                  <div className="form-group">
                    <label className="text-sm">Email:</label>
                    <input type="email" className="form-input text-sm" />
                  </div>
                  <div className="form-group">
                    <label className="text-sm">Message:</label>
                    <textarea className="form-input text-sm" rows={5}></textarea>
                  </div>
                  <button className="win98-button text-sm">Send Message</button>
                  
                  <div className="mt-6 flex gap-4">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative h-[300px]">
                <div className="absolute right-0 top-0 w-full h-full">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Suspense fallback={null}>
                      <Earth />
                    </Suspense>
                    <OrbitControls enableZoom={false} />
                  </Canvas>
                </div>
                <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-sm font-press-start">You are here ↓</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="page-content font-press-start">
            <div className="website-header">
              <h1 className="text-2xl mb-4">Francis Tumba</h1>
              <h2 className="text-sm">Engineer | Technologist | Developer</h2>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="website-content font-press-start max-w-full overflow-x-hidden">
      <div className="website-sidebar">
        <nav className="website-nav flex flex-wrap justify-center gap-2 md:gap-4 px-2 md:px-4">
          <a 
            href="#" 
            className={`nav-link text-[10px] md:text-xs ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            HOME
          </a>
          <a 
            href="#" 
            className={`nav-link text-[10px] md:text-xs ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentPage('about')}
          >
            ABOUT ME
          </a>
          <a 
            href="#" 
            className={`nav-link text-[10px] md:text-xs ${currentPage === 'experience' ? 'active' : ''}`}
            onClick={() => setCurrentPage('experience')}
          >
            EXPERIENCE
          </a>
          <a 
            href="#" 
            className={`nav-link text-[10px] md:text-xs ${currentPage === 'projects' ? 'active' : ''}`}
            onClick={() => setCurrentPage('projects')}
          >
            PROJECTS
          </a>
          <a 
            href="#" 
            className={`nav-link text-[10px] md:text-xs ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => setCurrentPage('contact')}
          >
            CONTACT
          </a>
        </nav>
      </div>

      <div className="website-main px-4 md:px-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default WebsiteContent;