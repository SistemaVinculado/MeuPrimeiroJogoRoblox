import { ChallengeRiftConfig, Player, PlayerClass } from "../services/models";
import { SKILLS_DATA } from './skills.data';
import { EQUIPMENT_SHOP_POOL } from './items.data';

const presetWarrior: Player = {
    hp: 400,
    maxHp: { base: 400, gear: 0, perks: 0 },
    en: 150,
    maxEn: { base: 150, gear: 0, perks: 0 },
    attack: { base: 50, gear: 0, perks: 0 },
    defense: { base: 30, gear: 0, perks: 0 },
    luck: { base: 5, gear: 0, perks: 0 },
    critDamage: { base: 50, gear: 0, perks: 0 },
    statusEffects: [],
    skills: [
        { ...SKILLS_DATA.find(s => s.id === 'shield_bash')!, currentCooldown: 0, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
        { ...SKILLS_DATA.find(s => s.id === 'retaliate')!, currentCooldown: 0, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 }
    ],
    position: { x: -1, y: -1 },
    level: 25,
    xp: 0,
    xpToNextLevel: 10000,
    inventory: [],
    maxInventory: 100,
    equipment: {
        helmet: null,
        armor: EQUIPMENT_SHOP_POOL.find(i => i.id === 'shop_a_chainmail1')!.item,
        weapon: EQUIPMENT_SHOP_POOL.find(i => i.id === 'shop_w_sword2')!.item,
        shield: EQUIPMENT_SHOP_POOL.find(i => i.id === 'shop_s_shield1')!.item,
        boots: null,
        gloves: null,
        amulet: null,
        ring1: null,
        ring2: null,
    },
    playerClass: 'Warrior',
    gold: 0,
    diamonds: 0,
    arcaneDust: 0,
    reforgingEmbers: 0,
    soulEssence: 0,
    ownedAppearanceIds: [],
    equippedPlayerId: 'default',
    equippedWeaponId: 'default',
    equippedShieldId: 'default',
    skillPoints: 0,
    learnedSkillNodeIds: [],
    prestige: 0,
    ascensionPoints: 0,
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
    arenaRank: 1500,
    arenaMarks: 0,
    arenaWinStreak: 0,
    // FIX: Added missing 'lastArenaResetDate' property to satisfy the Player interface.
    lastArenaResetDate: null,
};


export const CURRENT_CHALLENGE_RIFT: ChallengeRiftConfig = {
    weekId: 'week_1_swift_blade',
    title: 'Weekly Challenge: The Swift Blade',
    description: "This week, all challengers will enter a fixed dungeon as a Level 25 Warrior with a preset loadout. Your own gear, level, and skills are ignored. The goal is to complete all floors as fast as possible. Your completion time will be ranked on the weekly leaderboard. Good luck, adventurer!",
    presetPlayer: presetWarrior,
    modifiers: [
        { id: 'glass_cannon', name: 'Glass Cannon', description: 'Player damage is doubled, but incoming damage is also doubled.' },
        { id: 'haste', name: 'Haste', description: 'All skill cooldowns are reduced by 1 turn (minimum 1).' }
    ],
    leaderboard: [
        { rank: 1, name: 'RiftRunner', time: 194 }, // 03:14
        { rank: 2, name: 'Speedy', time: 205 }, // 03:25
        { rank: 3, name: 'QuickSilver', time: 211 }, // 03:31
        { rank: 4, name: 'Chrono', time: 225 }, // 03:45
        { rank: 5, name: 'Flash', time: 239 }, // 03:59
    ],
};