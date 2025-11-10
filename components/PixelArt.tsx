import React from 'react';

export const PixelArtKnight = ({ isGhost = false }: { isGhost?: boolean }) => (
  <svg viewBox="0 0 20 20" className={`w-12 h-12 ${isGhost ? 'opacity-60 filter grayscale' : ''}`} shapeRendering="crispEdges">
    {/* Shadow */}
    <ellipse cx="10" cy="18" rx="5" ry="1" fill="rgba(0,0,0,0.4)" />

    {/* Feet */}
    <rect x="7" y="16" width="2" height="1" fill="#4a4a4a" />
    <rect x="11" y="16" width="2" height="1" fill="#4a4a4a" />

    {/* Legs */}
    <rect x="7" y="14" width="2" height="2" fill="#6b6b6b" />
    <rect x="11" y="14" width="2" height="2" fill="#6b6b6b" />

    {/* Sword */}
    <rect x="3" y="10" width="2" height="1" fill="#845c34" />
    <rect x="2" y="9" width="4" height="1" fill="#845c34" />
    <rect x="4" y="5" width="1" height="8" fill="#d0d0d0" />
    <rect x="4" y="4" width="1" height="1" fill="#ffffff" />
    
    {/* Body */}
    <rect x="7" y="9" width="6" height="5" fill="#7d7d7d" />
    <rect x="8" y="10" width="4" height="3" fill="#9e9e9e" />

    {/* Arms */}
    <rect x="6" y="9" width="1" height="4" fill="#6b6b6b" />
    <rect x="13" y="9" width="1" height="4" fill="#6b6b6b" />
    <rect x="5" y="10" width="1" height="2" fill="#4a4a4a" />
    <rect x="14" y="10" width="1" height="2" fill="#4a4a4a" />

    {/* Head / Helmet */}
    <rect x="7" y="4" width="6" height="5" fill="#7d7d7d" />
    <rect x="8" y="5" width="4" height="3" fill="#9e9e9e" />
    <rect x="9" y="6" width="2" height="2" fill="#1e1e1e" />
    
    {/* Plume */}
    <rect x="9" y="1" width="2" height="1" fill="#983B3B" />
    <rect x="10" y="2" width="2" height="1" fill="#d86868" />
    <rect x="11" y="3" width="1" height="2" fill="#983B3B" />
  </svg>
);

export const PixelArtKnightPortrait = ({ isGhost = false }: { isGhost?: boolean }) => (
  <svg viewBox="0 0 16 16" className={`w-16 h-16 ${isGhost ? 'opacity-60 filter grayscale' : ''}`} shapeRendering="crispEdges">
    {/* Background */}
    <rect x="0" y="0" width="16" height="16" fill="#2a2a2a"/>
    <rect x="1" y="1" width="14" height="14" fill="#3c3c3c"/>
    {/* Head / Helmet */}
    <rect x="5" y="4" width="6" height="5" fill="#7d7d7d" />
    <rect x="6" y="5" width="4" height="3" fill="#9e9e9e" />
    <rect x="7" y="6" width="2" height="2" fill="#1e1e1e" />
    {/* Plume */}
    <rect x="7" y="1" width="2" height="1" fill="#983B3B" />
    <rect x="8" y="2" width="2" height="1" fill="#d86868" />
    <rect x="9"y="3" width="1" height="2" fill="#983B3B" />
    {/* Gorget */}
    <rect x="5" y="9" width="6" height="2" fill="#6b6b6b" />
  </svg>
);

