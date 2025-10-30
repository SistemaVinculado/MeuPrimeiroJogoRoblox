import { Item, ShopItem, Perk } from "../services/models";

export const SET_BONUSES = {
    'Guardians Resolve': [
        { count: 2, description: '+15 Defense', bonuses: { defense: { flat: 15, percent: 0 } } },
        { count: 3, description: 'Start combat with a Guarding buff for 1 turn.', bonuses: {} } // Effect handled in code
    ]
};

// Warrior Items
export const WARRIOR_ITEMS: Item[] = [
    { id: 'vl_warrior_helm', name: 'Helm of the Grove', description: 'Toughened bark woven with iron.', type: 'helmet', rarity: 'Uncommon', playerClass: 'Warrior', stats: { maxHp: 20, defense: 3 } },
    { id: 'vl_warrior_armor', name: 'Labyrinth Guardian\'s Plate', description: 'Ancient plate covered in moss.', type: 'armor', rarity: 'Rare', playerClass: 'Warrior', stats: { maxHp: 40, defense: 8 } },
    { id: 'vl_warrior_weapon', name: 'Thorn Blade', description: 'A sword that seems to grow, not forged.', type: 'weapon', rarity: 'Uncommon', playerClass: 'Warrior', stats: { attack: 10 } },
    { id: 'vl_warrior_shield', name: 'Ironwood Shield', description: 'As unyielding as the oldest tree.', type: 'shield', rarity: 'Uncommon', playerClass: 'Warrior', stats: { defense: 5 } },
    { id: 'cursed_berserker_axe', name: 'Berserker\'s Axe', description: 'A cursed axe that grants immense power at the cost of all defenses.', type: 'weapon', rarity: 'Epic', playerClass: 'Warrior', stats: { attack: 30, defense: -10 } }
];

// Guardian's Resolve Set
export const GUARDIAN_SET: Item[] = [
    { id: 'guardian_helm', name: 'Guardian\'s Helm', description: 'A helm that has seen countless battles.', type: 'helmet', rarity: 'Rare', playerClass: 'Warrior', stats: { maxHp: 30, defense: 5 }, setName: 'Guardians Resolve', setBonusDescription: '(2) +15 Defense\n(3) Start combat with Guarding' },
    { id: 'guardian_plate', name: 'Guardian\'s Plate', description: 'A chestplate bearing the crest of a forgotten order.', type: 'armor', rarity: 'Rare', playerClass: 'Warrior', stats: { maxHp: 50, defense: 12 }, setName: 'Guardians Resolve', setBonusDescription: '(2) +15 Defense\n(3) Start combat with Guarding' },
    { id: 'guardian_shield', name: 'Guardian\'s Shield', description: 'An unbreakable shield, the last line of defense.', type: 'shield', rarity: 'Rare', playerClass: 'Warrior', stats: { defense: 10 }, setName: 'Guardians Resolve', setBonusDescription: '(2) +15 Defense\n(3) Start combat with Guarding' },
];

// Mage Items
export const MAGE_ITEMS: Item[] = [
    { id: 'vl_mage_helm', name: 'Circlet of Whispers', description: 'Channels the energy of the ancient woods.', type: 'helmet', rarity: 'Uncommon', playerClass: 'Mage', stats: { maxEn: 30 } },
    { id: 'vl_mage_armor', name: 'Robe of Living Leaves', description: 'Leaves that shift and rustle with arcane power.', type: 'armor', rarity: 'Rare', playerClass: 'Mage', stats: { maxEn: 50, defense: 2 } },
    { id: 'vl_mage_weapon', name: 'Rootwood Staff', description: 'A staff pulsing with the labyrinth\'s magic.', type: 'weapon', rarity: 'Uncommon', playerClass: 'Mage', stats: { attack: 8, maxEn: 20 } },
    { id: 'vl_mage_shield', name: 'Runic Moss Orb', description: 'A magical barrier of woven moss.', type: 'shield', rarity: 'Uncommon', playerClass: 'Mage', stats: { defense: 1, maxEn: 15 } }
];

