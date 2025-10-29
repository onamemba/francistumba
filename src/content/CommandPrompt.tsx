import React, { useState, useEffect } from 'react';

const CommandPrompt: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Microsoft Windows 98', 'Copyright (C) Microsoft Corp 1981-1998', '', 'C:\\WINDOWS>']);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newOutput = [...output];
      newOutput.push(`C:\\WINDOWS>${input}`);
      
      // Simple command processing
      switch (input.toLowerCase()) {
        case 'help':
          newOutput.push('Available commands:', 'dir - List directory contents', 'cls - Clear screen', 'ver - Show version', 'help - Show this help');
          break;
        case 'cls':
          setOutput(['C:\\WINDOWS>']);
          setInput('');
          return;
        case 'ver':
          newOutput.push('Windows 98 4.10.1998');
          break;
        case 'dir':
          newOutput.push(
            ' Volume in drive C is WINDOWS98',
            ' Volume Serial Number is 1234-5678',
            '',
            ' Directory of C:\\WINDOWS',
            '',
            'SYSTEM     <DIR>        12-07-98  11:00p',
            'TEMP       <DIR>        12-07-98  11:00p',
            'COMMAND    COM     93,880 12-07-98  11:00p',
            'WIN       COM      2,150 12-07-98  11:00p',
            '        2 file(s)     96,030 bytes',
            '        2 dir(s)   112,123 bytes free'
          );
          break;
        default:
          newOutput.push(`'${input}' is not recognized as an internal or external command, operable program or batch file.`);
      }
      
      newOutput.push('C:\\WINDOWS>');
      setOutput(newOutput);
      setInput('');
    }
  };

  return (
    <div className="command-prompt">
      <div className="output">
        {output.map((line, i) => (
          <div key={i} style={{ color: '#00ff00', fontFamily: 'Courier New' }}>{line}</div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#00ff00', fontFamily: 'Courier New' }}>
            {input}
          </span>
          <div className="cursor"></div>
        </div>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ opacity: 0, position: 'absolute' }}
        autoFocus
      />
    </div>
  );
};

export default CommandPrompt;