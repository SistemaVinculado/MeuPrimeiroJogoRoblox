import { AscensionNode } from "../services/models";

export const ASCENSION_GRID_DATA: AscensionNode[] = [
    // Tier 1 - Basic Stats
    {
        id: 'asc_hp_1',
        name: 'Enduring Soul I',
        description: 'Permanently increases all future characters\' base Max HP by 2%.',
        cost: 1,
        playerClass: 'All',
        bonuses: [{ stat: 'maxHp', type: 'percent', value: 2 }]
    },
    {
        id: 'asc_atk_1',
        name: 'Honed Edge I',
        description: 'Permanently increases all future characters\' base Attack by 2%.',
        cost: 1,
        playerClass: 'All',
        bonuses: [{ stat: 'attack', type: 'percent', value: 2 }]
    },
    {
        id: 'asc_gold_1',
        name: 'Fortune Finder I',
        description: 'Permanently increases Gold found in dungeons by 5%.',
        cost: 1,
        playerClass: 'All',
        bonuses: [{ stat: 'goldFind', type: 'percent', value: 5 }]
    },
    // Tier 2 - Requires Tier 1
    {
        id: 'asc_def_2',
        name: 'Guardian\'s Will',
        description: 'Permanently increases all future characters\' base Defense by 3%.',
        cost: 2,
        dependencies: ['asc_hp_1'],
        playerClass: 'All',
        bonuses: [{ stat: 'defense', type: 'percent', value: 3 }]
    },
    {
        id: 'asc_en_2',
        name: 'Arcane Spirit',
        description: 'Permanently increases all future characters\' base Max Energy by 3%.',
        cost: 2,
        dependencies: ['asc_atk_1'],
        playerClass: 'All',
        bonuses: [{ stat: 'maxEn', type: 'percent', value: 3 }]
    },
    {
        id: 'asc_xp_2',
        name: 'Enlightened Mind',
        description: 'Permanently increases XP gained in dungeons by 5%.',
        cost: 2,
        dependencies: ['asc_gold_1'],
        playerClass: 'All',
        bonuses: [{ stat: 'xpGain', type: 'percent', value: 5 }]
    },
    // Tier 3 - Class Specific
    {
        id: 'asc_warrior_hp_2',
        name: 'Thick Skin',
        description: 'Permanently increases Max HP by an additional 3%.',
        cost: 3,
        dependencies: ['asc_def_2'],
        playerClass: 'Warrior',
        bonuses: [{ stat: 'maxHp', type: 'percent', value: 3 }]
    },
    {
        id: 'asc_mage_en_2',
        name: 'Arcane Battery',
        description: 'Permanently increases Max Energy by an additional 3%.',
        cost: 3,
        dependencies: ['asc_en_2'],
        playerClass: 'Mage',
        bonuses: [{ stat: 'maxEn', type: 'percent', value: 3 }]
    },
     // Tier 4 - Keystone
    {
        id: 'asc_keystone_1',
        name: 'Adventurer\'s Headstart',
        description: 'Start every new run with 2 free Lesser Health Potions.',
        cost: 5,
        dependencies: ['asc_def_2', 'asc_en_2'],
        playerClass: 'All',
        bonuses: [] // This is a special effect handled in code
    },
    // Tier 5 - Major Keystones
    {
        id: 'asc_warrior_keystone_unstoppable',
        name: 'Unstoppable Force',
        description: 'You can no longer block, but all your defense is converted into attack power.',
        cost: 10,
        dependencies: ['asc_warrior_hp_2'],
        playerClass: 'Warrior',
        bonuses: [] // Special effect handled in code
    },
    {
        id: 'asc_mage_keystone_overload',
        name: 'Arcane Overload',
        description: 'All your skills cost HP instead of Energy.',
        cost: 10,
        dependencies: ['asc_mage_en_2'],
        playerClass: 'Mage',
        bonuses: [] // Special effect handled in code
    },
];