// Potions & Consumables
export const CONSUMABLES: Item[] = [
    { id: 'hp_potion_small', name: 'Lesser Health Potion', description: 'Restores 25% of Max HP.', type: 'potion', rarity: 'Common', playerClass: 'All', effect: { type: 'heal', percentage: 25 } },
    { id: 'hp_potion_medium', name: 'Health Potion', description: 'Restores 50% of Max HP.', type: 'potion', rarity: 'Uncommon', playerClass: 'All', effect: { type: 'heal', percentage: 50 } },
    { id: 'hp_potion_large', name: 'Greater Health Potion', description: 'Restores 75% of Max HP.', type: 'potion', rarity: 'Rare', playerClass: 'All', effect: { type: 'heal', percentage: 75 } },
    { id: 'mana_potion_small', name: 'Lesser Mana Potion', description: 'Restores 30 Energy.', type: 'potion', rarity: 'Common', playerClass: 'All', effect: { type: 'mana_heal', flatAmount: 30 } },
    { id: 'potion_stoneskin', name: 'Potion of Stoneskin', description: 'Grants +50% Defense for 3 turns.', type: 'potion', rarity: 'Rare', playerClass: 'All', effect: { type: 'apply_buff', statusEffect: { type: 'defense_boost', duration: 3, value: 50 } } },
    { id: 'escape_rope', name: 'Escape Rope', description: 'A magical rope that guarantees a successful escape from combat.', type: 'consumable', rarity: 'Uncommon', playerClass: 'All', effect: { type: 'guaranteed_flee' } },
    { id: 'potion_thorns', name: 'Potion of Thorns', description: 'For 3 turns, reflect 5 damage back to attackers.', type: 'potion', rarity: 'Rare', playerClass: 'All', effect: { type: 'apply_buff', statusEffect: { type: 'thorns', duration: 3, value: 5 } } },
    { id: 'purewater_potion', name: 'Purewater Potion', description: 'Removes all negative status effects.', type: 'potion', rarity: 'Uncommon', playerClass: 'All', effect: { type: 'cleanse_debuffs' } },
];

export const UNIQUE_ITEMS: Item[] = [
    {
        id: 'unique_soul_eater',
        name: 'Soul Eater',
        description: 'A blade carved from the abyss itself. It devours the essence of its victims.',
        type: 'weapon',
        rarity: 'Unique',
        playerClass: 'All',
        stats: { attack: 100, critDamage: 100, luck: 50 },
        exoticEffect: {
            id: 'soul_devour',
            description: 'Defeating an enemy permanently increases this weapon\'s Attack by 1 for this run (max +50).'
        }
    }
];

// New High-Tier Items to showcase the system
export const HIGH_TIER_ITEMS: Item[] = [
    { id: 'sunforged_greataxe', name: 'Sunforged Greataxe', description: 'An axe forged in the heart of a star.', type: 'weapon', rarity: 'Legendary', playerClass: 'Warrior', stats: { attack: 45 }, perks: [{ type: 'attack', level: 5, value: 15 }] },
    { id: 'void-reaver_cuirass', name: 'Void-Reaver Cuirass', description: 'Armor crafted from the scales of a dimension-devouring beast.', type: 'armor', rarity: 'Mythic', playerClass: 'All', stats: { maxHp: 100, defense: 25 }, perks: [{ type: 'defense', level: 5, value: 15 }] },
    { id: 'chronos_pendant', name: 'Chronos Pendant', description: 'An item that seems to exist outside of time. Its purpose is unknown.', type: 'amulet', rarity: 'Exotic', playerClass: 'All', exoticEffect: { id: 'chronos_reset', description: 'Using Phase Shift resets all other skill cooldowns.' } },
    { id: 'phase_walkers', name: 'Phase Walkers', description: 'Boots that shimmer with otherworldly energy.', type: 'boots', rarity: 'Exotic', playerClass: 'All', exoticEffect: { id: 'phase_walk', description: 'Allows movement through wall tiles during exploration.' } },
    { id: 'soul_battery', name: 'Soul Battery', description: 'A peculiar amulet that hums with captured energy.', type: 'amulet', rarity: 'Exotic', playerClass: 'All', exoticEffect: { id: 'soul_battery', description: 'Using a health potion also restores 50% of its value to your Energy.' } },
    { id: 'cloverfoot_boots', name: 'Cloverfoot Boots', description: 'These boots seem to guide you towards fortune.', type: 'boots', rarity: 'Uncommon', playerClass: 'All', stats: { luck: 15 } },
    { id: 'amulet_of_fortune', name: 'Amulet of Fortune', description: 'A lucky charm that attracts rare treasures.', type: 'amulet', rarity: 'Rare', playerClass: 'All', stats: { luck: 25 } },
    { id: 'vampiric_ring', name: 'Vampiric Ring', description: 'A blood-red ring that pulses faintly.', type: 'ring', rarity: 'Exotic', playerClass: 'All', exoticEffect: { id: 'lifesteal', description: 'Your basic attacks heal you for 15% of the damage dealt.' } },
    { id: 'heart_of_the_volcano', name: 'Heart of the Volcano', description: 'This armor contains a raging inferno.', type: 'armor', rarity: 'Exotic', playerClass: 'All', exoticEffect: { id: 'final_retribution', description: 'Upon taking fatal damage, you explode, dealing massive fire damage to the enemy.' } },
    { id: 'executioners_mark', name: 'Executioner\'s Mark', description: 'An amulet that thirsts for critical strikes.', type: 'amulet', rarity: 'Legendary', playerClass: 'All', stats: { critDamage: 50 } },
    { id: 'storm_caller', name: 'Storm Caller', description: 'A staff crackling with contained lightning.', type: 'weapon', rarity: 'Exotic', playerClass: 'Mage', exoticEffect: { id: 'on_hit_chain_lightning', description: 'Basic attacks have a 25% chance to cast Chain Lightning, dealing damage to the target.' } },
];

