export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Dark' | 'Dark+';
export type PlayerClass = 'Warrior' | 'Mage';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Artifact' | 'Divine' | 'Exotic' | 'Unique';

export interface Perk {
  type: 'attack' | 'defense' | 'maxHp' | 'maxEn' | 'critDamage' | 'skill_enhance';
  level: 1 | 2 | 3 | 4 | 5;
  value: number; // The percentage value for stats, or a flat value for skill effects
  skillId?: string;
  effect?: string;
  description?: string;
}

export type StatusEffectType = 'stun' | 'chilled' | 'poison' | 'defense_boost' | 'guarding' | 'retaliating' | 'phased' | 'enraged' | 'channeling' | 'thorns' | 'weaken' | 'set_guard' | 'burn' | 'bleed' | 'mana_burn' | 'attack_debuff';

export interface StatusEffect {
  type: StatusEffectType;
  duration: number;
  source?: string; // e.g., 'Shield Bash', 'Venom Spit'
  value?: number; // e.g., the amount of defense boost, or damage for thorns
  stacks?: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  levelRequired: number;
  cost: number; // Energy cost
  cooldown: number; // Turns
  currentCooldown: number;
  masteryLevel: number;
  masteryXp: number;
  masteryXpToNextLevel: number;
  masteryBonus?: {
    attack?: number;
  };
}

export interface Item {
  id: string;
  name: string;
  description: string;
  level?: number;
  type: 'potion' | 'helmet' | 'armor' | 'weapon' | 'shield' | 'consumable' | 'boots' | 'gloves' | 'amulet' | 'ring';
  rarity: Rarity;
  stats?: Partial<Record<'maxHp' | 'maxEn' | 'attack' | 'defense' | 'luck' | 'critDamage', number>>;
  perks?: Perk[];
  playerClass?: PlayerClass | 'All';
  effect?: {
    type: 'heal' | 'mana_heal' | 'apply_buff' | 'guaranteed_flee' | 'cleanse_debuffs';
    percentage?: number;
    flatAmount?: number;
    statusEffect?: StatusEffect;
  };
  isJunk?: boolean;
  upgradeLevel?: number;
  setName?: string;
  setBonusDescription?: string;
  exoticEffect?: {
    id:string;
    description: string;
  };
  isPrimal?: boolean;
}

export interface Equipment {
  helmet: Item | null;
  armor: Item | null;
  weapon: Item | null;
  shield: Item | null;
  boots: Item | null;
  gloves: Item | null;
  amulet: Item | null;
  ring1: Item | null;
  ring2: Item | null;
}

export interface Stat {
  base: number;
  gear: number;
  perks: number;
}

export interface Player {
  hp: number;
  maxHp: Stat;
  en: number;
  maxEn: Stat;
  attack: Stat;
  defense: Stat;
  luck: Stat;
  critDamage: Stat;
  statusEffects: StatusEffect[];
  skills: Skill[];
  position: { x: number; y: number };
  level: number;
  xp: number;
  xpToNextLevel: number;
  inventory: Item[];
  maxInventory: number;
  equipment: Equipment;
  playerClass: PlayerClass;
  gold: number;
  diamonds: number;
  arcaneDust: number;
  reforgingEmbers: number;
  soulEssence: number;
  ownedAppearanceIds: string[];
  equippedPlayerId: string;
  equippedWeaponId: string;
  equippedShieldId: string;
  skillPoints: number;
  learnedSkillNodeIds: string[];
  prestige: number;
  ascensionPoints: number;
  activeQuests: Quest[];
  passiveBonuses: {
    maxHp: { flat: number, percent: number },
    maxEn: { flat: number, percent: number },
    attack: { flat: number, percent: number },
    defense: { flat: number, percent: number },
    luck: { flat: number, percent: number },
    critDamage: { flat: number, percent: number },
  };
  setBonuses: {
    maxHp: { flat: number, percent: number },
    maxEn: { flat: number, percent: number },
    attack: { flat: number, percent: number },
    defense: { flat: number, percent: number },
    luck: { flat: number, percent: number },
    critDamage: { flat: number, percent: number },
  };
  ascensionBonuses: {
    maxHp: { flat: number, percent: number },
    maxEn: { flat: number, percent: number },
    attack: { flat: number, percent: number },
    defense: { flat: number, percent: number },
    goldFind: { percent: number },
    xpGain: { percent: number },
    luck: { flat: number, percent: number },
    critDamage: { flat: number, percent: number },
  };
   guildBonuses: {
    goldFind: { percent: number },
    xpGain: { percent: number },
  };
  runBonuses: {
    maxHp: { flat: number, percent: number },
    maxEn: { flat: number, percent: number },
    attack: { flat: number, percent: number },
    defense: { flat: number, percent: number },
    luck: { flat: number, percent: number },
    critDamage: { flat: number, percent: number },
  };
  learnedAscensionNodeIds: string[];
  arenaTickets: number;
  guild: Guild | null;
  arenaRank: number;
  arenaMarks: number;
  arenaWinStreak: number;
  lastArenaResetDate: string | null;
}

export interface Dungeon {
  level: number;
  grid: string[][];
  description: string;
  visibilityGrid: boolean[][];
  initialEnemyCount: number;
  initialChestCount: number;
}

export interface Nemesis {
  name: string;
  baseEnemyKey: string;
  level: number;
  stats: {
    maxHp: number;
    attack: number;
    defense: number;
  };
  visuals: {
    bgColor: string;
    textColor: string;
    char: string;
  };
}

export interface PlayerProgress {
  highestLevelReached: number;
  highestCharacterLevelReached: number;
  // e.g. { 'crumbling-prison': ['Easy', 'Medium'] }
  completedDifficulties: { [mapKey: string]: Difficulty[] };
  unlockedWorldIds: string[];
  unlockedThemeIds: string[];
  currentWorldId: string;
  discoveredItemIds: string[];
  discoveredEnemyKeys: string[];
  unlockedWorldTiers: { [mapKey: string]: number };
  lastLoginDate: string | null;
  loginStreak: number;
  highestGauntletFloor: number;
  autoJunkRarities: Rarity[];
  synergyMeter: number;
  bestRiftTime: { [weekId: string]: number };
  runStreak: number;
  lastRunCompletedTime: number | null;
  lastRunMapKey: string | null;
  lastRunEliteKills: string[];
  skillUsage: { [skillId: string]: number };
  boonInfusion: { skillId: string; charges: number } | null;
  nemesis: Nemesis | null;
  manifestTreasureActive: boolean;
  claimedCodexRewards: { enemies: string[]; items: string[] };
  completedMilestones: string[];
}

export interface MapInfo {
  key: string;
  name: string;
  description: string;
  themeColors: {
    bg: string;
    border: string;
    text: string;
  };
  templateIndexes: number[];
  requiredLevel: number;
}

export interface Enemy {
  id: string;
  key: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  level: number;
  position: { x: number; y: number };
  xpValue: number;
  goldValue: number;
  statusEffects: StatusEffect[];
  isBoss?: boolean;
  isElite?: boolean;
  isEcho?: boolean;
  isNemesis?: boolean;
  abilities?: {
    id: string;
    chance: number; // 0-1
  }[];
  visuals: {
    bgColor: string;
    textColor: string;
    char: string;
  };
  onDeath?: {
    type: 'explode';
    radius: number;
    damage: number;
  };
  nextAction?: string;
  affixes?: ('Vampiric' | 'ReflectsDamage')[];
}

export interface RunStats {
    startTime: number;
    xpGained: number;
    enemiesSlain: number;
    goldCollected: number;
    elitesSlainThisRun: string[];
    skillUsageThisRun: { [skillId: string]: number };
}

export interface RunSummary {
  outcome: 'victory' | 'defeat';
  timeSpent: number; // in seconds
  goldAcquired: number;
  xpGained: number;
  guardiansSlain: number;
  notableLoot: Item[];
  mapName: string;
  difficulty: Difficulty;
  floorReached?: number;
  isNewBestTime?: boolean;
  nemesisCreated?: Nemesis | null;
}

export type CombatActionType = 'attack' | 'guard' | { type: 'skill', skillId: string } | { type: 'item', itemIndex: number } | 'flee';

export interface DungeonAnomaly {
  id: string;
  name: string;
  description: string;
}

export interface SynergyChoice {
    id: 'manifest' | 'infuse' | 'vision';
    title: string;
    description: string;
}

export interface GameState {
  player: Player;
  dungeon: Dungeon;
  enemies: Enemy[];
  status: 'hub' | 'map-selection' | 'loading' | 'playing' | 'combat' | 'run-summary' | 'arena-combat';
  currentRunType: 'normal' | 'echoing' | 'resonant' | 'chaotic';
  isFirstLoad?: boolean;
  playerProgress: PlayerProgress;
  currentMapKey: string | null;
  currentDifficulty: Difficulty | null;
  currentWorldTier: number | null;
  inventoryPanelOpen: boolean;
  shopOpen: boolean;
  appearanceOpen: boolean;
  diamondShopOpen: boolean;
  characterPanelOpen: boolean;
  skillBookOpen: boolean;
  exitConfirmationOpen: boolean;
  newGameConfirmationOpen: boolean;
  changelogOpen: boolean;
  documentationOpen: boolean;
  useItemModalOpen: boolean;
  fleeConfirmationOpen: boolean;
  forgeOpen: boolean;
  codexOpen: boolean;
  leaderboardOpen: boolean;
  questBoardOpen: boolean;
  ascensionPanelOpen: boolean;
  gamblingPanelOpen: boolean;
  ascensionGridOpen: boolean;
  arenaPanelOpen: boolean;
  arenaInfoOpen: boolean;
  challengeRiftPanelOpen: boolean;
  guildPanelOpen: boolean;
  transmutationPanelOpen: boolean;
  loginRewardPanelOpen: boolean;
  statsBreakdownOpen: boolean;
  playerInspectorOpen: boolean;
  playerInspectorData: PlayerInspectorData | null;
  altarOpen: boolean;
  altarChoices: AltarChoice[] | null;
  activeEnemyId: string | null;
  combatLog: string[];
  combatStatus?: 'player_turn' | 'enemy_turn' | 'ending';
  runStats: RunStats | null;
  runSummary: RunSummary | null;
  runLoot: Item[];
  shopInventory: ShopItem[];
  buybackItems: { item: Item, sellPrice: number }[];
  floorTransitionMessage: string | null;
  isChallengeRift: boolean;
  isGauntlet: boolean;
  arenaOpponents: ArenaOpponent[];
  arenaBattleLogs: BattleLogEntry[];
  skillsUsedThisCombat: string[];
  activeArenaBattle: { opponent: ArenaOpponent; isRevenge: boolean; } | null;
  arenaCombatLog: string[];
  activeAnomalies: DungeonAnomaly[] | null;
  synergyBreakOpen: boolean;
  synergyChoices: SynergyChoice[] | null;
  propheticVisionFloors: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rarity: Rarity;
  item: Item;
  stock: number;
  isSpecial?: boolean;
}

export interface AppearanceItem {
  id:string;
  abbreviatedName: string;
  name: string;
  description: string;
  price: number;
  type: 'player' | 'weapon' | 'shield';
  visuals: {
    bgColor: string;
    textColor: string;
    shadow?: string;
  };
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  type: 'active' | 'passive';
  playerClass: PlayerClass;
  cost: number; // Skill points
  levelRequirement: number;
  dependencies?: string[]; // IDs of other nodes required
  
  // For 'active' type
  skillId?: string; 
  
  // For 'passive' type
  bonuses?: {
    stat: 'maxHp' | 'maxEn' | 'attack' | 'defense' | 'luck' | 'critDamage';
    type: 'flat' | 'percent';
    value: number;
  }[];
}

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryDarker: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryDarker: string;
  success: string;
  successLight: string;
  successDark: string;
  successDarker: string;
  danger: string;
  dangerLight: string;
  dangerDark: string;
  dangerDarker: string;
  info: string;
  infoLight: string;
  infoDark: string;
  infoDarker: string;
  background: string;
  panel: string;
  text: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnSuccess: string;
  textOnDanger: string;
  textOnInfo: string;
}

export interface World {
  id: string;
  name: string;
  description: string;
  theme: ThemeColors;
  enemyKeys: string[];
  bossKey: string;
  requiredWorldId?: string;
  requiredLevel?: number;
}

