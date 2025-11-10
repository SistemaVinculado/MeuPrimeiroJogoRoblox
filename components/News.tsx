import React from 'react';

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

const THIcon = () => (
    <div className="w-6 h-6 bg-gray-800 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-gray-700 font-sans">
        TH
    </div>
);

const News = () => {
    return (
        <div className="w-full h-full flex flex-col bg-black">
             {/* News Header */}
             <header className="flex items-center justify-between p-2 bg-black">
                <div className="flex items-center space-x-3">
                    <ExternalLinkIcon />
                    <h2 className="text-md font-bold tracking-wider text-white font-sans uppercase">MID-WEEK PATCH: New Legendaries & Fixes</h2>
                </div>
                <THIcon />
            </header>

            {/* News Body */}
            <div className="flex-grow bg-[var(--panel-border-dark)] relative flex items-center justify-center overflow-hidden">
                {/* Static, neutral pixel art background */}
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(var(--slot-bg) 1px, transparent 1px)',
                        backgroundSize: '4px 4px',
                        opacity: 0.2
                    }}
                ></div>

                <h1 className="text-6xl md:text-8xl font-bold text-white z-20" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>
                    PATCH NOTES
                </h1>

                {/* Red notification icon */}
                <div className="absolute bottom-2 left-2 w-5 h-5 bg-[#d83c3c] border-2 border-black flex items-center justify-center text-white text-md font-bold z-20">!</div>
            </div>
        </div>
    );
};

export default News;