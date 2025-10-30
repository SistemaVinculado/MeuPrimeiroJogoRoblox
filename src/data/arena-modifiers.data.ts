export interface ArenaModifier {
    id: string;
    name: string;
    description: string;
}

export const ARENA_MODIFIERS: ArenaModifier[] = [
    { id: 'bloodlust', name: 'Bloodlust Week', description: 'All basic attacks in the Arena have 10% Lifesteal.' },
    { id: 'arcane_surge', name: 'Arcane Surge', description: 'All Mage skills in the Arena cost 20% less Energy.' },
    { id: 'ironclad', name: 'Ironclad Resolve', description: 'All Warriors start Arena combat with a 2-turn Defense buff.' },
    { id: 'sudden_death', name: 'Sudden Death', description: 'After 10 turns, all healing in the Arena is reduced by 50%.' }
];