import { Quest, Guild } from "../services/models";

type GuildBountyTemplate = Omit<Quest, 'currentValue' | 'status' | 'type'>;

export const MOCK_GUILD: Guild = {
    id: 'mock_guild_1',
    name: 'The Adventurers',
    tag: 'ADV',
    level: 1,
    xp: 0,
    xpToNextLevel: 1000,
    members: [
        { name: 'Player', title: 'Guild Master', contribution: 0 }
    ],
    activeBounty: null
};

export const NPC_NAMES: string[] = [
    'Grunk', 'Elara', 'Bort', 'Lyra', 'Zane', 'Faye', 'Kael', 'Seraphina', 'Roric',
    'Jax', 'Nia', 'Borin', 'Vesper', 'Torbjorn', 'Astrid', 'Fenrir', 'Isolde', 'Draven', 'Mira'
];

export const GUILD_BOUNTIES_DATA: GuildBountyTemplate[] = [
    {
        id: 'guild_slay_1000_beasts',
        title: 'Guild Bounty: Eradication Protocol',
        description: 'As a guild, defeat 1,000 enemies in any dungeon.',
        objective: { type: 'slay_enemy', targetKey: 'any', targetValue: 1000 },
        rewards: { gold: 10000, arcaneDust: 500, reforgingEmbers: 5 }
    },
    {
        id: 'guild_collect_500000_gold',
        title: 'Guild Bounty: Treasury Hunt',
        description: 'As a guild, collect 500,000 Gold.',
        objective: { type: 'collect_gold', targetKey: 'any', targetValue: 500000 },
        rewards: { diamonds: 50, reforgingEmbers: 3 }
    },
    {
        id: 'guild_clear_50_hard_dungeons',
        title: 'Guild Bounty: Legendary Campaign',
        description: 'As a guild, complete 50 dungeons on Hard difficulty or higher.',
        objective: { type: 'complete_dungeon', targetKey: 'any', targetValue: 50, difficultyRequirement: 'Hard' },
        rewards: { reforgingEmbers: 10 }
    },
];

export const GUILD_LEVEL_BENEFITS: { [level: number]: { goldFind?: number, xpGain?: number } } = {
    1: { goldFind: 1 },
    2: { xpGain: 1 },
    3: { goldFind: 2 },
    4: { xpGain: 2 },
    5: { goldFind: 3, xpGain: 3 },
};

export const GUILD_XP_PER_LEVEL = [0, 1000, 2500, 5000, 10000, 20000]; // XP to reach next level