import React from 'react';

const ProjectsContent: React.FC = () => {
    const folders = [
    { name: 'Videos', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_cool-5.png' },
    { name: 'Documents', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_cool-5.png' },
    { name: 'Photos', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_cool-5.png' },
    { name: 'Downloads', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_cool-5.png' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      {folders.map((folder) => (
        <div key={folder.name} className="flex flex-col items-center p-2 cursor-pointer hover:bg-gray-200">
          <img src={folder.icon} alt={folder.name} className="w-16 h-16" />
          <span className="mt-2 text-center">{folder.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ProjectsContent;