import React from 'react';
import { Window as WindowType } from '../hooks/useWindows';

interface TaskbarProps {
  windows: WindowType[];
  onTaskbarItemClick: (id: string) => void;
  startMenuOpen: boolean;
  toggleStartMenu: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onTaskbarItemClick,
  startMenuOpen,
  toggleStartMenu,
}) => {
  // Current time for the taskbar clock
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="taskbar">
      <div 
        className={`start-button ${startMenuOpen ? 'active' : ''}`} 
        onClick={toggleStartMenu}
      >
        <img 
          src="https://win98icons.alexmeub.com/icons/png/windows-0.png" 
          alt="Start" 
        />
        Start
      </div>
      
      <div className="taskbar-items">
        {windows.filter(w => w.isOpen).map(window => (
          <div 
            key={window.id}
            className={`taskbar-item ${window.isActive && !window.isMinimized ? 'active' : ''}`}
            onClick={() => onTaskbarItemClick(window.id)}
          >
            <img src={window.icon} alt="" />
            {window.title}
          </div>
        ))}
      </div>
      
      <div className="taskbar-right">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Taskbar;