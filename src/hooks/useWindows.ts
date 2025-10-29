import { useState, useEffect } from 'react';

export interface Window {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
  width: number;
  height: number;
  x: number;
  y: number;
  isOpen: boolean;
  isActive: boolean;
  isMinimized: boolean;
}

export const useWindows = () => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const createWindow = (
    id: string,
    title: string,
    icon: string,
    content: React.ReactNode,
    width = 400,
    height = 300
  ) => {
    // Calculate position - center or with offset to prevent exact overlay
    const offsetX = windows.length * 20;
    const offsetY = windows.length * 20;
    const x = Math.max(10, Math.min(window.innerWidth - width - 10, (window.innerWidth - width) / 2 + offsetX));
    const y = Math.max(10, Math.min(window.innerHeight - 40 - height - 10, (window.innerHeight - 40 - height) / 2 + offsetY));

    const newWindow: Window = {
      id,
      title,
      icon,
      content,
      width,
      height,
      x,
      y,
      isOpen: true,
      isActive: true,
      isMinimized: false,
    };

    setWindows(prevWindows => {
      // Deactivate all other windows
      const updatedWindows = prevWindows.map(w => ({
        ...w,
        isActive: false,
      }));

      // Check if window already exists
      const existingWindowIndex = updatedWindows.findIndex(w => w.id === id);
      
      if (existingWindowIndex !== -1) {
        // Update existing window
        updatedWindows[existingWindowIndex] = {
          ...updatedWindows[existingWindowIndex],
          isOpen: true,
          isActive: true,
          isMinimized: false,
        };
        return updatedWindows;
      } else {
        // Add new window
        return [...updatedWindows, newWindow];
      }
    });

    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows(prevWindows => {
      const updatedWindows = prevWindows.map(window => 
        window.id === id ? { ...window, isOpen: false } : window
      );
      
      // Find a new active window if we closed the active one
      if (activeWindowId === id) {
        const openWindows = updatedWindows.filter(w => w.isOpen && !w.isMinimized);
        if (openWindows.length > 0) {
          const lastWindow = openWindows[openWindows.length - 1];
          lastWindow.isActive = true;
          setActiveWindowId(lastWindow.id);
        } else {
          setActiveWindowId(null);
        }
      }
      
      return updatedWindows;
    });
  };

  const minimizeWindow = (id: string) => {
    setWindows(prevWindows => {
      const updatedWindows = prevWindows.map(window => 
        window.id === id ? { ...window, isMinimized: true, isActive: false } : window
      );
      
      // Find a new active window
      if (activeWindowId === id) {
        const openWindows = updatedWindows.filter(w => w.isOpen && !w.isMinimized);
        if (openWindows.length > 0) {
          const lastWindow = openWindows[openWindows.length - 1];
          lastWindow.isActive = true;
          setActiveWindowId(lastWindow.id);
        } else {
          setActiveWindowId(null);
        }
      }
      
      return updatedWindows;
    });
  };

  const activateWindow = (id: string) => {
    setWindows(prevWindows => {
      return prevWindows.map(window => ({
        ...window,
        isActive: window.id === id,
        isMinimized: window.id === id ? false : window.isMinimized,
      }));
    });
    setActiveWindowId(id);
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prevWindows => {
      return prevWindows.map(window => 
        window.id === id ? { ...window, x, y } : window
      );
    });
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows(prevWindows => {
      return prevWindows.map(window => 
        window.id === id ? { ...window, width, height } : window
      );
    });
  };

  return {
    windows: windows.filter(window => window.isOpen), // Only return open windows
    createWindow,
    closeWindow,
    minimizeWindow,
    activateWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  };
};