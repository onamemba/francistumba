import React, { useEffect, useState } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Simulate boot sequence
    setTimeout(() => {
      setProgress(30);
    }, 500);

    setTimeout(() => {
      setProgress(60);
    }, 1500);

    setTimeout(() => {
      setProgress(100);
    }, 2500);

    setTimeout(() => {
      setHidden(true);
      onBootComplete();
    }, 3500);
  }, [onBootComplete]);

  return (
    <div className={`boot-screen ${hidden ? 'hidden' : ''}`}>
      <div className="boot-logo">Welcome to Francis Tumba Portfolio</div>
      <div className="subtitle">Engineer | Technologist | Developer</div>
      <div className="boot-progress">
        <div 
          className="boot-progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BootScreen;