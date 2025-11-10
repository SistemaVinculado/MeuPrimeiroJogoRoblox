import React, { useState, useEffect } from 'react';
import MenuButton from './components/MenuButton';
import CharacterSlots from './components/CharacterSlots';
import HallOfFame from './components/HallOfFame';
import GameLogo from './components/GameLogo';

// --- Header Icons ---
const KIcon = () => (
    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold k-icon"
         style={{boxShadow: '0 0 15px 3px rgba(147, 51, 234, 0.6)'}}>
        K
    </div>
);

const OrientationWarning: React.FC = () => (
  <div className="fixed inset-0 bg-[#0A080C] text-white flex flex-col items-center justify-center z-50 p-8 text-center select-none">
    <div className="relative mb-8 animate-pulse">
      {/* Phone icon */}
      <svg className="w-20 h-36 text-accent-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
      {/* Rotate arrow */}
      <svg className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-16 h-16 text-white" style={{ animation: 'spin-slow 5s linear infinite reverse' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2.5 12a9.5 9.5 0 1 1 6.383 9.032"></path>
          <path d="M2.5 7.5v5h5"></path>
      </svg>
    </div>
      
    <h2 className="text-2xl mb-4 text-accent-green" style={{ filter: 'drop-shadow(0 0 8px var(--accent-green))'}}>
        Por Favor, Gire Seu Dispositivo
    </h2>
    <p className="text-lg text-gray-300">
        Esta experiência é melhor visualizada no modo paisagem.
    </p>
  </div>
);


