import { ArenaOpponent, Player } from '../services/models';
import { EQUIPMENT_SHOP_POOL } from './items.data';

const createOpponent = (name: string, pClass: 'Warrior' | 'Mage', level: number, hp: number, attack: number, defense: number, rank: number): ArenaOpponent => {
    const playerSnapshot: Player = {
        hp,
        maxHp: { base: hp, gear: 0, perks: 0 },
        en: 100,
        maxEn: { base: 100, gear: 0, perks: 0 },
        attack: { base: attack, gear: 0, perks: 0 },
        defense: { base: defense, gear: 0, perks: 0 },
        luck: { base: 10, gear: 0, perks: 0 },
        critDamage: { base: 50, gear: 0, perks: 0 },
        statusEffects: [],
        skills: [],
        position: { x: -1, y: -1 },
        level,
        xp: 0,
        xpToNextLevel: 1000,
        inventory: [],
        maxInventory: 100,
        equipment: {
            helmet: null,
            armor: EQUIPMENT_SHOP_POOL.find(i => i.id === 'shop_a_chainmail1')!.item,
            weapon: EQUIPMENT_SHOP_POOL.find(i => i.id === (pClass === 'Warrior' ? 'shop_w_sword2' : 'shop_m_staff2'))!.item,
            shield: null,
            boots: null,
            gloves: null,
            amulet: null,
            ring1: null,
            ring2: null,
        },
        playerClass: pClass,
        gold: 0, diamonds: 0, arcaneDust: 0, reforgingEmbers: 0, soulEssence: 0,
        ownedAppearanceIds: [], equippedPlayerId: 'default', equippedWeaponId: 'default', equippedShieldId: 'default',
        skillPoints: 0, learnedSkillNodeIds: [], prestige: 0, ascensionPoints: 0,
        activeQuests: [],
        passiveBonuses: { maxHp: { flat: 0, percent: 0 }, maxEn: { flat: 0, percent: 0 }, attack: { flat: 0, percent: 0 }, defense: { flat: 0, percent: 0 }, luck: { flat: 0, percent: 0 }, critDamage: {flat: 0, percent: 0} },
        setBonuses: { maxHp: { flat: 0, percent: 0 }, maxEn: { flat: 0, percent: 0 }, attack: { flat: 0, percent: 0 }, defense: { flat: 0, percent: 0 }, luck: { flat: 0, percent: 0 }, critDamage: {flat: 0, percent: 0} },
        ascensionBonuses: { maxHp: { flat: 0, percent: 0 }, maxEn: { flat: 0, percent: 0 }, attack: { flat: 0, percent: 0 }, defense: { flat: 0, percent: 0 }, goldFind: { percent: 0 }, xpGain: { percent: 0 }, luck: { flat: 0, percent: 0 }, critDamage: {flat: 0, percent: 0} },
        guildBonuses: { goldFind: { percent: 0 }, xpGain: { percent: 0 } },
        // FIX: Added missing 'runBonuses' property to satisfy the Player interface.
        runBonuses: {
            maxHp: { flat: 0, percent: 0 },
            maxEn: { flat: 0, percent: 0 },
            attack: { flat: 0, percent: 0 },
            defense: { flat: 0, percent: 0 },
            luck: { flat: 0, percent: 0 },
            critDamage: { flat: 0, percent: 0 },
        },
        learnedAscensionNodeIds: [],
        arenaTickets: 0,
        guild: null,
        arenaRank: rank,
        arenaMarks: 0,
        arenaWinStreak: 0,
        // FIX: Added missing 'lastArenaResetDate' property to satisfy the Player interface.
        lastArenaResetDate: null,
    };

    const power = Math.floor((playerSnapshot.attack.base * 2) + (playerSnapshot.defense.base * 1.5) + (playerSnapshot.maxHp.base * 0.5));

    return {
        name,
        playerClass: pClass,
        level,
        power,
        rank,
        playerSnapshot,
    };
};

export const ARENA_OPPONENTS_POOL: ArenaOpponent[] = [
    createOpponent('Grom The Crusher', 'Warrior', 25, 600, 60, 45, 1400),
    createOpponent('Elara Whispewind', 'Mage', 28, 450, 75, 25, 1250),
    createOpponent('Sir Reginald', 'Warrior', 30, 750, 55, 60, 1450),
    createOpponent('Vexia the Shadow', 'Mage', 26, 420, 80, 20, 1200),
    createOpponent('Borin Stonehand', 'Warrior', 22, 550, 50, 50, 1350),
    createOpponent('Lyra Nightshade', 'Mage', 29, 480, 78, 28, 1300),
];