import { Item, Rarity } from '../services/models';
import { UNIQUE_ITEMS } from './items.data';

export interface ArenaShopItem {
    id: string;
    name: string;
    description: string;
    price: number; // Arena Marks
    rarity: Rarity;
    item: Item;
    stock: number; // 999 for infinite
}

export const ARENA_SHOP_ITEMS: ArenaShopItem[] = [
    {
        id: 'arena_unique_weapon',
        name: 'Soul Eater',
        description: 'A blade of unparalleled power, awarded only to the most dominant champions of the Arena.',
        price: 10000,
        rarity: 'Unique',
        item: UNIQUE_ITEMS.find(i => i.id === 'unique_soul_eater')!,
        stock: 1
    },
    {
        id: 'arena_ember_weekly',
        name: 'Reforging Ember',
        description: 'A rare material used to re-roll powerful items at the Forge.',
        price: 250,
        rarity: 'Legendary',
        item: { id: 'reforging_ember_item', name: 'Reforging Ember', description: 'A currency item.', type: 'consumable', rarity: 'Legendary', playerClass: 'All' },
        stock: 1 // Weekly limit
    },
    {
        id: 'arena_pvp_sword',
        name: 'Gladiator\'s Blade',
        description: 'A sword that deals increased damage to Mages in the Arena.',
        price: 500,
        rarity: 'Epic',
        item: {
            id: 'gladiators_blade',
            name: 'Gladiator\'s Blade',
            description: 'A sword that deals increased damage to Mages in the Arena.',
            type: 'weapon',
            rarity: 'Epic',
            playerClass: 'Warrior',
            stats: { attack: 35 }
        },
        stock: 999
    },
    {
        id: 'arena_pvp_staff',
        name: 'Warlock\'s Staff',
        description: 'A staff that deals increased damage to Warriors in the Arena.',
        price: 500,
        rarity: 'Epic',
        item: {
            id: 'warlocks_staff',
            name: 'Warlock\'s Staff',
            description: 'A staff that deals increased damage to Warriors in the Arena.',
            type: 'weapon',
            rarity: 'Epic',
            playerClass: 'Mage',
            stats: { attack: 28, maxEn: 20 }
        },
        stock: 999
    },
     {
        id: 'arena_pvp_cosmetic',
        name: 'Gladiator\'s War-Paint',
        description: 'An exclusive cosmetic appearance for PvP champions.',
        price: 1000,
        rarity: 'Legendary',
        item: {
            id: 'cosmetic_gladiator',
            name: 'Gladiator\'s War-Paint',
            description: 'This is a cosmetic token, it will be consumed on purchase.',
            type: 'consumable',
            rarity: 'Legendary',
            playerClass: 'All'
        },
        stock: 1
    }
];