export const ASCENDANT_ITEMS: Item[] = [
    {
        id: 'ascendant_aegis',
        name: 'Aegis of Ascendancy',
        description: 'A shield that resonates with the power of countless timelines.',
        type: 'shield',
        rarity: 'Divine',
        playerClass: 'All',
        stats: { defense: 30, maxHp: 100, critDamage: 25 },
        perks: [{ type: 'defense', level: 5, value: 15 }]
    },
    {
        id: 'ascendant_blade',
        name: 'Blade of the Timeless',
        description: 'A sword that cuts through the fabric of reality.',
        type: 'weapon',
        rarity: 'Divine',
        playerClass: 'All',
        stats: { attack: 70, critDamage: 75 },
        perks: [{ type: 'attack', level: 5, value: 15 }]
    }
];

export const EPIC_ITEM_POOL: Item[] = [
    { id: 'epic_axe', name: 'Executioner\'s Axe', description: 'An axe that bites deep.', type: 'weapon', rarity: 'Epic', playerClass: 'Warrior', stats: { attack: 25, critDamage: 20 }, perks: [{ type: 'attack', level: 3, value: 9 }] },
    { id: 'epic_staff', name: 'Staff of the Archmage', description: 'A staff brimming with raw power.', type: 'weapon', rarity: 'Epic', playerClass: 'Mage', stats: { attack: 18, maxEn: 50 }, perks: [{ type: 'maxEn', level: 3, value: 9 }] },
    { id: 'epic_plate', name: 'Adamantite Plate', description: 'Nearly unbreakable armor.', type: 'armor', rarity: 'Epic', playerClass: 'All', stats: { defense: 20, maxHp: 80 } },
    { id: 'epic_shield', name: 'Dragonscale Shield', description: 'A shield made from the scales of a dragon.', type: 'shield', rarity: 'Epic', playerClass: 'All', stats: { defense: 15, maxHp: 30 } },
];

// Map-specific loot table
export const VERDANT_LABYRINTH_LOOT = [...WARRIOR_ITEMS, ...MAGE_ITEMS, ...HIGH_TIER_ITEMS, ...GUARDIAN_SET, ...EPIC_ITEM_POOL, ...ASCENDANT_ITEMS, ...UNIQUE_ITEMS];

export const BASE_SHOP_CONSUMABLES: Omit<ShopItem, 'stock' | 'isSpecial'>[] = [
  { id: 'hp_potion_small', name: 'Lesser Health Potion', description: 'Restores 25% of Max HP.', price: 25, rarity: 'Common', item: CONSUMABLES.find(i => i.id === 'hp_potion_small')! },
  { id: 'mana_potion_small', name: 'Lesser Mana Potion', description: 'Restores 30 Energy.', price: 30, rarity: 'Common', item: CONSUMABLES.find(i => i.id === 'mana_potion_small')! },
  { id: 'purewater_potion', name: 'Purewater Potion', description: 'Removes all negative status effects.', price: 75, rarity: 'Uncommon', item: CONSUMABLES.find(i => i.id === 'purewater_potion')! },
  { id: 'escape_rope', name: 'Escape Rope', description: 'Guarantees a successful escape from combat.', price: 100, rarity: 'Uncommon', item: CONSUMABLES.find(i => i.id === 'escape_rope')! },
  { id: 'potion_stoneskin', name: 'Potion of Stoneskin', description: 'Grants +50% Defense for 3 turns.', price: 150, rarity: 'Rare', item: CONSUMABLES.find(i => i.id === 'potion_stoneskin')! },
  { id: 'potion_thorns', name: 'Potion of Thorns', description: 'Reflects 5 damage to attackers for 3 turns.', price: 120, rarity: 'Rare', item: CONSUMABLES.find(i => i.id === 'potion_thorns')! },
];

