import React, { useState } from 'react';
import Cemetery from './Cemetery';
import DailyRewards from './DailyRewards';
import News from './News';
import { PixelArtKnight, PixelArtKnightPortrait, PixelArtArcaneWeaver, PixelArtShadowRanger, PixelArtArcaneWeaverPortrait, PixelArtShadowRangerPortrait } from './PixelArt';

// --- Reusable Icon Components ---
const Icon = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" shapeRendering="crispEdges">
        {children}
    </svg>
);

const TrashIcon = () => <Icon className="w-6 h-6"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></Icon>;
const LockIcon = () => <Icon className="w-8 h-8 opacity-75"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></Icon>;
const AccountIcon = () => <Icon className="w-8 h-8"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></Icon>;
const RewardsIcon = () => <Icon className="w-8 h-8"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .35.07.69.18 1H10V4h4V2H6v2h4v2H3c-1.11 0-1.99.89-1.99 2L1 19c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM3 8h18v11H3V8z"/></Icon>;
const NewsIcon = () => (
    <div className="relative">
        <Icon className="w-8 h-8"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9-2-2V4c0-1.1-.9-2-2-2zm-2 10H10v-2h8v2zm-4-4H10V6h4v2z"/></Icon>
        <div className="absolute top-[-4px] right-[-4px] w-5 h-5 bg-[#d83c3c] border-2 border-[var(--panel-border-dark)] flex items-center justify-center text-white text-sm font-bold pulse-notification">!</div>
    </div>
);
const CoinIcon = () => <Icon className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.87 3.14c.48.23 1.36.46 2.45.46 2.01 0 3.42-.86 3.42-2.34 0-.91-.77-1.65-2.01-1.89l.21-1.28H12.9l-.2 1.25c-.2 0-.39-.01-.59-.01-2.01 0-3.42.86-3.42 2.34 0 1.15 1.05 1.89 2.45 2.2V9.9c-1.67-.37-2.82-1.29-2.82-2.73 0-1.26 1.02-2.2 2.53-2.43l.2-1.24h-1.3l-.21 1.28c.19.01.39.02.58.02 1.62 0 2.82-.73 2.82-2.2 0-.99-.8-1.72-2.02-1.95v-1.23h-1.3v1.23c-.48-.23-1.36-.46-2.45-.46-2.01 0-3.42.86-3.42 2.34 0 .91.77 1.65 2.01 1.89l-.21 1.28h1.3l.2-1.25c.2 0 .39.01.59.01 2.01 0 3.42.86 3.42 2.34 0 1.15-1.05 1.89-2.45 2.2V14.1c1.67.37 2.82 1.29 2.82 2.73 0 1.26-1.02 2.2-2.53-2.43l-.2 1.24h-1.3l.21-1.28c-.19-.01-.39-.02-.58-.02-1.62 0-2.82-.73-2.82-2.2 0-.99-.8-1.72 2.02-1.95v1.23h1.3v-1.23z" /></Icon>;
const KIcon = () => <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold k-icon"><div style={{transform: 'translateY(-2px)'}}>K</div></div>;
const HelpIcon = () => <div className="w-10 h-10 bg-[var(--slot-bg)] pixel-border-deep flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:bg-[var(--panel-border-light)]"><div style={{transform: 'translateY(-2px)'}}>?</div></div>;
const CalendarIcon = () => <Icon className="w-6 h-6"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></Icon>;


// --- Shared Sub-Components ---

const StatBar = ({ label, value }: { label: string, value: number }) => (
    <div>
        <div className="flex justify-between text-xs text-gray-300">
            <span>{label}</span>
            <span>{value}/100</span>
        </div>
        <div className="h-2 bg-black/50 pixel-border-deep mt-1">
            <div className="h-full bg-[var(--accent-green)]" style={{ width: `${value}%`, boxShadow: 'inset 0 1px 0 #c1f977' }}></div>
        </div>
    </div>
);

