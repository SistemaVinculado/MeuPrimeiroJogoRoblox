export interface ArenaRewardTier {
    rankTier: string;
    rankRange: string;
    rewards: string[];
    color: string;
}

export const ARENA_SEASON_REWARDS: ArenaRewardTier[] = [
    {
        rankTier: 'The Soul of the Dungeon',
        rankRange: 'Rank 1',
        rewards: ['12,500 Arena Marks', 'Exclusive "Soul of the Dungeon" Title', '20 Reforging Embers', '10 Soul Essence'],
        color: 'rank-celestial-diamond',
    },
    {
        rankTier: 'Eternal Ghost',
        rankRange: 'Ranks 2-10',
        rewards: ['8,000 Arena Marks', 'Exclusive "Eternal Ghost" Title', '15 Reforging Embers', '5 Soul Essence'],
        color: 'rank-astral-platinum',
    },
    {
        rankTier: 'Lord of the Abyss',
        rankRange: 'Ranks 11-100',
        rewards: ['5,000 Arena Marks', '10 Reforging Embers', '2 Soul Essence'],
        color: 'rank-legendary-gold',
    },
    {
        rankTier: 'Abyssal Champion',
        rankRange: 'Ranks 101-500',
        rewards: ['3,500 Arena Marks', '5 Reforging Embers', '1 Soul Essence'],
        color: 'rank-mythical-amethyst',
    },
    {
        rankTier: 'Obsidian Slayer',
        rankRange: 'Ranks 501-1000',
        rewards: ['2,500 Arena Marks', '2 Reforging Embers'],
        color: 'text-purple-300',
    },
     {
        rankTier: 'Adamantine Conqueror',
        rankRange: 'Ranks 1001-2000',
        rewards: ['1,500 Arena Marks', '1 Reforging Ember'],
        color: 'text-slate-300',
    },
    {
        rankTier: 'Mithril Guardian',
        rankRange: 'Ranks 2001-5000',
        rewards: ['1,000 Arena Marks'],
        color: 'text-cyan-300',
    },
    {
        rankTier: 'Steel Sentinel & Below',
        rankRange: 'Ranks 5001-9999+',
        rewards: ['500 Arena Marks'],
        color: 'text-gray-400',
    },
];