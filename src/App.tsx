import React, { useState } from 'react';
import './App.css';
import BootScreen from './components/BootScreen';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import { useWindows } from './hooks/useWindows';
import AboutContent from './content/AboutContent';
import ProjectsContent from './content/ProjectsContent';
import ResumeContent from './content/ResumeContent';
import WebsiteContent from './content/WebsiteContent';
import CommandPrompt from './content/CommandPrompt';
import TennisGame from './content/TennisGame';

function App() {
  const [booted, setBooted] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const {
    windows,
    createWindow,
    closeWindow,
    minimizeWindow,
    activateWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useWindows();

  const handleBootComplete = () => {
    setBooted(true);
  };

  const openWindow = (id: string, title: string, icon: string, content: React.ReactNode, width?: number, height?: number) => {
    createWindow(id, title, icon, content, width, height);
    setStartMenuOpen(false);
  };

  if (!booted) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="App">
      <div className="desktop">
        <DesktopIcon
          icon="/icons/computer.png"
          label="My Portfolio"
          onClick={() => openWindow('website', 'Francis Tumba - Portfolio', '/icons/globe.png', <WebsiteContent />, 900, 600)}
        />
        <DesktopIcon
          icon="/icons/folder.png"
          label="Projects"
          onClick={() => openWindow('projects', 'Projects', '/icons/folder.png', <ProjectsContent />, 800, 600)}
        />
        <DesktopIcon
          icon="/icons/notepad.png"
          label="About Me"
          onClick={() => openWindow('about', 'About Me', '/icons/notepad.png', <AboutContent />, 600, 400)}
        />
        <DesktopIcon
          icon="/icons/document.png"
          label="Credits"
          onClick={() => openWindow('resume', 'Credits', '/icons/document.png', <ResumeContent />, 600, 400)}
        />
        <DesktopIcon
          icon="/icons/cmd.png"
          label="Command Prompt"
          onClick={() => openWindow('cmd', 'Command Prompt', '/icons/cmd.png', <CommandPrompt />, 700, 500)}
        />
        <DesktopIcon
          icon="/icons/game.png"
          label="Tennis Game"
          onClick={() => openWindow('tennis', 'Tennis Game', '/icons/game.png', <TennisGame />, 600, 400)}
        />
      </div>

      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          isActive={window.id === activeWindowId}
          isMinimized={window.isMinimized}
          x={window.x}
          y={window.y}
          width={window.width}
          height={window.height}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onActivate={() => activateWindow(window.id)}
          onPositionChange={(x, y) => updateWindowPosition(window.id, x, y)}
          onSizeChange={(width, height) => updateWindowSize(window.id, width, height)}
        >
          {window.content}
        </Window>
      ))}

      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={activateWindow}
        onStartClick={() => setStartMenuOpen(!startMenuOpen)}
      />

      {startMenuOpen && (
        <StartMenu
          onClose={() => setStartMenuOpen(false)}
          onItemClick={(id, title, icon, content, width, height) =>
            openWindow(id, title, icon, content, width, height)
          }
        />
      )}
    </div>
  );
}

export default App;