import { AltarChoice } from '../services/models';
import { CONSUMABLES } from './items.data';

export const ALTAR_CHOICES_DATA: AltarChoice[] = [
    {
        title: 'Boon of Strength',
        description: 'Your Attack is permanently increased by 5 for this run.',
        effects: [{ type: 'stat_buff', stat: 'attack', valueType: 'flat', value: 5 }]
    },
    {
        title: 'Boon of Vigor',
        description: 'Your Max HP is permanently increased by 20 for this run.',
        effects: [{ type: 'stat_buff', stat: 'maxHp', valueType: 'flat', value: 20 }]
    },
    {
        title: 'Boon of Resilience',
        description: 'Your Defense is permanently increased by 5 for this run.',
        effects: [{ type: 'stat_buff', stat: 'defense', valueType: 'flat', value: 5 }]
    },
    {
        title: 'Gift of Fortune',
        description: 'The altar bestows a pouch of 150 gold upon you.',
        effects: [{ type: 'give_gold', value: 150 }]
    },
    {
        title: 'Fountain of Restoration',
        description: 'The altar\'s magic heals you for 30% of your max health.',
        effects: [{ type: 'heal', value: 30 }]
    },
    {
        title: 'Sacrifice for Power',
        description: 'Sacrifice 15% of your current max HP to gain 10 Attack for this run.',
        effects: [
            { type: 'stat_debuff', stat: 'maxHp', valueType: 'percent', value: -15 },
            { type: 'stat_buff', stat: 'attack', valueType: 'flat', value: 10 }
        ]
    },
    {
        title: 'An Unexpected Treasure',
        description: 'The altar reveals a hidden artifact.',
        effects: [{ type: 'give_item', item: { ...CONSUMABLES.find(c => c.id === 'potion_stoneskin')! } }]
    },
    {
        title: 'Curse of Frailty',
        description: 'You feel weaker... but also luckier? Your Defense is reduced by 5, but your Luck is increased by 10.',
        effects: [
            { type: 'stat_debuff', stat: 'defense', valueType: 'flat', value: -5 },
            { type: 'stat_buff', stat: 'luck', valueType: 'flat', value: 10 }
        ]
    },
    {
        title: 'Pact of Haste',
        description: 'Become faster at the cost of durability. Gain 15% Attack but lose 10% Defense.',
        effects: [
            { type: 'stat_buff', stat: 'attack', valueType: 'percent', value: 15 },
            { type: 'stat_debuff', stat: 'defense', valueType: 'percent', value: -10 }
        ]
    },
     {
        title: 'Glass Cannon',
        description: 'Your Attack is massively increased by 25%, but your Max HP is reduced by 25%.',
        effects: [
            { type: 'stat_buff', stat: 'attack', valueType: 'percent', value: 25 },
            { type: 'stat_debuff', stat: 'maxHp', valueType: 'percent', value: -25 }
        ]
    }
];
