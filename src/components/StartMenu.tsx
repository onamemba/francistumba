import React from 'react';

interface StartMenuItem {
  id: string;
  icon: string;
  label: string;
  onClick: () => void;
}

interface StartMenuProps {
  isOpen: boolean;
  items: StartMenuItem[];
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, items, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`start-menu ${isOpen ? 'visible' : ''}`}>
      <div className="start-menu-banner">
        <span>Francis Tumba</span>
      </div>
      <div className="start-menu-items">
        {items.map(item => (
          <div 
            key={item.id} 
            className="start-menu-item"
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            <img src={item.icon} alt="" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartMenu;