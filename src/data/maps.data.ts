import { MapInfo, Difficulty, World } from '../services/models';

export const WORLDS: World[] = [
    {
        id: 'verdant-labyrinth',
        name: 'Dark Forest',
        description: 'A winding maze of ancient trees and overgrown ruins, teeming with savage beasts.',
        theme: {
          primary: '#f59e0b', primaryLight: '#fde047', primaryDark: '#d97706', primaryDarker: '#b45309',
          secondary: '#475569', secondaryLight: '#94a3b8', secondaryDark: '#334155', secondaryDarker: '#334155',
          success: '#16a34a', successLight: '#4ade80', successDark: '#15803d', successDarker: '#15803d',
          danger: '#dc2626', dangerLight: '#f87171', dangerDark: '#991b1b', dangerDarker: '#991b1b',
          info: '#0891b2', infoLight: '#67e8f9', infoDark: '#164e63', infoDarker: '#164e63',
          background: '#111827', panel: '#1f2937', text: '#d1d5db',
          textOnPrimary: '#000000', textOnSecondary: '#ffffff', textOnSuccess: '#ffffff', textOnDanger: '#ffffff', textOnInfo: '#ffffff',
        },
        enemyKeys: ['VL_GloomfangSerpent', 'VL_ThornhideBoar', 'VL_WhisperwoodSprite', 'VL_GraspingVine', 'VL_FungalShambler', 'VL_CorruptedTreant', 'VL_ShadowCat', 'VL_GroveWitch'],
        bossKey: 'VL_LabyrinthGuardian',
        requiredLevel: 1,
    },
    {
        id: 'crystal-caves',
        name: 'Crystal Caves',
        description: 'A shimmering cavern of glowing crystals and subterranean creatures.',
        theme: {
          primary: '#8b5cf6', primaryLight: '#c4b5fd', primaryDark: '#7c3aed', primaryDarker: '#6d28d9',
          secondary: '#0891b2', secondaryLight: '#67e8f9', secondaryDark: '#164e63', secondaryDarker: '#164e63',
          success: '#16a34a', successLight: '#4ade80', successDark: '#15803d', successDarker: '#15803d',
          danger: '#dc2626', dangerLight: '#f87171', dangerDark: '#991b1b', dangerDarker: '#991b1b',
          info: '#0891b2', infoLight: '#67e8f9', infoDark: '#164e63', infoDarker: '#164e63',
          background: '#1e1b4b', panel: '#312e81', text: '#e0e7ff',
          textOnPrimary: '#ffffff', textOnSecondary: '#ffffff', textOnSuccess: '#ffffff', textOnDanger: '#ffffff', textOnInfo: '#ffffff',
        },
        enemyKeys: ['CC_CrystalGolem', 'CC_FireImp', 'CC_GemstoneSpider', 'CC_ShaleBehemoth', 'CC_ObsidianLurker', 'CC_MagmaSlime', 'CC_GeodeBat', 'CC_RuneEtchedGargoyle'],
        bossKey: 'CC_CrystallineOverlord', 
        requiredWorldId: 'verdant-labyrinth',
        requiredLevel: 20,
    },
    {
        id: 'haunted-castle',
        name: 'Haunted Castle',
        description: 'Eerie halls and forgotten chambers, haunted by restless spirits.',
        theme: {
          primary: '#16a34a', primaryLight: '#4ade80', primaryDark: '#15803d', primaryDarker: '#15803d',
          secondary: '#475569', secondaryLight: '#94a3b8', secondaryDark: '#334155', secondaryDarker: '#334155',
          success: '#16a34a', successLight: '#4ade80', successDark: '#15803d', successDarker: '#15803d',
          danger: '#be123c', dangerLight: '#f472b6', dangerDark: '#9f1239', dangerDarker: '#881337',
          info: '#0891b2', infoLight: '#67e8f9', infoDark: '#164e63', infoDarker: '#164e63',
          background: '#171717', panel: '#262626', text: '#a3a3a3',
          textOnPrimary: '#ffffff', textOnSecondary: '#ffffff', textOnSuccess: '#ffffff', textOnDanger: '#ffffff', textOnInfo: '#ffffff',
        },
        enemyKeys: ['HC_RestlessSpirit', 'HC_SkeletalKnight', 'HC_CursedGargoyle', 'HC_PhantomMage', 'HC_AnimatedArmor', 'HC_Ghoul', 'HC_Banshee', 'HC_LichAcolyte'],
        bossKey: 'HC_TheFallenKing',
        requiredWorldId: 'crystal-caves',
        requiredLevel: 40,
    },
    {
        id: 'frozen-peaks',
        name: 'Frozen Peaks',
        description: 'Treacherous frozen slopes guarded by creatures of ice and snow.',
        theme: {
          primary: '#0ea5e9', primaryLight: '#7dd3fc', primaryDark: '#0284c7', primaryDarker: '#0369a1',
          secondary: '#f97316', secondaryLight: '#fdba74', secondaryDark: '#ea580c', secondaryDarker: '#c2410c',
          success: '#16a34a', successLight: '#4ade80', successDark: '#15803d', successDarker: '#15803d',
          danger: '#dc2626', dangerLight: '#f87171', dangerDark: '#991b1b', dangerDarker: '#991b1b',
          info: '#0891b2', infoLight: '#67e8f9', infoDark: '#164e63', infoDarker: '#164e63',
          background: '#f8fafc', panel: '#e2e8f0', text: '#020617',
          textOnPrimary: '#ffffff', textOnSecondary: '#000000', textOnSuccess: '#ffffff', textOnDanger: '#ffffff', textOnInfo: '#ffffff',
        },
        enemyKeys: ['FP_FrostGoblin', 'FP_Yeti', 'FP_IceWraith', 'FP_GlacialBear', 'FP_TundraWolf', 'FP_AvalancheElemental', 'FP_FrostbittenShaman', 'FP_IceboundKnight'],
        bossKey: 'FP_TheIceWyrm',
        requiredWorldId: 'haunted-castle',
        requiredLevel: 60,
    }
];

export const MAPS: MapInfo[] = [
    { 
        key: 'verdant-labyrinth', 
        name: 'The Verdant Labyrinth', 
        description: 'A winding maze of ancient trees and overgrown ruins, teeming with savage beasts.',
        themeColors: {
            bg: 'bg-green-900/50',
            border: 'border-green-500',
            text: 'text-green-300',
        },
        templateIndexes: [], 
        requiredLevel: 1 
    },
    { 
        key: 'coming-soon-1', 
        name: 'The Ashen Peaks', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
    { 
        key: 'coming-soon-2', 
        name: 'Crystal Catacombs', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
    { 
        key: 'coming-soon-3', 
        name: 'The Void-Torn Wastes', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
    { 
        key: 'coming-soon-4', 
        name: 'Temporal Nexus', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
    { 
        key: 'coming-soon-5', 
        name: 'Sky-Piercing Spire', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
    { 
        key: 'coming-soon-6', 
        name: 'Gilded Necropolis', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
    { 
        key: 'coming-soon-7', 
        name: 'The Sunken City', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
    { 
        key: 'coming-soon-8', 
        name: 'The Infernal Caldera', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
    { 
        key: 'coming-soon-9', 
        name: 'Whispering Glade', 
        description: 'A new world is under construction. Coming soon!',
        themeColors: { bg: 'bg-slate-900/50', border: 'border-slate-700', text: 'text-slate-500' },
        templateIndexes: [], 
        requiredLevel: 999 
    },
];

export interface DifficultySetting {
    finalLevel: number;
    enemyStatMultiplier: number;
    itemsPerLevel: number;
    requiredPlayerLevel: number;
    enemyLevelRange: string;
    minEnemiesPerLevel: number;
    maxEnemiesPerLevel: number;
    minEnemyLevel: number;
    maxEnemyLevel: number;
}

export const DIFFICULTY_SETTINGS: { [key in Difficulty]: DifficultySetting } = {
    'Easy': { finalLevel: 5, enemyStatMultiplier: 1.0, itemsPerLevel: 3, requiredPlayerLevel: 1, enemyLevelRange: '1 - 5', minEnemiesPerLevel: 3, maxEnemiesPerLevel: 5, minEnemyLevel: 1, maxEnemyLevel: 5 },
    'Medium': { finalLevel: 8, enemyStatMultiplier: 1.5, itemsPerLevel: 2, requiredPlayerLevel: 5, enemyLevelRange: '5 - 10', minEnemiesPerLevel: 4, maxEnemiesPerLevel: 6, minEnemyLevel: 5, maxEnemyLevel: 10 },
    'Hard': { finalLevel: 10, enemyStatMultiplier: 2.0, itemsPerLevel: 2, requiredPlayerLevel: 10, enemyLevelRange: '10 - 18', minEnemiesPerLevel: 5, maxEnemiesPerLevel: 7, minEnemyLevel: 10, maxEnemyLevel: 18 },
    'Dark': { finalLevel: 12, enemyStatMultiplier: 2.5, itemsPerLevel: 1, requiredPlayerLevel: 15, enemyLevelRange: '15 - 25', minEnemiesPerLevel: 6, maxEnemiesPerLevel: 8, minEnemyLevel: 15, maxEnemyLevel: 25 },
    'Dark+': { finalLevel: 15, enemyStatMultiplier: 3.0, itemsPerLevel: 1, requiredPlayerLevel: 20, enemyLevelRange: '25 - 40', minEnemiesPerLevel: 7, maxEnemiesPerLevel: 10, minEnemyLevel: 25, maxEnemyLevel: 40 },
};