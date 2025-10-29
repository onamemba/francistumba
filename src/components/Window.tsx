import React from 'react';
import { Rnd } from 'react-rnd';
import { Window as WindowType } from '../hooks/useWindows';

interface WindowProps {
  window: WindowType;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onActivate: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  onSizeChange: (id: string, width: number, height: number) => void;
}

const Window: React.FC<WindowProps> = ({
  window,
  onClose,
  onMinimize,
  onActivate,
  onPositionChange,
  onSizeChange,
}) => {
  if (window.isMinimized) {
    return null;
  }

  return (
    <Rnd
      className={`win98-window ${window.isActive ? 'win98-window-active' : ''}`}
      size={{ width: window.width, height: window.height }}
      position={{ x: window.x, y: window.y }}
      onDragStart={() => onActivate(window.id)}
      onDragStop={(e, d) => onPositionChange(window.id, d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        onSizeChange(
          window.id,
          parseInt(ref.style.width, 10),
          parseInt(ref.style.height, 10)
        );
        onPositionChange(window.id, position.x, position.y);
      }}
      minWidth={200}
      minHeight={150}
      bounds=".desktop"
      dragHandleClassName="window-title-bar"
    >
      <div className="window-title-bar" onMouseDown={() => onActivate(window.id)}>
        <div className="window-title">
          <img 
            src={window.icon} 
            alt=""
            style={{ width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'text-bottom' }}
          />
          {window.title}
        </div>
        <div className="window-controls">
          <div className="window-control-button" onClick={() => onMinimize(window.id)}>
            _
          </div>
          <div className="window-control-button" onClick={() => onClose(window.id)}>
            ✕
          </div>
        </div>
      </div>
      <div className="window-content">
        {window.content}
      </div>
    </Rnd>
  );
};

export default Window;