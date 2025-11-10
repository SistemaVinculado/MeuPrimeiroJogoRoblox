import React from 'react';
import { PixelArtKnight } from './PixelArt';

const ValorIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" shapeRendering="crispEdges">
        <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#fef3c7', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#fcae12', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        {/* Skull */}
        <rect x="8" y="7" width="8" height="2" fill="#e0e0e0" />
        <rect x="7" y="9" width="10" height="7" fill="#e0e0e0" />
        <rect x="9" y="12" width="2" height="2" fill="#1e1e1e" />
        <rect x="13" y="12" width="2" height="2" fill="#1e1e1e" />
        <rect x="11" y="14" width="2" height="1" fill="#1e1e1e" />
        {/* Wings */}
        <path d="M 7 9 L 2 7 L 2 11 L 5 12 L 7 11 Z" fill="url(#gold-gradient)" stroke="#d1a12a" strokeWidth="1" />
        <path d="M 17 9 L 22 7 L 22 11 L 19 12 L 17 11 Z" fill="url(#gold-gradient)" stroke="#d1a12a" strokeWidth="1" />
    </svg>
);


const cemeteryData = [
    { id: 1, enemy: 'Green Slime', timeAgo: '16 hours ago', level: 41, valor: 687 },
    { id: 2, enemy: 'Pirate Captain', timeAgo: '3 days ago', level: 2, valor: 26 },
];

const DeathRecord = ({ data }: { data: typeof cemeteryData[0] }) => {
    return (
        <div className="bg-[#2d2d2d] p-3 relative" style={{ borderTop: '2px solid #4a4a4a', borderLeft: '2px solid #4a4a4a', borderBottom: '2px solid #1e1e1e', borderRight: '2px solid #1e1e1e' }}>
             <div className="absolute top-2 left-2">
                <PixelArtKnight isGhost={true} />
             </div>
            <div className="ml-16">
                <h3 className="text-md font-bold mb-3 text-white">Você morreu para {data.enemy}</h3>
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-400 mb-2">{data.timeAgo} • Level {data.level}</p>
                    <div className="flex items-center space-x-2">
                       <ValorIcon />
                       <span className="text-lg font-bold text-white">+{data.valor} Valor</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Cemetery = () => {
    return (
        <div className="w-full h-full flex flex-col space-y-4 overflow-y-auto pr-2">
            {cemeteryData.map(record => (
                <DeathRecord key={record.id} data={record} />
            ))}
        </div>
    );
};

export default Cemetery;