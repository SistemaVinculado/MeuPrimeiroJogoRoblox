import { GlobalEvent } from '../services/models';

export const GLOBAL_EVENTS_DATA: GlobalEvent[] = [
    {
        id: 'blood_moon',
        name: 'Blood Moon',
        description: 'The dungeon is more dangerous, but the rewards are greater. Enemies are tougher, but loot drop quality is increased.',
        duration: 300, // 5 minutes
        enemyStatModifier: 1.25, // 25% stronger enemies
        lootModifier: 1.25, // 25% higher quality loot
    },
    {
        id: 'merchants_festival',
        name: `Merchant's Festival`,
        description: 'A traveling merchant has arrived! The shop has a chance to stock special items for a limited time.',
        duration: 300, // 5 minutes
        shopModifier: 'special_stock',
    },
    {
        id: 'calm_skies',
        name: 'Calm Skies',
        description: 'A period of peace. No special events are active.',
        duration: 300, // 5 minutes
    }
];