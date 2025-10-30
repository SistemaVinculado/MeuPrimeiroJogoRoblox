import { SynergyChoice } from '../services/models';

export const SYNERGY_CHOICES_DATA: SynergyChoice[] = [
    { 
        id: 'manifest', 
        title: 'Manifest Treasure', 
        description: 'Your next slain Elite or Guardian is guaranteed to drop a Legendary or better item.'
    },
    { 
        id: 'infuse', 
        title: 'Infuse Boon', 
        description: 'Instantly attune yourself to the skill you\'ve used most frequently this run. Its Boon will now apply to your next three compatible item drops.'
    },
    { 
        id: 'vision', 
        title: 'Prophetic Vision', 
        description: 'Reveal the entire map for the next two floors and gain a massive temporary Luck buff.'
    },
];
