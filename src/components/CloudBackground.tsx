import React from 'react';
import './CloudBackground.css';

const CloudBackground: React.FC = () => {
  return (
    <div className="cloud-background">
      <div className="cloud-layer">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
        <div className="cloud cloud-6"></div>
      </div>
    </div>
  );
};

export default CloudBackground;