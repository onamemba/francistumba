import React from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div className="desktop-icon" onClick={onClick}>
      <img src={icon} alt={label} />
      <div className="desktop-icon-text">{label}</div>
    </div>
  );
};

export default DesktopIcon;