export interface Quest {
  id: string;
  type: 'daily' | 'weekly' | 'main' | 'tutorial';
  title: string;
  description: string;
  playerClass?: PlayerClass | 'All';
  eventId?: string;
  objective: {
    type: 'slay_enemy' | 'complete_dungeon' | 'upgrade_item' | 'collect_gold';
    targetKey: string; // e.g., 'gloomfangSerpent', 'verdant-labyrinth', or 'any'
    targetValue: number;
    difficultyRequirement?: Difficulty;
  };
  rewards: {
    gold?: number;
    arcaneDust?: number;
    diamonds?: number;
    reforgingEmbers?: number;
  };
  currentValue: number;
  status: 'inactive' | 'active' | 'completed' | 'claimed';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  playerClass: PlayerClass;
  score: number; // Raw score for sorting
  displayScore: string; // Formatted score for display
  prestige: number;
}

export type LeaderboardCategory = 'global' | 'combat' | 'progression' | 'totalPower' | 'uniqueGear' | 'dedication' | 'gauntlet' | 'rift';

export interface AscensionNode {
  id: string;
  name: string;
  description: string;
  cost: number;
  dependencies?: string[];
  playerClass?: PlayerClass | 'All';
  bonuses: {
    stat: 'maxHp' | 'maxEn' | 'attack' | 'defense' | 'goldFind' | 'xpGain' | 'luck' | 'critDamage';
    type: 'flat' | 'percent';
    value: number;
  }[];
}

export interface ArenaOpponent {
  name: string;
  playerClass: PlayerClass;
  level: number;
  power: number; // A combined score of their stats
  rank: number;
  playerSnapshot: Player; // A snapshot for combat simulation
}

export interface BattleLogEntry {
  opponent: ArenaOpponent;
  outcome: 'victory' | 'defeat';
  rankChange: number;
  newRank: number;
  log: string[];
  isRevengeAvailable?: boolean;
}

export interface GuildMember {
    name: string;
    title: 'Guild Master' | 'Officer' | 'Member';
    contribution: number;
}

export interface Guild {
    id: string;
    name: string;
    tag: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    members: GuildMember[];
    activeBounty: GuildBounty | null;
}

export interface GuildBounty {
    quest: Quest;
    guildCurrentValue: number;
}

export interface TransmutationRecipe {
    id: string;
    name: string;
    description: string;
    playerClass?: PlayerClass | 'All';
    input: {
        itemType?: Item['type'];
        rarity?: Rarity;
        count: number;
    };
    output: {
        item: Item;
    } | {
        rarity: Rarity; // For random item of rarity
    };
}

export interface LoginReward {
    day: number;
    item?: Item;
    currency?: {
        type: 'gold' | 'arcaneDust' | 'diamonds' | 'reforgingEmbers' | 'soulEssence';
        amount: number;
    };
    description: string;
}

export interface ChallengeRiftConfig {
    weekId: string;
    title: string;
    description: string;
    presetPlayer: Player;
    modifiers: {
        id: string;
        name: string;
        description: string;
    }[];
    leaderboard: { rank: number; name: string; time: number }[];
}

export interface GlobalEvent {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  endsAt?: number; // timestamp
  lootModifier?: number;
  enemyStatModifier?: number;
  shopModifier?: 'special_stock';
}

export interface PlayerInspectorData {
    name: string;
    playerClass: PlayerClass;
    level: number;
    prestige: number;
    totalPower: number;
    stats: {
        maxHp: number;
        maxEn: number;
        attack: number;
        defense: number;
        luck: number;
        critDamage: number;
    };
    equipment: (Item & { power: number })[];
    bonuses: string[];
}

export type AltarEffectType = 'stat_buff' | 'stat_debuff' | 'give_gold' | 'give_item' | 'heal';
export type AltarStat = 'maxHp' | 'maxEn' | 'attack' | 'defense' | 'luck' | 'critDamage';

export interface AltarEffect {
    type: AltarEffectType;
    stat?: AltarStat;
    valueType?: 'flat' | 'percent';
    value?: number;
    item?: Item;
}
export interface AltarChoice {
    title: string;
    description: string;
    effects: AltarEffect[];
}