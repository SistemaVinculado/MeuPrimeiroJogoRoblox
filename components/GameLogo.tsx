import React from 'react';

const GameLogo: React.FC = () => {
  const title = "PIXEL QUEST";

  return (
    <div className="game-logo-container">
      {title.split('').map((char, index) => {
        if (char === ' ') {
          return <div key={index} className="logo-space"></div>;
        }
        return (
          <span 
            key={index} 
            className="logo-char" 
            style={{ animationDelay: `${index * 0.05}s` }}
            data-text={char}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default GameLogo;
