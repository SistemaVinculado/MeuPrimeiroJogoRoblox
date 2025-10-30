import { AppearanceItem } from '../services/models';

export const DEFAULT_APPEARANCES: { [key: string]: AppearanceItem } = {
  player: { id: 'default', abbreviatedName: 'P', name: 'Default', description: '', price: 0, type: 'player', visuals: { bgColor: 'bg-blue-500', textColor: 'text-white' } },
  weapon: { id: 'default', abbreviatedName: '', name: 'Default', description: '', price: 0, type: 'weapon', visuals: { bgColor: 'bg-transparent', textColor: 'text-transparent' } },
  shield: { id: 'default', abbreviatedName: '', name: 'Default', description: '', price: 0, type: 'shield', visuals: { bgColor: 'bg-transparent', textColor: 'text-transparent' } },
};

export const APPEARANCE_SHOP_ITEMS: AppearanceItem[] = [
    { id: 'knt', abbreviatedName: 'Knt', name: 'Knight', description: 'A valiant warrior in shining armor.', price: 150, type: 'player', visuals: { bgColor: 'bg-slate-400', textColor: 'text-slate-800' } },
    { id: 'mge', abbreviatedName: 'Mge', name: 'Mage', description: 'A wise sorcerer wielding potent magics.', price: 150, type: 'player', visuals: { bgColor: 'bg-blue-600', textColor: 'text-cyan-200' } },
    { id: 'ghst', abbreviatedName: 'Ghst', name: 'Ghost', description: 'A spooky, ethereal presence.', price: 250, type: 'player', visuals: { bgColor: 'bg-white/50', textColor: 'text-black', shadow: 'shadow-[0_0_8px_theme(colors.white)]' } },
    { id: 'robo', abbreviatedName: 'Robo', name: 'Robot', description: 'A futuristic combat automaton.', price: 400, type: 'player', visuals: { bgColor: 'bg-gray-600', textColor: 'text-cyan-400' } },
    { id: 'drgn', abbreviatedName: 'Drgn', name: 'Dragon', description: 'Embody the might of a fearsome beast.', price: 800, type: 'player', visuals: { bgColor: 'bg-red-700', textColor: 'text-yellow-400' } },
    { id: 'flam', abbreviatedName: 'Swd', name: 'Flame Sword', description: 'A blade wreathed in eternal fire.', price: 500, type: 'weapon', visuals: { bgColor: 'bg-orange-500', textColor: 'text-red-900', shadow: 'shadow-[0_0_10px_theme(colors.orange.400)]' } },
    { id: 'frst', abbreviatedName: 'Axe', name: 'Frost Axe', description: 'An axe so cold it freezes the air.', price: 500, type: 'weapon', visuals: { bgColor: 'bg-cyan-300', textColor: 'text-cyan-800', shadow: 'shadow-[0_0_10px_theme(colors.cyan.200)]' } },
    { id: 'volt', abbreviatedName: 'Shd', name: 'Lightning Bolt', description: 'Harness the power of a raging storm.', price: 500, type: 'shield', visuals: { bgColor: 'bg-yellow-400', textColor: 'text-yellow-800', shadow: 'shadow-[0_0_10px_theme(colors.yellow.300)]' } },
];