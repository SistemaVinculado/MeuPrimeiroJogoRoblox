import React, { useState } from 'react';

const KIcon = () => (
    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold k-icon"
         style={{boxShadow: '0 0 15px 3px rgba(147, 51, 234, 0.6)'}}>
        K
    </div>
);

const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="w-10 h-10 bg-[#a23636] flex items-center justify-center cursor-pointer" style={{
        borderTop: '3px solid #d86868',
        borderLeft: '3px solid #d86868',
        borderBottom: '3px solid #5a1818',
        borderRight: '3px solid #5a1818',
    }}>
        <span className="text-white text-4xl" style={{ transform: 'translateY(-3px)' }}>×</span>
    </button>
);


const HallOfFame = ({ onClose }: { onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState('all-time');
    const tabs = [
        { id: 'all-time', label: 'Todo Tempo' },
        { id: 'monthly', label: 'Mensal' },
        { id: 'weekly', label: 'Semanal' },
        { id: 'live', label: 'Viver' },
    ];

    const Tab = ({ label, id }: { label: string, id: string }) => {
        const isActive = activeTab === id;
        return (
            <div className="flex-1">
                <button 
                    onClick={() => setActiveTab(id)}
                    className={`w-full py-3 text-center uppercase text-sm tracking-wider relative ${isActive ? 'bg-[#2a2a2a] text-white' : 'bg-transparent text-gray-400 hover:bg-[#232527]'}`}
                >
                    {isActive && <div className="absolute top-0 left-0 right-0 h-[3px] bg-white"></div>}
                    {label}
                    {isActive && (
                         <div className="absolute -bottom-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#4a4a4a]"></div>
                    )}
                </button>
            </div>
        )
    }

    return (
        <div className="absolute inset-0 bg-[#313131] text-white font-pixel z-50 flex flex-col hall-of-fame-container">
            {/* Header */}
            <header className="bg-[#1e1e1e] flex justify-between items-center p-2">
                <div className="w-[5.5rem]" /> {/* Spacer to balance the right icons */}
                <h1 className="text-2xl">Salão da Glória</h1>
                <div className="flex items-center space-x-2">
                    <KIcon />
                    <CloseButton onClick={onClose} />
                </div>
            </header>

            {/* Tabs */}
            <nav className="bg-[#1e1e1e] flex border-b-2 border-t-2 border-black">
                {tabs.map(tab => (
                    <Tab key={tab.id} label={tab.label} id={tab.id} />
                ))}
            </nav>

             {/* Table Header */}
            <div className="bg-[#4a4a4a] flex px-4 py-2 mt-4 text-gray-300 text-sm">
                <div className="w-16">#</div>
                <div className="flex-1">Nome</div>
                <div className="w-24 md:w-36 lg:w-48">Valor em morte</div>
                <div className="w-24 md:w-36 lg:w-48">Equipamento</div>
            </div>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-lg">O Salão da Fama está atualmente desativado.</p>
            </main>
        </div>
    );
};

export default HallOfFame;