const App: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
  const [showCharacterSlots, setShowCharacterSlots] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);

  const subtitleText = "REIGN OF THE RUINED KING";
  const corruptionChars = '▓▒░█';
  const [corruptedSubtitle, setCorruptedSubtitle] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    mediaQuery.addEventListener('change', handleOrientationChange);
    
    // Initial check
    setIsPortrait(mediaQuery.matches);

    // Generate corrupted text for subtitle effect
    setCorruptedSubtitle(
      Array.from(subtitleText).map(char => 
          char === ' ' ? ' ' : corruptionChars[Math.floor(Math.random() * corruptionChars.length)]
      ).join('')
    );

    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  const openHallOfFame = () => {
    setShowCharacterSlots(false);
    setShowHallOfFame(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 overflow-hidden relative font-pixel">
      {isPortrait ? (
          <OrientationWarning />
      ) : (
        <>
          {/* Atmospheric Background Effects */}
          <div className="vignette-overlay"></div>
          <div className="scanline-overlay"></div>
          <div className="purple-glow"></div>
          <div className="green-glow"></div>
          
           {showCharacterSlots ? (
              <CharacterSlots onClose={() => setShowCharacterSlots(false)} />
            ) : showHallOfFame ? (
              <HallOfFame onClose={() => setShowHallOfFame(false)} />
            ) : (
             <>
                {/* Header */}
                <header className="absolute top-0 left-0 right-0 p-4 flex justify-end items-center z-20">
                  <div>
                    <KIcon />
                  </div>
                </header>
          
                <main className="z-10 flex flex-col items-center justify-center w-full text-center">
                  {/* Game Logo */}
                  <div className="mb-4">
                     <GameLogo />
                  </div>
          
                  {/* Subtitle */}
                  <h2 className="ruined-text text-3xl md:text-4xl mb-12" data-text={subtitleText}>
                    {subtitleText}
                    <span aria-hidden="true">{corruptedSubtitle}</span>
                  </h2>
          
                  {/* Menu Buttons */}
                  <nav className="w-full max-w-sm md:max-w-lg flex flex-col items-center space-y-3">
                    <MenuButton label="Jogar" primary onClick={() => setShowCharacterSlots(true)} />
                    <div className="flex w-full space-x-3">
                      <MenuButton label="Servidores" />
                      <MenuButton label="Hall da Fama" onClick={openHallOfFame} />
                    </div>
                    <MenuButton label="Créditos" />
                  </nav>
                </main>
          
                {/* Footer */}
                <footer className="absolute bottom-2 left-4 text-gray-500 text-[10px] z-10">
                  <p>v1.0.0 - Build #22490 • Arte por Ketsunex</p>
                </footer>
             </>
           )}
        </>
      )}

      <style>{`
        :root {
          --background: #0A080C;
          --text-gold: #E8B24C;
          --banner-red: #983B3B;
          --banner-dark-red: #5A1F1F;
          --accent-green: #65F873;
          --accent-green-dark: #3A8E42;
          --accent-green-light: #82ff8e;
          --button-gray: #4A5568;
          --button-gray-dark: #1A202C;
          --button-gray-light: #718096;
          --glitch-1: #A755F7; /* Purple */
          --glitch-2: #65F873; /* Green */

          /* New colors for character screen */
          --panel-bg: #3c3c3c;
          --panel-border-dark: #1e1e1e;
          --panel-border-light: #5a5a5a;
          --slot-bg: #4a4a4a;
          --text-light: #f0f0f0;
          --gold-btn: #fecb3e;
          --gold-btn-dark: #d1a12a;
          --green-btn: #96e02e;
          --green-btn-dark: #6eab25;
          --gray-btn: #6B7280;
          --gray-btn-dark: #374151;
          --gray-btn-light: #9CA3AF;
        }

        .font-pixel {
          font-family: 'Press Start 2P', cursive;
        }
        
        /* --- ATMOSPHERIC EFFECTS --- */
        .vignette-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at center, rgba(10, 8, 12, 0) 50%, rgba(10, 8, 12, 1) 100%);
          pointer-events: none;
          z-index: 2;
        }
        .scanline-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: repeating-linear-gradient(
                transparent 0,
                rgba(0,0,0,0.4) 1px,
                transparent 3px
            );
            pointer-events: none;
            z-index: 3;
            animation: scanline-scroll 20s linear infinite;
        }
        @keyframes scanline-scroll {
            from { background-position: 0 0; }
            to { background-position: 0 100px; }
        }

        .purple-glow, .green-glow {
          position: fixed;
          pointer-events: none;
          z-index: 0;
          filter: blur(120px);
        }
        .purple-glow {
          top: -10%;
          left: -15%;
          width: 40vw;
          height: 60vh;
          background: rgba(76, 29, 149, 0.35);
          border-radius: 50%;
          animation: pulse 15s ease-in-out infinite alternate;
        }
        .green-glow {
          bottom: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 40vh;
          background: rgba(34, 197, 94, 0.18);
          border-radius: 50%;
          animation: pulse 12s ease-in-out infinite alternate-reverse;
        }
        @keyframes pulse {
          from { transform: scale(0.9) rotate(-5deg); opacity: 0.7; }
          to { transform: scale(1.1) rotate(5deg); opacity: 1; }
        }

        /* --- HEADER --- */
        .k-icon {
          animation: k-glow 4s ease-in-out infinite alternate;
        }
        @keyframes k-glow {
          from { box-shadow: 0 0 15px 3px rgba(147, 51, 234, 0.4); }
          to { box-shadow: 0 0 25px 8px rgba(147, 51, 234, 0.7); }
        }

        /* --- NEW GAME LOGO --- */
        .game-logo-container {
          display: flex;
          justify-content: center;
          perspective: 800px;
          filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.5));
          user-select: none;
        }

        .logo-char {
          font-size: 5rem;
          color: var(--text-gold);
          position: relative;
          text-shadow: 
            3px 3px 0px var(--banner-dark-red),
            -1px -1px 2px rgba(255, 255, 255, 0.2);
          transform-style: preserve-3d;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                      color 0.3s ease, 
                      text-shadow 0.3s ease;
          animation: drop-in 0.5s ease-out backwards;
          padding: 0 0.1em;
        }
        @media (max-width: 640px) {
            .logo-char { font-size: 3.5rem; }
        }

        .logo-space {
          width: 2rem;
        }
        @media (max-width: 640px) {
            .logo-space { width: 1rem; }
        }

        @keyframes drop-in {
          from {
            transform: translateY(-50px) rotateX(90deg);
            opacity: 0;
          }
          to {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }

        .logo-char:hover {
          transform: translateY(-10px) rotateX(-15deg) scale(1.1);
          color: #fff;
          text-shadow:
            0px 10px 15px rgba(0,0,0,0.5),
            0 0 5px var(--accent-green-light),
            0 0 10px var(--accent-green-light),
            0 0 20px var(--accent-green);
        }

        .logo-char::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          padding: 0 0.1em;
          color: var(--accent-green);
          opacity: 0;
          transition: opacity 0.3s ease;
          text-shadow: none;
          pointer-events: none;
        }

        .logo-char:hover::after {
          opacity: 1;
          animation: logo-glitch 0.3s steps(2, end) infinite;
        }

        @keyframes logo-glitch {
          0% {
            clip-path: inset(80% -6px 0 0);
            transform: translate(-4px, 2px);
          }
          100% {
            clip-path: inset(0 -6px 80% 0);
            transform: translate(4px, -2px);
          }
        }

        /* --- RUINED KING SUBTITLE --- */
        .ruined-text {
            position: relative;
            color: var(--accent-green);
            text-shadow: 2px 2px 0px rgba(0,0,0,0.7);
            filter: drop-shadow(0 0 10px var(--accent-green));
            user-select: none;
        }
        .ruined-text::before, .ruined-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background);
            overflow: hidden;
        }
        .ruined-text::before {
            left: -2px;
            text-shadow: 2px 0 var(--glitch-1);
            animation: glitch-anim-1 3s infinite linear alternate-reverse;
        }
        .ruined-text::after {
            left: 2px;
            text-shadow: -2px 0 var(--glitch-2);
            animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
        }
         /* The "corruption" layer */
        .ruined-text span {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: var(--banner-red);
            opacity: 0;
            text-shadow: 1px 1px 0px var(--banner-dark-red);
            animation: corruption-reveal 10s steps(1, end) infinite;
            animation-delay: 2s;
            overflow: hidden;
            white-space: nowrap;
        }

        @keyframes corruption-reveal {
            0%   { opacity: 0; clip-path: inset(0 100% 0 0); }
            5%   { opacity: 0.7; clip-path: inset(0 0 0 0); }
            10%  { opacity: 0.7; clip-path: inset(0 0 0 0); }
            15%  { opacity: 0; clip-path: inset(0 0 0 100%); }
            100% { opacity: 0; }
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(30% 0 70% 0); }
          25% { clip-path: inset(0% 0 100% 0); }
          50% { clip-path: inset(80% 0 5% 0); }
          75% { clip-path: inset(50% 0 30% 0); }
          100% { clip-path: inset(30% 0 70% 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(80% 0 5% 0); }
          25% { clip-path: inset(40% 0 30% 0); }
          50% { clip-path: inset(10% 0 85% 0); }
          75% { clip-path: inset(95% 0 0% 0); }
          100% { clip-path: inset(80% 0 5% 0); }
        }

        /* --- MENU BUTTONS --- */
        .menu-button-base {
          color: white;
          padding: 0.75rem 1rem;
          text-align: center;
          font-size: 1rem;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.1s ease-in-out;
          border: 2px solid #000;
          width: 100%;
        }
        .menu-button-primary {
          background-color: var(--accent-green);
          color: var(--button-gray-dark);
          box-shadow: inset 0 3px 0px rgba(255,255,255,0.4), 0 5px 0px var(--accent-green-dark);
        }
        .menu-button-primary:hover {
          background-color: var(--accent-green-light);
          box-shadow: inset 0 3px 0px rgba(255,255,255,0.6), 0 5px 0px var(--accent-green-dark), 0 0 15px 0 var(--accent-green);
        }
        .menu-button-primary:active {
          transform: translateY(4px);
          box-shadow: inset 0 3px 0px rgba(255,255,255,0.4), 0 1px 0px var(--accent-green-dark);
        }
        
        .menu-button-secondary {
          background-color: var(--button-gray);
          box-shadow: inset 0 3px 0px rgba(255,255,255,0.1), 0 5px 0px var(--button-gray-dark);
        }
        .menu-button-secondary:hover {
          background-color: var(--button-gray-light);
          box-shadow: inset 0 3px 0px rgba(255,255,255,0.2), 0 5px 0px var(--button-gray-dark), 0 0 15px 0 var(--button-gray-light);
        }
        .menu-button-secondary:active {
          transform: translateY(4px);
          box-shadow: inset 0 3px 0px rgba(255,255,255,0.1), 0 1px 0px var(--button-gray-dark);
        }

        @keyframes spin-slow {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
        
        /* --- CHARACTER SLOTS STYLES --- */
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .character-slots-container, .hall-of-fame-container {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .pixel-border {
            border: 2px solid var(--panel-border-dark);
            box-shadow: inset 0 0 0 2px var(--panel-border-light);
        }

        .pixel-border-deep {
            border: 2px solid var(--panel-border-dark);
            box-shadow: inset 0 0 0 2px var(--panel-bg);
        }
        
        .pixel-corners {
          position: relative;
        }
        .pixel-corners::before, .pixel-corners::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: var(--accent-green);
          border-style: solid;
          opacity: 0.5;
        }
        .pixel-corners::before { top: -2px; left: -2px; border-width: 2px 0 0 2px; }
        .pixel-corners::after { top: -2px; right: -2px; border-width: 2px 2px 0 0; }
        .pixel-corners .corner-bottom-left, .pixel-corners .corner-bottom-right {
           content: '';
           position: absolute;
           width: 12px;
           height: 12px;
           border-color: var(--accent-green);
           border-style: solid;
           opacity: 0.5;
        }
        .pixel-corners .corner-bottom-left { bottom: -2px; left: -2px; border-width: 0 0 2px 2px; }
        .pixel-corners .corner-bottom-right { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }

        .pixel-button {
            border: 2px solid var(--panel-border-dark);
            color: var(--text-light);
            text-transform: uppercase;
            cursor: pointer;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            transform: translateY(0);
        }

        .pixel-button-gray {
            background-color: var(--gray-btn);
            box-shadow: inset 0 2px 0 var(--gray-btn-light), 0 4px 0 0 var(--gray-btn-dark);
        }
        .pixel-button-gray:active {
            transform: translateY(2px);
            box-shadow: inset 0 2px 0 var(--gray-btn-light), 0 2px 0 0 var(--gray-btn-dark);
        }

        .pixel-button-green {
            background-color: var(--green-btn);
            box-shadow: inset 0 2px 0 #c1f977, 0 4px 0 0 var(--green-btn-dark);
        }
        .pixel-button-green:active {
            transform: translateY(2px);
            box-shadow: inset 0 2px 0 #c1f977, 0 2px 0 0 var(--green-btn-dark);
        }

        .pixel-button-gold {
            background-color: var(--gold-btn);
            box-shadow: inset 0 2px 0 #ffe494, 0 4px 0 0 var(--gold-btn-dark);
        }
         .pixel-button-gold:active {
            transform: translateY(2px);
            box-shadow: inset 0 2px 0 #ffe494, 0 2px 0 0 var(--gold-btn-dark);
        }

        /* --- CUSTOM SCROLLBAR --- */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: var(--panel-border-dark);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--slot-bg);
          border: 2px solid var(--panel-border-dark);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--panel-border-light);
        }

        /* --- Glitch/Static effect for locked slots --- */
        .static-corruption {
          overflow: hidden;
          position: relative;
        }
        .static-corruption::after {
            content: "";
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background-image: repeating-linear-gradient(transparent, rgba(255,255,255,0.05) 1px, transparent 2px),
                              repeating-linear-gradient(90deg, transparent, rgba(0,0,0,0.2) 1px, transparent 2px);
            animation: static-anim 0.8s infinite;
            opacity: 0.8;
        }
        @keyframes static-anim {
            0% { transform: translate(10px, -15px); }
            20% { transform: translate(-5px, 10px); }
            40% { transform: translate(12px, -3px); }
            60% { transform: translate(-8px, 8px); }
            80% { transform: translate(5px, -10px); }
            100% { transform: translate(10px, -15px); }
        }

        /* --- UPDATED CHARACTER HUB STYLES --- */
        .character-preview-sprite-wrapper {
            background: 
              radial-gradient(ellipse at bottom, rgba(101, 248, 115, 0.2), transparent 70%),
              linear-gradient(to top, rgba(10, 8, 12, 0.8) 0%, transparent 50%);
        }

        .character-preview-sprite-wrapper > div {
          animation: character-idle-preview 6s ease-in-out infinite;
          filter: drop-shadow(0 4px 15px rgba(101, 248, 115, 0.4));
        }

        @keyframes character-idle-preview {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.02); }
        }

        .pulse-notification {
          animation: pulse-red 2s infinite;
        }
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(216, 60, 60, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(216, 60, 60, 0); }
          100% { box-shadow: 0 0 0 0 rgba(216, 60, 60, 0); }
        }

      `}</style>
    </div>
  );
};

export default App;