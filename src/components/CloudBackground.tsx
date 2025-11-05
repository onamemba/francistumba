import React from 'react';
import './CloudBackground.css';

export const CloudBackground: React.FC = () => {
  return (
    <div className="cloud-background">
      <div className="cloud-container">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
      </div>
      <div className="gradient-overlay"></div>
    </div>
  );
};
