import React from 'react';

const ResumeContent: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Credits</h2>
      
      <div className="mb-4">
        <h3 className="font-bold">Developer</h3>
        <p>Francis Tumba</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-bold">Technologies Used</h3>
        <ul className="list-disc ml-4">
          <li>React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Windows 98 Design System</li>
        </ul>
      </div>
      
      <div className="mb-4">
        <h3 className="font-bold">Icons</h3>
        <p>Windows 98 Icons by Alex Meub</p>
      </div>
      
      <div>
        <h3 className="font-bold">Special Thanks</h3>
        <p>To all the developers who contributed to the open-source packages used in this project.</p>
      </div>
    </div>
  );
};


export default ResumeContent;