const SidebarButton = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
    <div onClick={onClick} className={`w-full flex flex-col items-center p-2 cursor-pointer relative ${active ? 'bg-black/30' : 'hover:bg-black/20 transition-colors'}`}>
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-green)]"></div>}
        {icon}
        <span className="hidden md:block text-xs mt-1 text-center">{label}</span>
    </div>
);

const TabButton = ({ label, active = false, onClick }: { label: string, active?: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm uppercase transition-colors ${active ? 'bg-[var(--panel-bg)] text-white' : 'bg-[var(--panel-border-dark)] text-gray-400 hover:bg-[var(--panel-bg)]'}`}>
        {label}
    </button>
);

// --- Character Creation Data ---
const classes = {
    ruin_knight: {
        name: 'Ruin Knight',
        description: 'Um mestre do combate corpo a corpo, combinando força bruta com uma defesa impenetrável.',
        art: <PixelArtKnight />,
        stats: { str: 85, agi: 60, int: 45 },
    },
    arcane_weaver: {
        name: 'Arcane Weaver',
        description: 'Manipula as energias arcanas para dizimar inimigos à distância com feitiços poderosos.',
        art: <PixelArtArcaneWeaver />,
        stats: { str: 40, agi: 55, int: 90 },
    },
    shadow_ranger: {
        name: 'Shadow Ranger',
        description: 'Um predador silencioso que ataca das sombras com precisão mortal e agilidade inigualável.',
        art: <PixelArtShadowRanger />,
        stats: { str: 60, agi: 95, int: 35 },
    },
};
type ClassKey = keyof typeof classes;

// Type Definitions for Slots
type Character = {
    id: number;
    status: 'active';
    name: string;
    level: number;
    className: string;
    classKey: ClassKey;
    bio: string;
    stats: { str: number; agi: number; int: number };
    time: string;
};

type EmptySlot = {
    id: number;
    status: 'empty';
};

type UnlockableSlot = {
    id: number;
    status: 'unlockable';
    price: number;
};

type LockedSlot = {
    id: number;
    status: 'locked';
};

type Slot = Character | EmptySlot | UnlockableSlot | LockedSlot;

const CLASS_ART = {
    ruin_knight: <PixelArtKnight />,
    arcane_weaver: <PixelArtArcaneWeaver />,
    shadow_ranger: <PixelArtShadowRanger />,
};

const CLASS_PORTRAIT_ART = {
    ruin_knight: <PixelArtKnightPortrait />,
    arcane_weaver: <PixelArtArcaneWeaverPortrait />,
    shadow_ranger: <PixelArtShadowRangerPortrait />,
};

const CharacterSlot = ({ data, selected, onSelect, onCreateClick }: { data: Slot, selected: boolean, onSelect: () => void, onCreateClick?: () => void }) => {
    const commonClasses = `w-full transition-all duration-200 pixel-border-deep flex items-center p-2 space-x-4 h-24 ${selected ? 'bg-[var(--panel-border-light)]' : 'bg-[var(--slot-bg)]'}`;

    if (data.status === 'active') {
        return (
            <div onClick={onSelect} className={`${commonClasses} cursor-pointer hover:bg-[var(--panel-border-light)] relative group`}>
                {data.classKey ? CLASS_PORTRAIT_ART[data.classKey] : <div className="w-16 h-16 bg-black"></div>}
                <div className="text-left">
                    <p className="text-lg text-white">{data.name}</p>
                    <p className="text-sm text-gray-400">Level {data.level} {data.className}</p>
                </div>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-white z-10 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrashIcon />
                </button>
            </div>
        );
    }
    if (data.status === 'empty') {
        return (
            <div onClick={onCreateClick} className={`${commonClasses} cursor-pointer hover:bg-[var(--panel-border-light)]`}>
                <div className="w-16 h-16 bg-[var(--panel-bg)] flex items-center justify-center text-5xl text-gray-400 font-thin">+</div>
                <div className="text-left">
                    <p className="text-lg text-white">Criar Personagem</p>
                    <p className="text-sm text-gray-400">Slot Vazio</p>
                </div>
            </div>
        );
    }
    if (data.status === 'unlockable') {
        return (
            <div className={`${commonClasses} relative static-corruption items-center justify-center text-center`}>
                <LockIcon />
                <button className="absolute right-6 pixel-button pixel-button-gold flex items-center space-x-2 px-4 py-2 text-sm z-10">
                    <CoinIcon />
                    <span>{data.price}</span>
                </button>
            </div>
        );
    }
    // Locked
    return (
        <div className={`${commonClasses} static-corruption items-center justify-center text-center`}>
            <LockIcon />
            <p className="ml-4 text-lg text-gray-500">Bloqueado</p>
        </div>
    );
};


// --- Character Creation Component ---
const ClassSelectionCard = ({ classKey, data, onSelect, isSelected }: { classKey: ClassKey, data: any, onSelect: (key: ClassKey) => void, isSelected: boolean }) => (
    <div 
        className={`bg-[var(--slot-bg)] pixel-border-deep p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${isSelected ? '' : 'hover:bg-[var(--panel-border-light)]'}`}
        style={{ border: isSelected ? '2px solid var(--accent-green)' : '2px solid var(--panel-border-dark)', boxShadow: isSelected ? '0 0 15px var(--accent-green)' : 'none'}}
        onClick={() => onSelect(classKey)}
    >
        <div className="scale-[2] origin-bottom mb-4 h-24 flex items-end justify-center">{data.art}</div>
        <h3 className="text-lg text-white mb-2">{data.name}</h3>
        <p className="text-xs text-gray-400 flex-grow">{data.description}</p>
    </div>
);

const CharacterCreation = ({ onBack, onConfirm }: { onBack: () => void, onConfirm: (name: string, classKey: ClassKey) => void }) => {
    const [name, setName] = useState('');
    const [selectedClass, setSelectedClass] = useState<ClassKey | null>(null);

    const canConfirm = name.trim() !== '' && selectedClass !== null;

    const handleConfirm = () => {
        if (canConfirm) {
            onConfirm(name, selectedClass!);
        }
    };

    return (
        <div className="w-full h-full bg-[var(--panel-bg)] pixel-border pixel-corners p-6 flex flex-col">
            <span className="corner-bottom-left"></span>
            <span className="corner-bottom-right"></span>

            <h2 className="text-3xl text-center mb-6 text-accent-green" style={{ filter: 'drop-shadow(0 0 8px var(--accent-green))'}}>Criação de Personagem</h2>

            {/* Main content area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 overflow-y-auto pr-4">
                {/* Left Panel: Name and Class selection */}
                <div className="flex flex-col">
                    <label className="text-gray-400 mb-2 uppercase text-sm">Nome do Personagem</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={16}
                        className="bg-[var(--panel-border-dark)] pixel-border-deep p-3 text-lg text-white mb-6 focus:outline-none focus:border-accent-green"
                        style={{ border: '2px solid var(--panel-border-dark)' }}
                        placeholder="Digite um nome..."
                    />

                    <label className="text-gray-400 mb-2 uppercase text-sm">Selecione uma Classe</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {(Object.keys(classes) as ClassKey[]).map((key) => (
                            <ClassSelectionCard 
                                key={key}
                                classKey={key}
                                data={classes[key]}
                                onSelect={setSelectedClass}
                                isSelected={selectedClass === key}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Panel: Stats and Preview */}
                <div className="bg-[var(--panel-border-dark)] pixel-border-deep p-4">
                    <h3 className="text-xl text-white mb-4 text-center">Atributos Base</h3>
                    {selectedClass ? (
                         <div className="space-y-4">
                            <StatBar label="Força" value={classes[selectedClass].stats.str} />
                            <StatBar label="Agilidade" value={classes[selectedClass].stats.agi} />
                            <StatBar label="Inteligência" value={classes[selectedClass].stats.int} />
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-center p-4">
                            <p>Selecione uma classe para ver os atributos.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer buttons */}
            <footer className="flex justify-between items-center mt-6 space-x-3">
                <button onClick={onBack} className="pixel-button pixel-button-gray w-1/3 py-3 text-lg">
                    Voltar
                </button>
                <button 
                    onClick={handleConfirm}
                    className={`pixel-button ${canConfirm ? 'pixel-button-green' : 'pixel-button-gray opacity-50 cursor-not-allowed'} w-2/3 py-3 text-lg`} 
                    disabled={!canConfirm}>
                    Confirmar
                </button>
            </footer>
        </div>
    );
};


// --- Main CharacterSlots Component ---

const initialSlots: Slot[] = [
    { id: 1, status: 'empty' },
    { id: 2, status: 'empty' },
    { id: 3, status: 'unlockable', price: 300 },
    { id: 4, status: 'locked' },
];

const CharacterSlots = ({ onClose }: { onClose: () => void }) => {
    const [activeScreen, setActiveScreen] = useState('characters');
    const [slotsData, setSlotsData] = useState<Slot[]>(initialSlots);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState('slots');
    const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);
    
    const selectedCharacter = slotsData.find(s => s.id === selectedSlotId && s.status === 'active') as Character | undefined;

    const handleCharacterCreation = (name: string, classKey: ClassKey) => {
        const firstEmptySlotIndex = slotsData.findIndex(slot => slot.status === 'empty');
        if (firstEmptySlotIndex === -1) {
            console.error("No empty slots available!");
            // TODO: Show an error message to the user
            return;
        }

        const classData = classes[classKey];
        const newCharacter: Character = {
            id: slotsData[firstEmptySlotIndex].id,
            name: name,
            level: 1,
            className: classData.name,
            classKey: classKey,
            status: 'active',
            bio: classData.description,
            stats: classData.stats,
            time: '0d 0h 0m',
        };

        const updatedSlots = [...slotsData];
        updatedSlots[firstEmptySlotIndex] = newCharacter;
        
        setSlotsData(updatedSlots);
        setSelectedSlotId(newCharacter.id);
        setIsCreatingCharacter(false);
    };

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'slots':
                return (
                    <div className="flex flex-col space-y-3">
                       {slotsData.map(slot => (
                           <CharacterSlot 
                               key={slot.id} 
                               data={slot}
                               selected={selectedSlotId === slot.id}
                               onSelect={() => slot.status === 'active' && setSelectedSlotId(slot.id)}
                               onCreateClick={slot.status === 'empty' ? () => setIsCreatingCharacter(true) : undefined}
                            />
                       ))}
                    </div>
                );
            case 'cemetery':
                return <Cemetery />;
            case 'stats':
                 return <div className="flex items-center justify-center h-full text-gray-400"><p>Estatísticas em breve...</p></div>;
            case 'journal':
                 return <div className="flex items-center justify-center h-full text-gray-400"><p>Jornal em breve...</p></div>;
            default:
                return null;
        }
    };

    const headerTitle: {[key: string]: string} = {
        characters: 'Seleção de Personagem',
        rewards: 'Recompensas Diárias',
        news: 'Notícias'
    };

    const subHeaderText: {[key:string]: string} = {
        characters: 'pix-22490',
        news: 'e-22490',
    };

    return (
        <div className="w-full h-full flex flex-col text-white font-pixel p-2 md:p-4 character-slots-container z-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-2 px-2">
                <div className="flex items-center space-x-2 text-sm">
                    <h1 className="text-lg md:text-xl">{headerTitle[activeScreen]}</h1>
                    {subHeaderText[activeScreen] && <span className="text-gray-400 text-xs">{subHeaderText[activeScreen]}</span>}
                </div>
                <div className="flex items-center space-x-2">
                    <HelpIcon />
                    {activeScreen === 'rewards' && <div className="w-10 h-10 bg-[var(--slot-bg)] pixel-border-deep flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:bg-[var(--panel-border-light)]"><CalendarIcon/></div>}
                    <KIcon />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex min-h-0">
                    {activeScreen === 'characters' ? (
                        isCreatingCharacter ? (
                            <CharacterCreation 
                                onBack={() => setIsCreatingCharacter(false)}
                                onConfirm={handleCharacterCreation}
                            />
                        ) : (
                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
                                <aside className="flex flex-col">
                                   <div className="flex-1 bg-[var(--panel-bg)] pixel-border pixel-corners flex flex-col p-4">
                                        <span className="corner-bottom-left"></span>
                                        <span className="corner-bottom-right"></span>
                                        {selectedCharacter ? (
                                            <>
                                                <div className="character-preview-sprite-wrapper flex-grow flex items-center justify-center">
                                                    <div className="scale-[2] origin-bottom">
                                                        {CLASS_ART[selectedCharacter.classKey]}
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex-shrink-0">
                                                    <h2 className="text-2xl text-white">{selectedCharacter.name}</h2>
                                                    <p className="text-md text-gray-300 mb-4">Level {selectedCharacter.level} {selectedCharacter.className}</p>
                                                    <p className="text-sm text-gray-400 leading-relaxed mb-6 h-20">{selectedCharacter.bio}</p>
                                                    <div className="space-y-3">
                                                        <StatBar label="Força" value={selectedCharacter.stats.str} />
                                                        <StatBar label="Agilidade" value={selectedCharacter.stats.agi} />
                                                        <StatBar label="Inteligência" value={selectedCharacter.stats.int} />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-500 text-center p-4">
                                                <p>Selecione um personagem ou crie um novo para começar.</p>
                                            </div>
                                        )}
                                   </div>
                                </aside>

                                <main className="flex-1 flex flex-col">
                                    {/* Tabs */}
                                    <div className="flex">
                                        <TabButton label="Slots" active={activeTab === 'slots'} onClick={() => setActiveTab('slots')} />
                                        <TabButton label="Cemitério" active={activeTab === 'cemetery'} onClick={() => setActiveTab('cemetery')} />
                                        <TabButton label="Estatísticas" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
                                        <TabButton label="Jornal" active={activeTab === 'journal'} onClick={() => setActiveTab('journal')} />
                                    </div>
                                    
                                    <div className={`flex-1 p-6 pixel-border ${activeTab === 'slots' ? 'bg-[var(--panel-bg)]' : 'bg-[#1e1e1e]'}`}>
                                       {renderActiveTabContent()}
                                    </div>

                                    <footer className="flex justify-between items-center mt-3 space-x-3">
                                        <button onClick={onClose} className="pixel-button pixel-button-gray w-1/3 py-3 text-lg">
                                           Menu
                                        </button>
                                        <button className={`pixel-button ${selectedCharacter ? 'pixel-button-green' : 'pixel-button-gray opacity-50 cursor-not-allowed'} w-2/3 py-3 text-lg`} disabled={!selectedCharacter}>
                                           Jogar
                                        </button>
                                    </footer>
                                </main>
                            </div>
                        )
                    ) : (
                        <main className="flex-1 flex flex-col">
                           {activeScreen === 'rewards' ? <DailyRewards /> : <News />}
                        </main>
                    )}
                </div>

                <aside className="w-16 md:w-28 bg-[var(--panel-border-dark)] flex flex-col items-center space-y-2 py-2 ml-2 md:ml-4">
                   <SidebarButton icon={<AccountIcon />} label="Conta" active={activeScreen === 'characters'} onClick={() => setActiveScreen('characters')} />
                   <SidebarButton icon={<RewardsIcon />} label="Recompensas Diárias" active={activeScreen === 'rewards'} onClick={() => setActiveScreen('rewards')} />
                   <SidebarButton icon={<NewsIcon />} label="Notícias" onClick={() => setActiveScreen('news')} />
                </aside>
            </div>
        </div>
    );
};

export default CharacterSlots;