export const MERCHANT_FESTIVAL_SPECIALS: (Omit<ShopItem, 'stock' | 'isSpecial'> & { minLevel: number })[] = [
    {
        id: 'shop_festival_ring',
        name: 'Ring of Prosperity',
        description: 'A ring that hums with the energy of commerce, increasing luck.',
        price: 5000,
        rarity: 'Epic',
        item: {
            id: 'ring_of_prosperity',
            name: 'Ring of Prosperity',
            description: 'A ring that hums with the energy of commerce, increasing luck.',
            type: 'ring',
            rarity: 'Epic',
            playerClass: 'All',
            stats: { luck: 50 }
        },
        minLevel: 10
    }
];

export const EQUIPMENT_SHOP_POOL: (Omit<ShopItem, 'stock' | 'isSpecial'> & { minLevel: number })[] = [
    // Level 1+
    { id: 'shop_w_sword1', name: 'Iron Sword', description: 'A basic but reliable blade.', price: 50, rarity: 'Common', item: { id: 'shop_w_sword1', name: 'Iron Sword', description: 'A basic but reliable blade.', type: 'weapon', rarity: 'Common', playerClass: 'Warrior', stats: { attack: 5 } }, minLevel: 1 },
    { id: 'shop_m_staff1', name: 'Apprentice Staff', description: 'A simple staff for channeling magic.', price: 50, rarity: 'Common', item: { id: 'shop_m_staff1', name: 'Apprentice Staff', description: 'A simple staff for channeling magic.', type: 'weapon', rarity: 'Common', playerClass: 'Mage', stats: { attack: 4, maxEn: 10 } }, minLevel: 1 },
    { id: 'shop_a_leather1', name: 'Leather Armor', description: 'Hardened leather chestpiece.', price: 60, rarity: 'Common', item: { id: 'shop_a_leather1', name: 'Leather Armor', description: 'Hardened leather chestpiece.', type: 'armor', rarity: 'Common', playerClass: 'All', stats: { defense: 4, maxHp: 10 } }, minLevel: 1 },
    
    // Level 5+
    { id: 'shop_w_sword2', name: 'Steel Longsword', description: 'A well-balanced steel sword.', price: 250, rarity: 'Uncommon', item: { id: 'shop_w_sword2', name: 'Steel Longsword', description: 'A well-balanced steel sword.', type: 'weapon', rarity: 'Uncommon', playerClass: 'Warrior', stats: { attack: 12 } }, minLevel: 5 },
    { id: 'shop_m_staff2', name: 'Acolyte Staff', description: 'A staff that hums with power.', price: 260, rarity: 'Uncommon', item: { id: 'shop_m_staff2', name: 'Acolyte Staff', description: 'A staff that hums with power.', type: 'weapon', rarity: 'Uncommon', playerClass: 'Mage', stats: { attack: 9, maxEn: 25 } }, minLevel: 5 },
    { id: 'shop_a_chainmail1', name: 'Chainmail Armor', description: 'Provides decent protection.', price: 300, rarity: 'Uncommon', item: { id: 'shop_a_chainmail1', name: 'Chainmail Armor', description: 'Provides decent protection.', type: 'armor', rarity: 'Uncommon', playerClass: 'All', stats: { defense: 10, maxHp: 20 } }, minLevel: 5 },
    
    // Level 10+
    { id: 'shop_w_axe1', name: 'Glimmering Axe', description: 'An axe infused with faint magic.', price: 700, rarity: 'Rare', item: { id: 'shop_w_axe1', name: 'Glimmering Axe', description: 'An axe infused with faint magic.', type: 'weapon', rarity: 'Rare', playerClass: 'Warrior', stats: { attack: 20 }, perks: [{type: 'attack', level: 1, value: 3}]}, minLevel: 10 },
    { id: 'shop_m_wand1', name: 'Crystal Wand', description: 'Focuses arcane energy with precision.', price: 720, rarity: 'Rare', item: { id: 'shop_m_wand1', name: 'Crystal Wand', description: 'Focuses arcane energy with precision.', type: 'weapon', rarity: 'Rare', playerClass: 'Mage', stats: { attack: 15, maxEn: 30 }, perks: [{type: 'maxEn', level: 1, value: 3}]}, minLevel: 10 },
    { id: 'shop_s_shield1', name: 'Aegis of the Protector', description: 'A shield that inspires resilience.', price: 800, rarity: 'Rare', item: { id: 'shop_s_shield1', name: 'Aegis of the Protector', description: 'A shield that inspires resilience.', type: 'shield', rarity: 'Rare', playerClass: 'All', stats: { defense: 12 }, perks: [{type: 'maxHp', level: 2, value: 6}]}, minLevel: 10 },
];