export const PixelArtArcaneWeaver = () => (
    <svg viewBox="0 0 20 20" className="w-12 h-12" shapeRendering="crispEdges">
        {/* Shadow */}
        <ellipse cx="10" cy="18" rx="5" ry="1" fill="rgba(0,0,0,0.4)" />
        {/* Staff */}
        <rect x="4" y="2" width="1" height="15" fill="#6b4f3a" />
        <rect x="3" y="1" width="3" height="1" fill="#4a0072" />
        <rect x="4" y="2" width="1" height="1" fill="#a142f4" />
        
        {/* Robes */}
        <rect x="7" y="16" width="6" height="1" fill="#3a0052" />
        <rect x="7" y="9" width="6" height="7" fill="#4a0072" />
        <rect x="8" y="10" width="4" height="5" fill="#5a0092" />
        
        {/* Arms */}
        <rect x="6" y="9" width="1" height="4" fill="#3a0052" />
        <rect x="13" y="9" width="1" height="4" fill="#3a0052" />
        
        {/* Head / Hood */}
        <rect x="7" y="4" width="6" height="5" fill="#4a0072" />
        <rect x="8" y="5" width="4" height="4" fill="#1e1e1e" />
        <rect x="9" y="6" width="2" height="2" fill="#a142f4" />
    </svg>
);

export const PixelArtArcaneWeaverPortrait = () => (
    <svg viewBox="0 0 16 16" className="w-16 h-16" shapeRendering="crispEdges">
        {/* Background */}
        <rect x="0" y="0" width="16" height="16" fill="#2a2a2a"/>
        <rect x="1" y="1" width="14" height="14" fill="#3c3c3c"/>
        {/* Hood */}
        <rect x="5" y="4" width="6" height="5" fill="#4a0072" />
        <rect x="6" y="5" width="4" height="4" fill="#1e1e1e" />
        <rect x="7" y="6" width="2" height="2" fill="#a142f4" />
        {/* Shoulders */}
        <rect x="4" y="9" width="8" height="2" fill="#3a0052" />
    </svg>
);

export const PixelArtShadowRanger = () => (
    <svg viewBox="0 0 20 20" className="w-12 h-12" shapeRendering="crispEdges">
        {/* Shadow */}
        <ellipse cx="10" cy="18" rx="5" ry="1" fill="rgba(0,0,0,0.4)" />
        
        {/* Bow */}
        <path d="M 14 3 L 14 8 C 14 8 10 10 14 12 L 14 17 L 13 17 L 13 13 C 13 13 10 11 13 8 L 13 3 Z" fill="#4a3a2a" />
        <rect x="14" y="9" width="1" height="2" fill="#6b4f3a" />
        
        {/* Body */}
        <rect x="7" y="16" width="2" height="1" fill="#1e1e1e" />
        <rect x="11" y="16" width="2" height="1" fill="#1e1e1e" />
        <rect x="7" y="9" width="6" height="7" fill="#2a2a2a" />
        <rect x="8" y="10" width="4" height="5" fill="#3a3a3a" />
        
        {/* Arms */}
        <rect x="6" y="9" width="1" height="4" fill="#2a2a2a" />
        <rect x="13" y="9" width="4" height="1" fill="#2a2a2a" />
        <rect x="13" y="12" width="1" height="2" fill="#2a2a2a" />
        
        {/* Head / Hood */}
        <rect x="7" y="4" width="6" height="5" fill="#1e1e1e" />
        <rect x="8" y="5" width="4" height="4" fill="#0a0a0a" />
        <rect x="9" y="6" width="2" height="2" fill="#65F873" />
        
        {/* Cape */}
        <path d="M 7 5 L 4 7 L 5 14 L 7 13 Z" fill="#1e1e1e" />
    </svg>
);

export const PixelArtShadowRangerPortrait = () => (
    <svg viewBox="0 0 16 16" className="w-16 h-16" shapeRendering="crispEdges">
        {/* Background */}
        <rect x="0" y="0" width="16" height="16" fill="#2a2a2a"/>
        <rect x="1" y="1" width="14" height="14" fill="#3c3c3c"/>
        {/* Hood */}
        <rect x="5" y="4" width="6" height="5" fill="#1e1e1e" />
        <rect x="6" y="5" width="4" height="4" fill="#0a0a0a" />
        <rect x="7" y="6" width="2" height="2" fill="#65F873" />
        {/* Shoulders / Cape */}
        <rect x="4" y="9" width="8" height="2" fill="#2a2a2a" />
        <path d="M 4 5 L 2 6 L 3 11 L 4 10 Z" fill="#1e1e1e" />
    </svg>
);