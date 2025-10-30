import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { GameState, Player, Dungeon, PlayerProgress, Difficulty, MapInfo, Item, ShopItem, AppearanceItem, Enemy, RunSummary, Stat, PlayerClass, Equipment, Perk, Skill, StatusEffect, CombatActionType, StatusEffectType, SkillNode, World, Quest, ArenaOpponent, Guild, BattleLogEntry, Rarity, PlayerInspectorData, AltarChoice, SynergyChoice, DungeonAnomaly, Nemesis } from './models';
import { MessageService } from './message.service';
import { SKILLS_DATA, SKILL_TREE_DATA } from '../data/skills.data';
import { CONSUMABLES, VERDANT_LABYRINTH_LOOT, BASE_SHOP_CONSUMABLES, EQUIPMENT_SHOP_POOL, SET_BONUSES, GUARDIAN_SET, EPIC_ITEM_POOL, ASCENDANT_ITEMS, MERCHANT_FESTIVAL_SPECIALS, HIGH_TIER_ITEMS } from '../data/items.data';
import { MAPS, DIFFICULTY_SETTINGS, WORLDS } from '../data/maps.data';
import { ENEMY_TYPES } from '../data/enemies.data';
import { APPEARANCE_SHOP_ITEMS } from '../data/appearances.data';
import { QUEST_DATA } from '../data/quests.data';
import { ASCENSION_GRID_DATA } from '../data/ascension.data';
import { MOCK_GUILD, GUILD_BOUNTIES_DATA, NPC_NAMES } from '../data/guilds.data';
import { CURRENT_CHALLENGE_RIFT } from '../data/challenge-rifts.data';
import { LOGIN_REWARDS_DATA } from '../data/login-rewards.data';
import { EventService } from './event.service';
import { ARENA_OPPONENTS_POOL } from '../data/arena.data';
import { ARENA_MODIFIERS } from '../data/arena-modifiers.data';
import { ARENA_SHOP_ITEMS } from '../data/arena-shop.data';
import { ALTAR_CHOICES_DATA } from '../data/altar.data';
import { BOON_DATA, BOON_THRESHOLD } from '../data/boons.data';
import { ANOMALIES_DATA } from '../data/anomalies.data';
import { SYNERGY_CHOICES_DATA } from '../data/synergy.data';

const INITIAL_PLAYER: Player = {
  hp: 100,
  maxHp: { base: 100, gear: 0, perks: 0 },
  en: 100,
  maxEn: { base: 100, gear: 0, perks: 0 },
  attack: { base: 10, gear: 0, perks: 0 },
  defense: { base: 0, gear: 0, perks: 0 },
  luck: { base: 5, gear: 0, perks: 0 },
  critDamage: { base: 50, gear: 0, perks: 0 },
  statusEffects: [],
  skills: [],
  skillPoints: 0,
  learnedSkillNodeIds: [],
  passiveBonuses: {
    maxHp: { flat: 0, percent: 0 },
    maxEn: { flat: 0, percent: 0 },
    attack: { flat: 0, percent: 0 },
    defense: { flat: 0, percent: 0 },
    luck: { flat: 0, percent: 0 },
    critDamage: { flat: 0, percent: 0 },
  },
  setBonuses: {
    maxHp: { flat: 0, percent: 0 },
    maxEn: { flat: 0, percent: 0 },
    attack: { flat: 0, percent: 0 },
    defense: { flat: 0, percent: 0 },
    luck: { flat: 0, percent: 0 },
    critDamage: { flat: 0, percent: 0 },
  },
  ascensionBonuses: {
    maxHp: { flat: 0, percent: 0 },
    maxEn: { flat: 0, percent: 0 },
    attack: { flat: 0, percent: 0 },
    defense: { flat: 0, percent: 0 },
    goldFind: { percent: 0 },
    xpGain: { percent: 0 },
    luck: { flat: 0, percent: 0 },
    critDamage: { flat: 0, percent: 0 },
  },
  runBonuses: {
    maxHp: { flat: 0, percent: 0 },
    maxEn: { flat: 0, percent: 0 },
    attack: { flat: 0, percent: 0 },
    defense: { flat: 0, percent: 0 },
    luck: { flat: 0, percent: 0 },
    critDamage: { flat: 0, percent: 0 },
  },
  learnedAscensionNodeIds: [],
  arenaTickets: 5,
  position: { x: -1, y: -1 },
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  inventory: [],
  maxInventory: 100,
  equipment: { helmet: null, armor: null, weapon: null, shield: null, boots: null, gloves: null, amulet: null, ring1: null, ring2: null },
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
  prestige: 0,
  ascensionPoints: 0,
  activeQuests: [],
  guildBonuses: {
    goldFind: { percent: 0 },
    xpGain: { percent: 0 },
  },
  guild: MOCK_GUILD,
  arenaRank: 1500,
  arenaMarks: 0,
  arenaWinStreak: 0,
  lastArenaResetDate: null,
};

const INITIAL_DUNGEON: Dungeon = {
  level: 0,
  grid: [],
  description: '',
  visibilityGrid: [],
  initialEnemyCount: 0,
  initialChestCount: 0,
};

const INITIAL_PROGRESS: PlayerProgress = {
  highestLevelReached: 0,
  highestCharacterLevelReached: 1,
  completedDifficulties: {},
  unlockedWorldIds: ['verdant-labyrinth'],
  unlockedThemeIds: ['verdant-labyrinth'],
  currentWorldId: 'verdant-labyrinth',
  discoveredItemIds: [],
  discoveredEnemyKeys: [],
  unlockedWorldTiers: {},
  lastLoginDate: null,
  loginStreak: 0,
  highestGauntletFloor: 0,
  autoJunkRarities: ['Common'],
  synergyMeter: 0,
  bestRiftTime: {},
  runStreak: 0,
  lastRunCompletedTime: null,
  lastRunMapKey: null,
  lastRunEliteKills: [],
  skillUsage: {},
  boonInfusion: null,
  nemesis: null,
  manifestTreasureActive: false,
  claimedCodexRewards: { enemies: [], items: [] },
  completedMilestones: [],
};

const RARITY_ORDER: Rarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Artifact', 'Divine', 'Exotic', 'Unique'];

@Injectable({ providedIn: 'root' })
export class GameService {
  private messageService = inject(MessageService);
  private eventService = inject(EventService);

  private readonly _state: WritableSignal<GameState> = signal({
    player: JSON.parse(JSON.stringify(INITIAL_PLAYER)),
    dungeon: INITIAL_DUNGEON,
    enemies: [],
    status: 'hub',
    currentRunType: 'normal',
    playerProgress: JSON.parse(JSON.stringify(INITIAL_PROGRESS)),
    currentMapKey: null,
    currentDifficulty: null,
    currentWorldTier: null,
    inventoryPanelOpen: false,
    shopOpen: false,
    appearanceOpen: false,
    diamondShopOpen: false,
    characterPanelOpen: false,
    skillBookOpen: false,
    exitConfirmationOpen: false,
    newGameConfirmationOpen: false,
    changelogOpen: false,
    documentationOpen: false,
    useItemModalOpen: false,
    fleeConfirmationOpen: false,
    forgeOpen: false,
    codexOpen: false,
    leaderboardOpen: false,
    questBoardOpen: false,
    ascensionPanelOpen: false,
    gamblingPanelOpen: false,
    ascensionGridOpen: false,
    arenaPanelOpen: false,
    arenaInfoOpen: false,
    challengeRiftPanelOpen: false,
    guildPanelOpen: false,
    transmutationPanelOpen: false,
    loginRewardPanelOpen: false,
    statsBreakdownOpen: false,
    playerInspectorOpen: false,
    playerInspectorData: null,
    altarOpen: false,
    altarChoices: null,
    isChallengeRift: false,
    isGauntlet: false,
    arenaOpponents: [],
    arenaBattleLogs: [],
    activeEnemyId: null,
    combatLog: [],
    runStats: null,
    runSummary: null,
    runLoot: [],
    shopInventory: [],
    buybackItems: [],
    floorTransitionMessage: null,
    activeArenaBattle: null,
    arenaCombatLog: [],
    skillsUsedThisCombat: [],
    activeAnomalies: null,
    synergyBreakOpen: false,
    synergyChoices: null,
    propheticVisionFloors: 0,
  });

  public readonly state = this._state.asReadonly();

  constructor() {
    this.loadState();
  }

  public init(): void {
    this.checkLoginRewards();
  }

  private _checkAndAssignQuests(player: Player): Player {
    const newPlayer = { ...player };
    const activeEvent = this.eventService.activeEvent();

    if (!newPlayer.activeQuests || newPlayer.activeQuests.length === 0) {
        const classQuests = QUEST_DATA.filter(q => q.playerClass === newPlayer.playerClass || q.playerClass === 'All');
        
        const dailyQuests = classQuests.filter(q => q.type === 'daily');
        const weeklyQuests = classQuests.filter(q => q.type === 'weekly');
        
        const activeDailies = [];
        const activeWeeklies = [];

        // Event Quest Logic
        let eventQuestAssigned = false;
        if (activeEvent) {
            const eventDaily = dailyQuests.find(q => q.eventId === activeEvent.id);
            if (eventDaily) {
                activeDailies.push({ ...eventDaily, currentValue: 0, status: 'active' });
                eventQuestAssigned = true;
            }
        }

        if (!eventQuestAssigned && dailyQuests.length > 0) {
            // Get a random daily quest that is NOT an event quest
            const nonEventDailies = dailyQuests.filter(q => !q.eventId);
            if (nonEventDailies.length > 0) {
                const randomDaily = nonEventDailies[Math.floor(Math.random() * nonEventDailies.length)];
                activeDailies.push({ ...randomDaily, currentValue: 0, status: 'active' });
            }
        }
        
        if (weeklyQuests.length > 0) {
            // Get a random weekly quest
            const randomWeekly = weeklyQuests[Math.floor(Math.random() * weeklyQuests.length)];
            activeWeeklies.push({ ...randomWeekly, currentValue: 0, status: 'active' });
        }

        newPlayer.activeQuests = [...activeDailies, ...activeWeeklies];
    }
    if (newPlayer.guild && !newPlayer.guild.activeBounty) {
        const bountyTemplate = GUILD_BOUNTIES_DATA[0]; // Take the first one for simplicity
        newPlayer.guild.activeBounty = {
            quest: { ...bountyTemplate, type: 'weekly', currentValue: 0, status: 'active' },
            guildCurrentValue: 0
        };
    }
    return newPlayer;
  }

  private _calculateChecksum(data: string): string {
    return data.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString();
  }

  private loadState(): void {
    try {
      const savedPlayer = localStorage.getItem('player');
      const savedProgress = localStorage.getItem('playerProgress');
      const savedPlayerChecksum = localStorage.getItem('player_checksum');
      const savedProgressChecksum = localStorage.getItem('playerProgress_checksum');
      
      if (savedPlayer && savedProgress && savedPlayerChecksum && savedProgressChecksum) {
        if (this._calculateChecksum(savedPlayer) !== savedPlayerChecksum || this._calculateChecksum(savedProgress) !== savedProgressChecksum) {
            this.messageService.showMessage('Save data corrupted or tampered with. Starting new game.', 'error');
            localStorage.clear();
            return;
        }

        let player = JSON.parse(savedPlayer);
        const progress = JSON.parse(savedProgress);

        // Backwards compatibility for players without a guild
        if (!player.guild) {
            player.guild = MOCK_GUILD;
        }
        if (!player.lastArenaResetDate) {
          player.lastArenaResetDate = null;
        }

        player = this._checkAndAssignQuests(player);

        this._state.update(s => ({ ...s, player, playerProgress: progress }));
        this.messageService.showMessage('Game loaded.', 'success');
      }
    } catch (e) {
      console.error("Failed to load saved state:", e);
      localStorage.clear();
    }
  }

  private saveState(): void {
    try {
      const { player, playerProgress } = this.state();
      const playerData = JSON.stringify(player);
      const progressData = JSON.stringify(playerProgress);
      localStorage.setItem('player', playerData);
      localStorage.setItem('playerProgress', progressData);
      localStorage.setItem('player_checksum', this._calculateChecksum(playerData));
      localStorage.setItem('playerProgress_checksum', this._calculateChecksum(progressData));
    } catch(e) {
      console.error("Failed to save state:", e);
    }
  }
  
  private checkLoginRewards(): void {
    this._state.update(s => {
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = s.playerProgress.lastLoginDate;

      if (lastLogin === today) {
        return s; // Already logged in today
      }

      let newStreak = s.playerProgress.loginStreak;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLogin === yesterday.toISOString().split('T')[0]) {
        newStreak++; // Continued streak
      } else {
        newStreak = 1; // Reset streak
      }
      
      // Cap streak at the max number of rewards
      if (newStreak > LOGIN_REWARDS_DATA.length) {
        newStreak = 1; // Loop back
      }

      return {
        ...s,
        playerProgress: { ...s.playerProgress, loginStreak: newStreak, lastLoginDate: today },
        loginRewardPanelOpen: true,
      };
    });
    this.saveState();
  }

  public getTotalStat(statKey: 'maxHp' | 'maxEn' | 'attack' | 'defense' | 'luck' | 'critDamage', player: Player): number {
    const hasUnstoppableForce = player.learnedAscensionNodeIds.includes('asc_warrior_keystone_unstoppable');

    if (statKey === 'defense' && hasUnstoppableForce) {
        return 0;
    }

    const stat = player[statKey];
    const passives = player.passiveBonuses[statKey] || { flat: 0, percent: 0 };
    const ascensions = player.ascensionBonuses[statKey] || { flat: 0, percent: 0 };
    const runBonuses = player.runBonuses[statKey] || { flat: 0, percent: 0 };

    let effectiveBase = stat.base + stat.gear + passives.flat + ascensions.flat + runBonuses.flat;

    if (statKey === 'attack' && hasUnstoppableForce) {
        const totalDefense = this.getTotalStat('defense', { ...player, learnedAscensionNodeIds: [] }); // Prevent recursion
        effectiveBase += totalDefense;
    }
    
    if (statKey === 'defense') {
        const defenseBoost = player.statusEffects.find(e => e.type === 'defense_boost');
        if (defenseBoost) {
            effectiveBase = Math.floor(effectiveBase * (1 + (defenseBoost.value! / 100)));
        }
    }
    
    const totalPercentMultiplier = 1 + (stat.perks / 100) + (passives.percent / 100) + (ascensions.percent / 100) + (runBonuses.percent / 100);
    return Math.floor(effectiveBase * totalPercentMultiplier);
  }
  
  private _generateLevel(width: number, height: number): { grid: string[][], floorTiles: {x: number, y: number}[], chestCount: number } {
    const grid = Array.from({ length: height }, () => Array(width).fill('#'));
    const floorTiles: {x: number, y: number}[] = [];

    const carver = { x: Math.floor(width / 2), y: Math.floor(height / 2) };
    grid[carver.y][carver.x] = '.';
    floorTiles.push({ ...carver });

    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    const totalFloorTiles = Math.floor(width * height * 0.45);

    let attempts = 0;
    while (floorTiles.length < totalFloorTiles && attempts < totalFloorTiles * 2) {
        const dir = directions[Math.floor(Math.random() * 4)];
        const len = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < len; i++) {
            carver.x += dir[0];
            carver.y += dir[1];

            if (carver.x < 1 || carver.x >= width - 1 || carver.y < 1 || carver.y >= height - 1) {
                const randomTile = floorTiles[Math.floor(Math.random() * floorTiles.length)];
                carver.x = randomTile.x;
                carver.y = randomTile.y;
                break;
            }

            if (grid[carver.y][carver.x] === '#') {
                grid[carver.y][carver.x] = '.';
                floorTiles.push({ ...carver });
            }
        }
        attempts++;
    }
    
    const numChests = Math.floor(Math.random() * 2) + 3;
    for(let i=0; i < numChests && floorTiles.length > 0; i++) {
        const tileIndex = Math.floor(Math.random() * floorTiles.length);
        const tile = floorTiles[tileIndex];
        if(grid[tile.y][tile.x] === '.') {
            grid[tile.y][tile.x] = 'T';
            floorTiles.splice(tileIndex, 1);
        }
    }

    if (Math.random() < 0.3 && floorTiles.length > 0) {
      const tileIndex = Math.floor(Math.random() * floorTiles.length);
      const tile = floorTiles[tileIndex];
      grid[tile.y][tile.x] = 'H';
      floorTiles.splice(tileIndex, 1);
    }
    
    if (Math.random() < 0.15 && floorTiles.length > 0) { // 15% chance for an Altar
        const tileIndex = Math.floor(Math.random() * floorTiles.length);
        const tile = floorTiles[tileIndex];
        grid[tile.y][tile.x] = 'A';
        floorTiles.splice(tileIndex, 1);
    }

    const numTraps = Math.floor(Math.random() * 3) + 1;
    for(let i=0; i < numTraps && floorTiles.length > 0; i++) {
      const tileIndex = Math.floor(Math.random() * floorTiles.length);
      const tile = floorTiles[tileIndex];
      if(grid[tile.y][tile.x] === '.') {
        grid[tile.y][tile.x] = '^';
        floorTiles.splice(tileIndex, 1);
      }
    }

    if (Math.random() < 0.15 && floorTiles.length > 0) {
      const tileIndex = Math.floor(Math.random() * floorTiles.length);
      const tile = floorTiles[tileIndex];
      grid[tile.y][tile.x] = 'C';
      floorTiles.splice(tileIndex, 1);
    }

    return { grid, floorTiles, chestCount: numChests };
}

private generateLoot(): Item {
    const s = this.state();
    const roll = Math.random();
    let newItem: Item;

    let itemLevel = 1;
    if (s.currentDifficulty && s.dungeon && s.dungeon.level > 0) {
        const difficultySetting = DIFFICULTY_SETTINGS[s.currentDifficulty];
        const progress = difficultySetting.finalLevel > 1 ? (s.dungeon.level - 1) / (difficultySetting.finalLevel - 1) : 0;
        const levelSpan = difficultySetting.maxEnemyLevel - difficultySetting.minEnemyLevel;
        const baseLevel = difficultySetting.minEnemyLevel + Math.round(progress * levelSpan);
        const randomBonus = Math.floor(Math.random() * 4);
        itemLevel = Math.max(1, baseLevel + randomBonus - 1);
        itemLevel = Math.min(itemLevel, difficultySetting.maxEnemyLevel + 2);
    }

    if (roll < 0.6) {
        const consumable = CONSUMABLES[Math.floor(Math.random() * CONSUMABLES.length)];
        newItem = { ...consumable };
    } else {
        const lootTable = VERDANT_LABYRINTH_LOOT;
        const itemTemplate = lootTable[Math.floor(Math.random() * lootTable.length)];
        newItem = JSON.parse(JSON.stringify(itemTemplate));

        newItem.level = itemLevel;
        if (newItem.stats) {
            if (itemLevel > 1) {
                const statScalingFactor = 1 + (itemLevel - 1) * 0.15;
                for (const statKey of Object.keys(newItem.stats)) {
                    const key = statKey as keyof typeof newItem.stats;
                    const baseStat = newItem.stats[key];
                    if (baseStat && baseStat > 0) {
                         newItem.stats[key] = Math.max(1, Math.floor(baseStat * statScalingFactor));
                    }
                }
            }
        }

        if (['helmet', 'armor', 'weapon', 'shield', 'boots', 'gloves', 'amulet', 'ring'].includes(newItem.type)) {
            if (Math.random() < 0.5) {
                newItem.perks = [];
                const perkLevel = (Math.floor(Math.random() * 5) + 1) as Perk['level'];
                const perkValue = perkLevel * 3;
                
                let possiblePerkTypes: Perk['type'][] = [];
                switch(newItem.type) {
                    case 'weapon': possiblePerkTypes.push('attack'); break;
                    case 'helmet':
                    case 'armor': 
                    case 'boots':
                    case 'gloves':
                        possiblePerkTypes.push('maxHp'); break;
                    case 'shield': possiblePerkTypes.push('defense'); break;
                    case 'amulet':
                    case 'ring':
                         possiblePerkTypes.push('maxHp', 'maxEn', 'attack', 'defense'); break;
                }

                if (newItem.playerClass === 'Mage') {
                    if (Math.random() < 0.5) {
                        possiblePerkTypes.push('maxEn');
                    }
                }
                
                if (possiblePerkTypes.length > 0) {
                    const perkType = possiblePerkTypes[Math.floor(Math.random() * possiblePerkTypes.length)];
                    newItem.perks.push({
                        type: perkType,
                        level: perkLevel,
                        value: perkValue
                    });
                }
            }
        }
    }
    
    if (['Legendary', 'Mythic', 'Artifact', 'Divine', 'Exotic'].includes(newItem.rarity) || newItem.setName) {
        if (Math.random() < 0.05) {
            newItem.isPrimal = true;
            if (newItem.perks) {
                newItem.perks = newItem.perks.map(perk => ({
                    ...perk,
                    level: 5,
                    value: 15,
                }));
            }
            this.messageService.showMessage(`You found a Primal ${newItem.name}!`, 'success');
        }
    }

    if (s.playerProgress.autoJunkRarities.includes(newItem.rarity)) {
        newItem.isJunk = true;
    }

    return newItem;
}

private _generateEnemyLoot(enemy: Enemy, player: Player, playerProgress: PlayerProgress): { items: Item[], playerProgress: PlayerProgress } {
    const s = this.state();
    let newProgress = { ...playerProgress };
    if (!s.currentDifficulty) return { items: [], playerProgress: newProgress };

    if ((enemy.isBoss || enemy.isElite) && newProgress.manifestTreasureActive) {
        newProgress = { ...playerProgress, manifestTreasureActive: false };
        this.messageService.showMessage('Manifest Treasure reveals a Legendary item!', 'success');
        
        const itemPool = [...EPIC_ITEM_POOL, ...HIGH_TIER_ITEMS.filter(i => i.rarity === 'Legendary')];
        const validPool = itemPool.filter(item => item.playerClass === 'All' || item.playerClass === player.playerClass);
        
        if (validPool.length > 0) {
            const itemTemplate = validPool[Math.floor(Math.random() * validPool.length)];
            let newItem: Item = JSON.parse(JSON.stringify(itemTemplate));
            return { items: [newItem], playerProgress: newProgress };
        }
    }

    if (s.isGauntlet && s.dungeon.level >= 20 && player.prestige > 0) {
        const ascendantChance = player.prestige * 0.01;
        if (Math.random() < ascendantChance) {
            const ascendantItem = ASCENDANT_ITEMS[Math.floor(Math.random() * ASCENDANT_ITEMS.length)];
            this.messageService.showMessage(`An Ascendant item materializes! You found ${ascendantItem.name}!`, 'success');
            const newItem = JSON.parse(JSON.stringify(ascendantItem));
             if (s.playerProgress.autoJunkRarities.includes(newItem.rarity)) {
                newItem.isJunk = true;
            }
            return { items: [newItem], playerProgress: newProgress };
        }
    }

    const itemsToDrop: Item[] = [];
    const numberOfDrops = enemy.isBoss ? 3 : 1;
    const activeEvent = this.eventService.activeEvent();

    for (let i = 0; i < numberOfDrops; i++) {
        const sourceModifier = enemy.isBoss ? 20 : enemy.isElite ? 5 : 1;
        const difficulty = s.currentDifficulty;
        const difficultyModifier = difficulty === 'Medium' ? 1.25 :
                                 difficulty === 'Hard' ? 1.75 :
                                 difficulty === 'Dark' ? 2.0 :
                                 difficulty === 'Dark+' ? 3.0 : 1.0;
        const luckModifier = 1 + (this.getTotalStat('luck', player) / 100);
        const eventLootModifier = activeEvent?.lootModifier ?? 1.0;

        const totalModifier = sourceModifier * difficultyModifier * luckModifier * eventLootModifier;

        const roll = Math.random();
        const finalRoll = Math.pow(roll, totalModifier);

        const cumulativeRarityTable: { rarity: Rarity, threshold: number }[] = [
            { rarity: 'Unique',   threshold: 0.00005 },
            { rarity: 'Exotic',   threshold: 0.0001 },
            { rarity: 'Divine',   threshold: 0.0002 },
            { rarity: 'Artifact', threshold: 0.0005 },
            { rarity: 'Mythic',   threshold: 0.003 },
            { rarity: 'Legendary',threshold: 0.018 },
            { rarity: 'Epic',     threshold: 0.053 },
            { rarity: 'Rare',     threshold: 0.15 },
            { rarity: 'Uncommon', threshold: 0.45 },
            { rarity: 'Common',   threshold: 1.0 }
        ];

        let determinedRarity: Rarity = 'Common';
        for (const tier of cumulativeRarityTable) {
            if (finalRoll <= tier.threshold) {
                determinedRarity = tier.rarity;
                break;
            }
        }
        
        if (['Exotic', 'Unique'].includes(determinedRarity) && player.prestige === 0) {
            determinedRarity = 'Legendary';
        }

        if (enemy.isBoss && i === 0) {
            const rareIndex = RARITY_ORDER.indexOf('Rare');
            if (RARITY_ORDER.indexOf(determinedRarity) < rareIndex) {
                determinedRarity = 'Rare';
            }
        }
        
        const isConsumable = Math.random() < 0.4 && ['Common', 'Uncommon', 'Rare'].includes(determinedRarity);
        
        let pool: Item[] = [];
        if (isConsumable) {
            pool = CONSUMABLES.filter(item => item.rarity === determinedRarity);
        } else {
            pool = VERDANT_LABYRINTH_LOOT.filter(item => 
                item.rarity === determinedRarity &&
                (item.playerClass === 'All' || item.playerClass === player.playerClass)
            );
        }

        if (pool.length === 0) {
            if(isConsumable) {
                pool = CONSUMABLES.filter(item => item.rarity === 'Common');
            } else {
                pool = VERDANT_LABYRINTH_LOOT.filter(item => item.rarity === 'Common' && (item.playerClass === 'All' || item.playerClass === player.playerClass));
            }
            if (pool.length === 0) continue; 
        }
        
        const itemTemplate = pool[Math.floor(Math.random() * pool.length)];
        let newItem: Item = JSON.parse(JSON.stringify(itemTemplate));

        const difficultySetting = DIFFICULTY_SETTINGS[s.currentDifficulty];
        const progress = difficultySetting.finalLevel > 1 ? (s.dungeon.level - 1) / (difficultySetting.finalLevel - 1) : 0;
        const levelSpan = difficultySetting.maxEnemyLevel - difficultySetting.minEnemyLevel;
        const baseLevel = difficultySetting.minEnemyLevel + Math.round(progress * levelSpan);
        const itemLevel = Math.max(1, baseLevel + Math.floor(Math.random() * 3) - 1);
        
        newItem.level = itemLevel;
        if (newItem.stats && itemLevel > 1) {
            const statScalingFactor = 1 + (itemLevel - 1) * 0.15;
            for (const statKey of Object.keys(newItem.stats)) {
                const key = statKey as keyof typeof newItem.stats;
                const baseStat = newItem.stats[key];
                if (baseStat && baseStat > 0) {
                     newItem.stats[key] = Math.max(1, Math.floor(baseStat * statScalingFactor));
                }
            }
        }
        
        // BOON SYSTEM: Check for boon empowerment
        if (newProgress.boonInfusion) {
            const { skillId, charges } = newProgress.boonInfusion;
            const boonDef = BOON_DATA[skillId];

            if (boonDef && boonDef.compatibleTypes.some(t => t === newItem.type) && (boonDef.playerClass === player.playerClass || !boonDef.playerClass)) {
                this.messageService.showMessage(`Your attunement has empowered the ${newItem.name}!`, 'success');
                
                // 1. Upgrade rarity
                const currentRarityIndex = RARITY_ORDER.indexOf(newItem.rarity);
                if (currentRarityIndex < RARITY_ORDER.indexOf('Legendary')) {
                    newItem.rarity = RARITY_ORDER[currentRarityIndex + 1];
                }

                // 2. Add boon perk
                if (!newItem.perks) {
                    newItem.perks = [];
                }
                newItem.perks.push(boonDef.perk);
                
                // 3. Consume boon charge
                if (charges - 1 > 0) {
                    newProgress.boonInfusion = { skillId, charges: charges - 1 };
                } else {
                    newProgress.boonInfusion = null;
                }
            }
        }

        if (['Legendary', 'Mythic', 'Artifact', 'Divine', 'Exotic'].includes(newItem.rarity) || newItem.setName) {
            if (Math.random() < 0.05) {
                newItem.isPrimal = true;
                this.messageService.showMessage(`You found a Primal ${newItem.name}!`, 'success');
            }
        }

        if (s.playerProgress.autoJunkRarities.includes(newItem.rarity)) {
            newItem.isJunk = true;
        }

        itemsToDrop.push(newItem);
    }
    return { items: itemsToDrop, playerProgress: newProgress };
}

  backToHub(): void {
    this._state.update(state => ({
      ...state,
      status: 'hub',
      inventoryPanelOpen: false,
      shopOpen: false,
      appearanceOpen: false,
      diamondShopOpen: false,
      characterPanelOpen: false,
      skillBookOpen: false,
      exitConfirmationOpen: false,
      changelogOpen: false,
      documentationOpen: false,
      useItemModalOpen: false,
      fleeConfirmationOpen: false,
      forgeOpen: false,
      codexOpen: false,
      leaderboardOpen: false,
      questBoardOpen: false,
      runSummary: null,
      isGauntlet: false,
      isChallengeRift: false,
    }));
    this.saveState();
  }

  enterMapSelection(): void {
    this._state.update(s => ({...s, status: 'map-selection'}));
  }

  startNewGame(): void {
    this._state.update(s => {
      const player = this._checkAndAssignQuests(JSON.parse(JSON.stringify(INITIAL_PLAYER)));
      return {
        ...s,
        player,
        playerProgress: JSON.parse(JSON.stringify(INITIAL_PROGRESS)),
        newGameConfirmationOpen: false,
      }
    });
    this.saveState();
    this.messageService.showMessage('New game started. Progress has been reset.', 'success');
  }

  toggleNewGameConfirmation(): void {
    this._state.update(s => ({ ...s, newGameConfirmationOpen: !s.newGameConfirmationOpen }));
  }

  startGauntlet(): void {
    const s = this.state();
    this._state.update(state => ({ ...state, isGauntlet: true }));
    this.startDungeon(s.playerProgress.currentWorldId, 'Easy', null);
    this.messageService.showMessage('The Gauntlet has begun!', 'info');
    this.messageService.showMessage('XP and Gold are not awarded in the Gauntlet.', 'info');
  }

  startDungeon(mapKey: string, difficulty: Difficulty, worldTier: number | null): void {
     this._state.update(state => {
      const player = state.player;
      let newPlayerProgress = { ...state.playerProgress };
      let newRunType: GameState['currentRunType'] = 'normal';
      let activeAnomalies: DungeonAnomaly[] | null = null;

      const timeSinceLastRun = state.playerProgress.lastRunCompletedTime ? Date.now() - state.playerProgress.lastRunCompletedTime : Infinity;
      const ONE_HOUR = 3600 * 1000;

      if (state.playerProgress.lastRunMapKey === mapKey && timeSinceLastRun < ONE_HOUR) {
          const streak = newPlayerProgress.runStreak + 1; // streak is 0-indexed before this run
          if (streak >= 7) {
              newRunType = 'chaotic';
              const anomaly = ANOMALIES_DATA[Math.floor(Math.random() * ANOMALIES_DATA.length)];
              activeAnomalies = [anomaly];
              this.messageService.showMessage(`Chaotic Run! Anomaly: ${anomaly.name}`, 'info');
          } else if (streak >= 4) {
              newRunType = 'resonant';
              this.messageService.showMessage(`Resonant Streak: ${streak}! The dungeon feels unstable...`, 'info');
          } else {
              newRunType = 'echoing';
              this.messageService.showMessage(`Echoing Streak: ${streak}! The dungeon walls hum with energy.`, 'info');
          }
      } else {
          newPlayerProgress.runStreak = 0;
          newPlayerProgress.lastRunEliteKills = [];
      }

      return {
      ...state,
      player: {
        ...player,
        hp: this.getTotalStat('maxHp', player),
        en: this.getTotalStat('maxEn', player),
        position: { x: -1, y: -1 },
        inventory: state.isChallengeRift ? player.inventory : [{...CONSUMABLES.find(c => c.id === 'hp_potion_small')!}],
        gold: 0,
        runBonuses: {
            maxHp: { flat: 0, percent: 0 },
            maxEn: { flat: 0, percent: 0 },
            attack: { flat: 0, percent: 0 },
            defense: { flat: 0, percent: 0 },
            luck: { flat: 0, percent: 0 },
            critDamage: { flat: 0, percent: 0 },
        },
      },
      dungeon: INITIAL_DUNGEON,
      enemies: [],
      currentMapKey: mapKey,
      currentDifficulty: difficulty,
      currentWorldTier: worldTier,
      currentRunType: newRunType,
      activeAnomalies: activeAnomalies,
      playerProgress: newPlayerProgress,
      inventoryPanelOpen: false,
      skillsUsedThisCombat: [],
      runLoot: [],
      runStats: {
        startTime: Date.now(),
        xpGained: 0,
        enemiesSlain: 0,
        goldCollected: 0,
        elitesSlainThisRun: [],
        skillUsageThisRun: {},
      }
    }});
    this.loadLevel(1);
  }

  retryDungeon(): void {
    const { currentMapKey, currentDifficulty, currentWorldTier } = this.state();
    if (currentMapKey && currentDifficulty) {
      this.startDungeon(currentMapKey, currentDifficulty, currentWorldTier);
    } else {
      this.backToHub();
    }
  }

  loadLevel(level: number): void {
    this._state.update(s => ({ ...s, status: 'loading' }));

    const { currentDifficulty, currentMapKey, isGauntlet, currentWorldTier } = this.state();
    if (!currentDifficulty || !currentMapKey) {
      console.error("Attempted to load level without difficulty or mapKey.");
      this.backToHub();
      return;
    }
    
    const difficultySetting = DIFFICULTY_SETTINGS[currentDifficulty];
    const world = WORLDS.find(w => w.id === currentMapKey);
    const activeEvent = this.eventService.activeEvent();
    
    const dungeonSize = 12;
    const { grid, floorTiles, chestCount } = this._generateLevel(dungeonSize, dungeonSize);
    const visibilityGrid = Array.from({ length: dungeonSize }, () => Array(dungeonSize).fill(false));
    
    const mutableFloorTiles = [...floorTiles];
    
    const playerStartIndex = Math.floor(Math.random() * mutableFloorTiles.length);
    const playerPos = mutableFloorTiles.splice(playerStartIndex, 1)[0];
    
    const newEnemies: Enemy[] = [];

    const isBossLevel = !isGauntlet && level === difficultySetting.finalLevel;

    if (world && isBossLevel) {
        const bossTemplate = ENEMY_TYPES[world.bossKey];
        if (bossTemplate && mutableFloorTiles.length > 0) {
            const bossPosIndex = Math.floor(Math.random() * mutableFloorTiles.length);
            const bossPos = mutableFloorTiles.splice(bossPosIndex, 1)[0];
            const multiplier = difficultySetting.enemyStatMultiplier * (activeEvent?.enemyStatModifier ?? 1.0);
            
            newEnemies.push({
                ...bossTemplate,
                id: `boss-${level}`,
                key: world.bossKey,
                position: bossPos,
                statusEffects: [],
                hp: Math.floor(bossTemplate.maxHp * multiplier),
                maxHp: Math.floor(bossTemplate.maxHp * multiplier),
                attack: Math.floor(bossTemplate.attack * multiplier),
                defense: Math.floor(bossTemplate.defense * multiplier),
                level: bossTemplate.level,
            });
        }
    } else {
        const enemyCount = Math.floor(Math.random() * (difficultySetting.maxEnemiesPerLevel - difficultySetting.minEnemiesPerLevel + 1)) + difficultySetting.minEnemiesPerLevel;
        const availableEnemyTypes = world ? world.enemyKeys : Object.keys(ENEMY_TYPES);

        for (let i = 0; i < enemyCount && mutableFloorTiles.length > 0; i++) {
            const enemyPosIndex = Math.floor(Math.random() * mutableFloorTiles.length);
            const enemyPos = mutableFloorTiles.splice(enemyPosIndex, 1)[0];

            let isEchoSpawn = false;
            if (this.state().currentRunType === 'echoing' && this.state().playerProgress.lastRunEliteKills.length > 0 && Math.random() < 0.20) { // 20% chance to spawn an echo
                isEchoSpawn = true;
            }

            const enemyTypeKey = isEchoSpawn 
                ? this.state().playerProgress.lastRunEliteKills[Math.floor(Math.random() * this.state().playerProgress.lastRunEliteKills.length)]
                : availableEnemyTypes[Math.floor(Math.random() * availableEnemyTypes.length)];
            const enemyTemplate = ENEMY_TYPES[enemyTypeKey];
            
            let difficultyMultiplier: number;
            if (isGauntlet) {
                difficultyMultiplier = 1.0 + (level * 0.15);
            } else {
                difficultyMultiplier = difficultySetting.enemyStatMultiplier + (level * 0.08);
            }

            const eventMultiplier = activeEvent?.enemyStatModifier ?? 1.0;
            const prestigeMultiplier = isGauntlet ? 1.0 + (this.state().player.prestige * 0.05) : 1.0;
            const worldTierMultiplier = (currentDifficulty === 'Dark+' && currentWorldTier) ? (1 + (currentWorldTier * 0.1)) : 1.0;

            const finalMultiplier = difficultyMultiplier * eventMultiplier * prestigeMultiplier * worldTierMultiplier;

            const progress = difficultySetting.finalLevel > 1 ? (level - 1) / (difficultySetting.finalLevel - 1) : 0;
            const levelSpan = difficultySetting.maxEnemyLevel - difficultySetting.minEnemyLevel;
            const targetLevel = difficultySetting.minEnemyLevel + Math.round(progress * levelSpan);
            const enemyLevelUnclamped = targetLevel + (Math.floor(Math.random() * 3) - 1);
            const enemyLevel = Math.max(difficultySetting.minEnemyLevel, Math.min(difficultySetting.maxEnemyLevel, enemyLevelUnclamped));

            const isElite = isEchoSpawn || enemyTemplate.isElite || (!enemyTemplate.isBoss && Math.random() < 0.1); // 10% chance for normal enemy to be elite
            let affixes: ('Vampiric' | 'ReflectsDamage')[] = [];
            if (isElite || enemyTemplate.isBoss) {
                const affixRoll = Math.random();
                if (affixRoll < 0.3) {
                    affixes.push('Vampiric');
                } else if (affixRoll < 0.6) {
                    affixes.push('ReflectsDamage');
                }
            }

            newEnemies.push({
                ...enemyTemplate,
                id: `e-${level}-${i}`,
                key: enemyTypeKey,
                position: enemyPos,
                isElite,
                isEcho: isEchoSpawn,
                affixes,
                statusEffects: [],
                hp: Math.floor(enemyTemplate.maxHp * finalMultiplier * (isElite ? 1.5 : 1)),
                maxHp: Math.floor(enemyTemplate.maxHp * finalMultiplier * (isElite ? 1.5 : 1)),
                attack: Math.floor(enemyTemplate.attack * finalMultiplier * (isElite ? 1.2 : 1)),
                defense: Math.floor(enemyTemplate.defense * finalMultiplier * (isElite ? 1.2 : 1)),
                level: enemyLevel,
                xpValue: Math.floor(enemyTemplate.xpValue * finalMultiplier * (isElite ? 2 : 1)),
                goldValue: Math.floor(enemyTemplate.goldValue * finalMultiplier * (isElite ? 2 : 1)),
            });
        }
    }

    const initialVisibilityGrid = this._calculateVisibility(playerPos, visibilityGrid);

    this._state.update(s => ({
      ...s,
      player: { ...s.player, position: playerPos },
      dungeon: {
        level: level,
        grid: grid,
        description: "The air is thick with the scent of damp earth and tangled roots.",
        visibilityGrid: initialVisibilityGrid,
        initialEnemyCount: newEnemies.length,
        initialChestCount: chestCount,
      },
      enemies: newEnemies,
      status: 'playing',
      floorTransitionMessage: isGauntlet ? `Floor ${level}` : `Floor ${level} / ${difficultySetting.finalLevel}`,
    }));

    setTimeout(() => {
        this._state.update(s => ({ ...s, floorTransitionMessage: null }));
    }, 1500);
  }

  private _levelUp(player: Player, progress: PlayerProgress): { player: Player; progress: PlayerProgress } {
    let newPlayer = { ...player };
    let newProgress = { ...progress };

    if (newPlayer.xp >= newPlayer.xpToNextLevel) {
        newPlayer.level += 1;
        newPlayer.xp -= newPlayer.xpToNextLevel;
        newPlayer.maxHp.base += 10;
        newPlayer.maxEn.base += 5;
        newPlayer.attack.base += 2;
        newPlayer.defense.base += 1;
        newPlayer.skillPoints += 1;
        
        if (newPlayer.level > 50) {
            newPlayer.xpToNextLevel = Math.floor(150 * Math.pow(newPlayer.level, 3.1));
        } else {
            newPlayer.xpToNextLevel = Math.floor(100 * Math.pow(newPlayer.level, 2.7));
        }

        this.messageService.showMessage(`You reached Level ${newPlayer.level}! (+1 Skill Point)`, 'success');
    }
    newPlayer.hp = this.getTotalStat('maxHp', newPlayer);
    newPlayer.en = this.getTotalStat('maxEn', newPlayer);


    newProgress.highestCharacterLevelReached = Math.max(newProgress.highestCharacterLevelReached, newPlayer.level);

    return { player: newPlayer, progress: newProgress };
  }

  toggleInventory(): void {
    if (this.state().status === 'playing' || this.state().status === 'combat') {
      this._state.update(s => ({ ...s, inventoryPanelOpen: !s.inventoryPanelOpen }));
    }
  }
  
  setPlayerClass(playerClass: PlayerClass): void {
    this._state.update(s => {
        const player = s.player;
        if (player.playerClass === playerClass) {
            return s;
        }

        let newEquipment = { ...player.equipment };
        let newInventory = [...player.inventory];
        const unequippedItems: Item[] = [];

        for (const slot of Object.keys(newEquipment) as (keyof Equipment)[]) {
            const item = newEquipment[slot];
            if (item && item.playerClass && item.playerClass !== 'All' && item.playerClass !== playerClass) {
                unequippedItems.push(item);
                newEquipment[slot] = null;
            }
        }
        
        if (newInventory.length + unequippedItems.length > player.maxInventory) {
            this.messageService.showMessage("Not enough inventory space to unequip class-specific items.", 'error');
            return s;
        }
        
        newInventory.push(...unequippedItems);

        const totalPointsToRefund = player.learnedSkillNodeIds.reduce((total, id) => {
            const node = SKILL_TREE_DATA.find(n => n.id === id);
            return total + (node?.cost || 0);
        }, 0);
        
        const newSkillPoints = player.skillPoints + totalPointsToRefund;
        const newLearnedSkillNodeIds: string[] = [];
        const newSkills: Skill[] = [];

        const equipmentStats = this.recalculateEquipmentStats(newEquipment);
        
        let newPlayer: Player = {
            ...player,
            playerClass: playerClass,
            inventory: newInventory,
            equipment: newEquipment,
            skillPoints: newSkillPoints,
            learnedSkillNodeIds: newLearnedSkillNodeIds,
            skills: newSkills,
            maxHp: { ...player.maxHp, gear: equipmentStats.gearMaxHp, perks: equipmentStats.perkMaxHp },
            maxEn: { ...player.maxEn, gear: equipmentStats.gearMaxEn, perks: equipmentStats.perkMaxEn },
            attack: { ...player.attack, gear: equipmentStats.gearAttack, perks: equipmentStats.perkAttack },
            defense: { ...player.defense, gear: equipmentStats.gearDefense, perks: equipmentStats.perkDefense },
            luck: { ...player.luck, gear: equipmentStats.gearLuck, perks: equipmentStats.perkLuck },
            critDamage: { ...player.critDamage, gear: equipmentStats.gearCritDamage, perks: equipmentStats.perkCritDamage },
        };
        
        newPlayer = this._recalculatePassiveBonuses(newPlayer);
        
        newPlayer.hp = Math.min(newPlayer.hp, this.getTotalStat('maxHp', newPlayer));
        newPlayer.en = Math.min(newPlayer.en, this.getTotalStat('maxEn', newPlayer));
        
        if (unequippedItems.length > 0) {
            this.messageService.showMessage(`Unequipped ${unequippedItems.length} item(s) due to class change.`, 'success');
        }
        if (totalPointsToRefund > 0) {
            this.messageService.showMessage(`Skills have been reset. ${totalPointsToRefund} skill points refunded.`, 'success');
        }
        this.saveState();
        return { ...s, player: newPlayer };
    });
  }

  toggleCharacterPanel(): void {
    if (this.state().status === 'playing' || this.state().status === 'combat' || this.state().status === 'hub') {
      this._state.update(s => ({ ...s, characterPanelOpen: !s.characterPanelOpen }));
    }
  }

  toggleSkillBook(): void {
    if (this.state().status === 'playing' || this.state().status === 'combat' || this.state().status === 'hub') {
      this._state.update(s => ({ ...s, skillBookOpen: !s.skillBookOpen }));
    }
  }

  toggleUseItemModal(): void {
    if (this.state().status === 'combat') {
      this._state.update(s => ({ ...s, useItemModalOpen: !s.useItemModalOpen }));
    }
  }

  toggleShop(): void {
      this._state.update(s => {
          if (s.shopOpen) {
              return { ...s, shopOpen: false };
          }
          if (s.shopInventory.length === 0) {
              const newShopInventory = this._generateShopInventory(s.player.level);
              return { ...s, shopOpen: true, shopInventory: newShopInventory };
          }
          return { ...s, shopOpen: true };
      });
  }

  toggleAppearance(): void {
    this._state.update(s => ({ ...s, appearanceOpen: !s.appearanceOpen }));
  }
  
  toggleDiamondShop(): void {
    this._state.update(s => ({ ...s, diamondShopOpen: !s.diamondShopOpen }));
  }

  toggleChangelog(): void {
    this._state.update(s => ({ ...s, changelogOpen: !s.changelogOpen }));
  }

  toggleDocumentation(): void {
    this._state.update(s => ({ ...s, documentationOpen: !s.documentationOpen }));
  }

  toggleForge(): void {
    this._state.update(s => ({ ...s, forgeOpen: !s.forgeOpen }));
  }

  toggleCodex(): void {
    this._state.update(s => ({ ...s, codexOpen: !s.codexOpen }));
  }

  toggleLeaderboard(): void {
    this._state.update(s => ({ ...s, leaderboardOpen: !s.leaderboardOpen }));
  }

  toggleQuestBoard(): void {
    this._state.update(s => ({ ...s, questBoardOpen: !s.questBoardOpen }));
  }

  toggleAscensionPanel(): void {
    this._state.update(s => ({ ...s, ascensionPanelOpen: !s.ascensionPanelOpen }));
  }

  toggleGamblingPanel(): void {
      this._state.update(s => ({ ...s, gamblingPanelOpen: !s.gamblingPanelOpen }));
  }

  toggleAscensionGrid(): void {
    this._state.update(s => ({ ...s, ascensionGridOpen: !s.ascensionGridOpen }));
  }

  private _checkArenaTicketReset(): void {
    this._state.update(s => {
        const today = new Date().toISOString().split('T')[0];
        if (s.player.lastArenaResetDate !== today) {
            this.messageService.showMessage('Your daily Arena Tickets have been refreshed.', 'info');
            return {
                ...s,
                player: {
                    ...s.player,
                    arenaTickets: 5,
                    lastArenaResetDate: today
                }
            };
        }
        return s;
    });
    this.saveState();
  }

  toggleArenaPanel(): void {
      this._state.update(s => ({ ...s, arenaPanelOpen: !s.arenaPanelOpen }));
      if (this.state().arenaPanelOpen) { // If we just opened it
          this._checkArenaTicketReset();
      }
  }

  toggleArenaInfo(): void {
      this._state.update(s => ({ ...s, arenaInfoOpen: !s.arenaInfoOpen }));
  }

  toggleChallengeRiftPanel(): void {
      this._state.update(s => ({ ...s, challengeRiftPanelOpen: !s.challengeRiftPanelOpen }));
  }
  
  toggleGuildPanel(): void {
    this._state.update(s => ({ ...s, guildPanelOpen: !s.guildPanelOpen }));
  }

  toggleTransmutationPanel(): void {
    this._state.update(s => ({ ...s, transmutationPanelOpen: !s.transmutationPanelOpen }));
  }

  toggleLoginRewardPanel(): void {
    this._state.update(s => ({ ...s, loginRewardPanelOpen: !s.loginRewardPanelOpen }));
  }

  toggleStatsBreakdown(): void {
    this._state.update(s => ({ ...s, statsBreakdownOpen: !s.statsBreakdownOpen }));
  }

  public togglePlayerInspector(name: string | null): void {
      if (name) {
          const playerClass = Math.random() < 0.5 ? 'Warrior' : 'Mage' as PlayerClass;
          const level = Math.floor(Math.random() * 40) + 10;
          
          const equipment: (Item & { power: number })[] = [];
          const equipmentSlots: Item['type'][] = ['helmet', 'armor', 'weapon', 'shield', 'boots', 'gloves', 'amulet', 'ring', 'ring'];
          const fullItemPool = [...VERDANT_LABYRINTH_LOOT, ...HIGH_TIER_ITEMS];

          for (const slotType of equipmentSlots) {
              if (Math.random() > 0.15) { // 85% chance to have an item in a slot
                  const possibleItems = fullItemPool.filter(i => i.type === slotType && (i.playerClass === 'All' || i.playerClass === playerClass));
                  if (possibleItems.length > 0) {
                      const itemTemplate = possibleItems[Math.floor(Math.random() * possibleItems.length)];
                      const newItem: Item & { power: number } = {
                          ...JSON.parse(JSON.stringify(itemTemplate)),
                          power: 0
                      };
                      newItem.power = this.calculateGearScore(newItem);
                      equipment.push(newItem);
                  }
              }
          }

          const totalPower = equipment.reduce((sum, item) => sum + item.power, 0) + (level * 10);
          
          const newInspectorData: PlayerInspectorData = {
              name,
              playerClass,
              level,
              prestige: Math.floor(Math.random() * 5),
              totalPower,
              stats: {
                  maxHp: Math.floor(totalPower * 1.5) + level * 20,
                  maxEn: Math.floor(totalPower * 0.8) + level * 10,
                  attack: Math.floor(totalPower * 0.5) + level * 5,
                  defense: Math.floor(totalPower * 0.3) + level * 3,
                  luck: Math.floor(totalPower * 0.2) + level,
                  critDamage: Math.floor(totalPower * 0.4) + level * 2,
              },
              equipment,
              bonuses: ['+10% Gold Find (Ascension)', '+5% XP Gain (Guild)', 'Starts combat with Guarding (Set Bonus)']
          };
          this._state.update(s => ({...s, playerInspectorOpen: true, playerInspectorData: newInspectorData }));
      } else {
          this._state.update(s => ({...s, playerInspectorOpen: false, playerInspectorData: null }));
      }
  }

  public createGuild(name: string, tag: string): void {
    this._state.update(s => {
        if (s.player.guild) {
            this.messageService.showMessage("You are already in a guild.", 'error');
            return s;
        }

        const newGuild: Guild = {
            id: `guild_${Date.now()}`,
            name,
            tag,
            level: 1,
            xp: 0,
            xpToNextLevel: 1000,
            members: [{ name: s.player.level.toString(), title: 'Guild Master', contribution: 0 }],
            activeBounty: null
        };

        const newPlayer = { ...s.player, guild: newGuild };
        this.messageService.showMessage(`Guild '${name}' created!`, 'success');
        this.saveState();
        return { ...s, player: newPlayer };
    });
  }

  public recruitGuildMember(): void {
    this._state.update(s => {
        const cost = 5000;
        if (s.player.gold < cost) {
            this.messageService.showMessage(`Not enough gold. Recruiting costs ${cost} G.`, 'error');
            return s;
        }
        if (!s.player.guild) {
            this.messageService.showMessage('You must be in a guild to recruit.', 'error');
            return s;
        }

        let newPlayer = { ...s.player, gold: s.player.gold - cost };
        let newGuild = { ...newPlayer.guild };
        
        const existingNames = new Set(newGuild.members.map(m => m.name));
        let newName: string;
        do {
            newName = NPC_NAMES[Math.floor(Math.random() * NPC_NAMES.length)];
        } while (existingNames.has(newName));

        newGuild.members = [...newGuild.members, { name: newName, title: 'Member', contribution: 0 }];
        newPlayer.guild = newGuild;
        
        this.messageService.showMessage(`Recruited ${newName} to the guild!`, 'success');
        this.saveState();
        return { ...s, player: newPlayer };
    });
  }

  purchaseDiamonds(amount: number): void {
    this._state.update(s => ({
      ...s,
      player: {
        ...s.player,
        diamonds: s.player.diamonds + amount,
      }
    }));
    this.messageService.showMessage(`${amount} Diamonds purchased.`, 'success');
  }

  buyAppearance(itemId: string): void {
    const itemToBuy = APPEARANCE_SHOP_ITEMS.find(i => i.id === itemId);
    if (!itemToBuy) return;

    const player = this.state().player;

    if (player.diamonds < itemToBuy.price) {
        this.messageService.showMessage("Not enough diamonds.", 'error');
        return;
    }
    if (player.ownedAppearanceIds.includes(itemId)) {
        this.messageService.showMessage("Appearance already owned.", 'error');
        return;
    }

    this._state.update(s => {
        const newPlayer = {
            ...s.player,
            diamonds: s.player.diamonds - itemToBuy.price,
            ownedAppearanceIds: [...s.player.ownedAppearanceIds, itemId]
        };
        this.saveState();
        return { ...s, player: newPlayer };
    });
    this.messageService.showMessage(`${itemToBuy.name} appearance purchased.`, 'success');
  }

  applyAppearances(selections: { player: string; weapon: string; shield: string; }): void {
    this._state.update(s => ({
        ...s,
        player: {
            ...s.player,
            equippedPlayerId: selections.player,
            equippedWeaponId: selections.weapon,
            equippedShieldId: selections.shield,
        }
    }));
    this.saveState();
  }

  buyShopItem(itemId: string, quantity: number = 1): void {
    this._state.update(s => {
        const itemToBuy = s.shopInventory.find(i => i.id === itemId);
        if (!itemToBuy) return s;

        const totalCost = itemToBuy.price * quantity;
        if (s.player.gold < totalCost) {
            this.messageService.showMessage("Not enough gold.", 'error');
            return s;
        }

        if (itemToBuy.stock < quantity) {
            this.messageService.showMessage("Not enough stock.", 'error');
            return s;
        }

        const newInventory = [...s.player.inventory];
        for (let i = 0; i < quantity; i++) {
            newInventory.push({ ...itemToBuy.item });
        }
        
        const newShopInventory = s.shopInventory.map(item => 
            item.id === itemId ? { ...item, stock: item.stock - quantity } : item
        );
        
        const newPlayer = {
            ...s.player,
            gold: s.player.gold - totalCost,
            inventory: newInventory
        };

        let newProgress = s.playerProgress;
        if (!newProgress.discoveredItemIds.includes(itemToBuy.item.id)) {
            newProgress = { ...newProgress, discoveredItemIds: [...newProgress.discoveredItemIds, itemToBuy.item.id]};
        }

        this.messageService.showMessage(`${itemToBuy.name} (${quantity}) purchased.`, 'success');
        this.saveState();
        return { ...s, player: newPlayer, shopInventory: newShopInventory, playerProgress: newProgress };
    });
  }
  
  sellItem(itemIndex: number): void {
      this._state.update(s => {
          const player = s.player;
          if (itemIndex < 0 || itemIndex >= player.inventory.length) {
              return s;
          }

          const itemToSell = player.inventory[itemIndex];
          
          let sellPrice = 0;
          const consumableDetails = BASE_SHOP_CONSUMABLES.find(i => i.id === itemToSell.id);
          const equipmentDetails = EQUIPMENT_SHOP_POOL.find(i => i.id === itemToSell.id);

          if (consumableDetails) {
              sellPrice = Math.floor(consumableDetails.price / 2);
          } else if (equipmentDetails) {
              sellPrice = Math.floor(equipmentDetails.price / 2);
          } else if (itemToSell.type !== 'potion' && itemToSell.type !== 'consumable') {
              let basePrice = 10 + (Object.keys(itemToSell.stats || {}).length * 5) + ((itemToSell.perks || []).length * 20);
              basePrice += (itemToSell.upgradeLevel || 0) * 15;
              sellPrice = basePrice;
          } else {
              this.messageService.showMessage(`'${itemToSell.name}' cannot be sold.`, 'error');
              return s;
          }

          const newInventory = [...player.inventory];
          newInventory.splice(itemIndex, 1);

          const newBuybackItems = [{ item: itemToSell, sellPrice }, ...s.buybackItems].slice(0, 10);
          
          const newPlayer = {
              ...player,
              gold: player.gold + sellPrice,
              inventory: newInventory,
          };
          
          this.messageService.showMessage(`${itemToSell.name} sold for ${sellPrice} G.`, 'success');
          this.saveState();
          return { ...s, player: newPlayer, buybackItems: newBuybackItems };
      });
  }

  buybackItem(buybackIndex: number): void {
      this._state.update(s => {
          if (buybackIndex < 0 || buybackIndex >= s.buybackItems.length) return s;

          const buybackEntry = s.buybackItems[buybackIndex];
          const player = s.player;

          if (player.gold < buybackEntry.sellPrice) {
              this.messageService.showMessage("Not enough gold to buy back.", 'error');
              return s;
          }
          if (player.inventory.length >= player.maxInventory) {
              this.messageService.showMessage("Inventory is full.", 'error');
              return s;
          }

          const newBuybackItems = [...s.buybackItems];
          newBuybackItems.splice(buybackIndex, 1);
          
          const newPlayer: Player = {
              ...player,
              gold: player.gold - buybackEntry.sellPrice,
              inventory: [...player.inventory, buybackEntry.item]
          };

          this.messageService.showMessage(`Bought back ${buybackEntry.item.name}.`, 'success');
          this.saveState();
          return { ...s, player: newPlayer, buybackItems: newBuybackItems };
      });
  }
  
  toggleItemJunkStatus(inventoryIndex: number): void {
      this._state.update(s => {
          if (inventoryIndex < 0 || inventoryIndex >= s.player.inventory.length) return s;
          
          const newInventory = s.player.inventory.map((item, index) => {
              if (index === inventoryIndex) {
                  return { ...item, isJunk: !item.isJunk };
              }
              return item;
          });
          
          return { ...s, player: { ...s.player, inventory: newInventory } };
      });
      this.saveState();
  }
  
  sellAllJunk(): void {
      this._state.update(s => {
          const junkIndices = s.player.inventory
              .map((item, index) => ({ item, index }))
              .filter(x => x.item.isJunk)
              .map(x => x.index)
              .reverse();

          if (junkIndices.length === 0) {
              this.messageService.showMessage("No items marked as junk.", 'error');
              return s;
          }
          
          let tempState = s;
          let totalGoldGained = 0;
          for (const index of junkIndices) {
             const player = tempState.player;
             const itemToSell = player.inventory[index];
             let sellPrice = 0;
             const consumableDetails = BASE_SHOP_CONSUMABLES.find(i => i.id === itemToSell.id);
             const equipmentDetails = EQUIPMENT_SHOP_POOL.find(i => i.id === itemToSell.id);

             if (consumableDetails) sellPrice = Math.floor(consumableDetails.price / 2);
             else if (equipmentDetails) sellPrice = Math.floor(equipmentDetails.price / 2);
             else if (itemToSell.type !== 'potion' && itemToSell.type !== 'consumable') sellPrice = 10 + (Object.keys(itemToSell.stats || {}).length * 5) + ((itemToSell.perks || []).length * 20);
             
             if (sellPrice > 0) {
                totalGoldGained += sellPrice;
                const newInventory = [...player.inventory];
                newInventory.splice(index, 1);
                const newBuybackItems = [{ item: {...itemToSell, isJunk: false}, sellPrice }, ...tempState.buybackItems];
                tempState = {
                    ...tempState,
                    player: { ...player, gold: player.gold + sellPrice, inventory: newInventory },
                    buybackItems: newBuybackItems
                };
             }
          }
          
          tempState.buybackItems = tempState.buybackItems.slice(0, 10);
          this.messageService.showMessage(`Sold ${junkIndices.length} junk items for ${totalGoldGained} G.`, 'success');
          this.saveState();
          return tempState;
      });
  }

  useItem(itemIndex: number, inCombat: boolean = false): void {
    this._state.update(s => {
        if (itemIndex < 0 || itemIndex >= s.player.inventory.length) return s;

        const item = s.player.inventory[itemIndex];
        let newPlayer = { ...s.player };

        if (item.effect?.type === 'heal') {
            const maxHp = this.getTotalStat('maxHp', newPlayer);
            if (newPlayer.hp >= maxHp) {
                this.messageService.showMessage("Your health is already full.", 'error');
                return s;
            }
            const healAmount = Math.floor(maxHp * (item.effect.percentage! / 100));
            newPlayer.hp = Math.min(maxHp, newPlayer.hp + healAmount);

            if (newPlayer.equipment.amulet?.exoticEffect?.id === 'soul_battery') {
                const enRestore = Math.floor(healAmount / 2);
                const maxEn = this.getTotalStat('maxEn', newPlayer);
                newPlayer.en = Math.min(maxEn, newPlayer.en + enRestore);
                this.messageService.showMessage(`Used ${item.name}, restored ${healAmount} HP and ${enRestore} EN.`, 'success');
            } else {
                this.messageService.showMessage(`Used ${item.name}, restored ${healAmount} HP.`, 'success');
            }

        } else if (item.effect?.type === 'mana_heal') {
            const maxEn = this.getTotalStat('maxEn', newPlayer);
            if (newPlayer.en >= maxEn) {
                this.messageService.showMessage("Your energy is already full.", 'error');
                return s;
            }
            const restoreAmount = item.effect.flatAmount!;
            newPlayer.en = Math.min(maxEn, newPlayer.en + restoreAmount);
            this.messageService.showMessage(`Used ${item.name}, restored ${restoreAmount} EN.`, 'success');
        } else if (item.effect?.type === 'apply_buff' && inCombat) {
            const buff = item.effect.statusEffect!;
            newPlayer.statusEffects.push({ ...buff });
            this.messageService.showMessage(`Used ${item.name}, gained ${buff.type.replace('_', ' ')}!`, 'success');
        } else if (item.effect?.type === 'cleanse_debuffs') {
            const negativeEffects: StatusEffectType[] = ['poison', 'chilled', 'stun', 'weaken', 'burn', 'bleed'];
            newPlayer.statusEffects = newPlayer.statusEffects.filter(eff => !negativeEffects.includes(eff.type));
             this.messageService.showMessage(`Used ${item.name}, negative effects cleansed.`, 'success');
        } else {
            this.messageService.showMessage(`Cannot use ${item.name} right now.`, 'error');
            return s;
        }

        const newInventory = [...s.player.inventory];
        newInventory.splice(itemIndex, 1);
        newPlayer.inventory = newInventory;

        return { ...s, player: newPlayer };
    });
  }

  public recalculateEquipmentStats(equipment: Equipment): { gearMaxHp: number; gearMaxEn: number; gearAttack: number; gearDefense: number; gearLuck: number; gearCritDamage: number; perkMaxHp: number; perkMaxEn: number; perkAttack: number; perkDefense: number; perkLuck: number; perkCritDamage: number; } {
    const stats = { gearMaxHp: 0, gearMaxEn: 0, gearAttack: 0, gearDefense: 0, gearLuck: 0, gearCritDamage: 0 };
    const perks = { perkMaxHp: 0, perkMaxEn: 0, perkAttack: 0, perkDefense: 0, perkLuck: 0, perkCritDamage: 0 };

    for (const slot in equipment) {
        const item = equipment[slot as keyof Equipment];
        if (item) {
            if (item.stats) {
                stats.gearMaxHp += item.stats.maxHp || 0;
                stats.gearMaxEn += item.stats.maxEn || 0;
                stats.gearAttack += item.stats.attack || 0;
                stats.gearDefense += item.stats.defense || 0;
                stats.gearLuck += item.stats.luck || 0;
                stats.gearCritDamage += item.stats.critDamage || 0;
            }
            if (item.perks) {
                for(const perk of item.perks) {
                    if (perk.type === 'maxHp') perks.perkMaxHp += perk.value;
                    if (perk.type === 'maxEn') perks.perkMaxEn += perk.value;
                    if (perk.type === 'attack') perks.perkAttack += perk.value;
                    if (perk.type === 'defense') perks.perkDefense += perk.value;
                    if (perk.type === 'critDamage') perks.perkCritDamage += perk.value;
                }
            }
        }
    }
    return { ...stats, ...perks };
  }

  equipItem(itemIndex: number): void {
      this._state.update(s => {
          const player = s.player;
          if (itemIndex < 0 || itemIndex >= player.inventory.length) return s;

          const itemToEquip = player.inventory[itemIndex];
          if (!['helmet', 'armor', 'weapon', 'shield', 'boots', 'gloves', 'amulet', 'ring'].includes(itemToEquip.type)) {
              this.messageService.showMessage("This item cannot be equipped.", 'error');
              return s;
          }

          if (itemToEquip.playerClass && itemToEquip.playerClass !== 'All' && itemToEquip.playerClass !== player.playerClass) {
              this.messageService.showMessage(`Cannot equip. Item is for ${itemToEquip.playerClass} class.`, 'error');
              return s;
          }

          const newInventory = [...player.inventory];
          const newEquipment = { ...player.equipment };

          newInventory.splice(itemIndex, 1);
          
          let slot: keyof Equipment;

          if (itemToEquip.type === 'ring') {
            if (!newEquipment.ring1) {
                slot = 'ring1';
            } else if (!newEquipment.ring2) {
                slot = 'ring2';
            } else {
                slot = 'ring1';
            }
          } else {
            slot = itemToEquip.type as keyof Equipment;
          }

          const currentlyEquipped = newEquipment[slot];
          if (currentlyEquipped) {
              newInventory.push(currentlyEquipped);
          }

          newEquipment[slot] = itemToEquip;
          
          const equipmentStats = this.recalculateEquipmentStats(newEquipment);

          const newPlayer = {
              ...player,
              inventory: newInventory,
              equipment: newEquipment,
              maxHp: { ...player.maxHp, gear: equipmentStats.gearMaxHp, perks: equipmentStats.perkMaxHp },
              maxEn: { ...player.maxEn, gear: equipmentStats.gearMaxEn, perks: equipmentStats.perkMaxEn },
              attack: { ...player.attack, gear: equipmentStats.gearAttack, perks: equipmentStats.perkAttack },
              defense: { ...player.defense, gear: equipmentStats.gearDefense, perks: equipmentStats.perkDefense },
              luck: { ...player.luck, gear: equipmentStats.gearLuck, perks: equipmentStats.perkLuck },
              critDamage: { ...player.critDamage, gear: equipmentStats.gearCritDamage, perks: equipmentStats.perkCritDamage },
          };
          
          newPlayer.hp = Math.min(newPlayer.hp, this.getTotalStat('maxHp', newPlayer));
          newPlayer.en = Math.min(newPlayer.en, this.getTotalStat('maxEn', newPlayer));
          
          this.messageService.showMessage(`Equipped ${itemToEquip.name}.`, 'success');
          this.saveState();
          return { ...s, player: newPlayer };
      });
  }

  unequipItem(slot: keyof Equipment): void {
      this._state.update(s => {
          const player = s.player;
          const itemToUnequip = player.equipment[slot];
          if (!itemToUnequip) return s;

          if (player.inventory.length >= player.maxInventory) {
              this.messageService.showMessage("Inventory is full.", 'error');
              return s;
          }

          const newInventory = [...player.inventory, itemToUnequip];
          const newEquipment = { ...player.equipment };
          newEquipment[slot] = null;

          const equipmentStats = this.recalculateEquipmentStats(newEquipment);
          
          const newPlayer = {
              ...player,
              inventory: newInventory,
              equipment: newEquipment,
              maxHp: { ...player.maxHp, gear: equipmentStats.gearMaxHp, perks: equipmentStats.perkMaxHp },
              maxEn: { ...player.maxEn, gear: equipmentStats.gearMaxEn, perks: equipmentStats.perkMaxEn },
              attack: { ...player.attack, gear: equipmentStats.gearAttack, perks: equipmentStats.perkAttack },
              defense: { ...player.defense, gear: equipmentStats.gearDefense, perks: equipmentStats.perkDefense },
              luck: { ...player.luck, gear: equipmentStats.gearLuck, perks: equipmentStats.perkLuck },
              critDamage: { ...player.critDamage, gear: equipmentStats.gearCritDamage, perks: equipmentStats.perkCritDamage },
          };
          
          newPlayer.hp = Math.min(newPlayer.hp, this.getTotalStat('maxHp', newPlayer));
          newPlayer.en = Math.min(newPlayer.en, this.getTotalStat('maxEn', newPlayer));

          this.messageService.showMessage(`Unequipped ${itemToUnequip.name}.`, 'success');
          this.saveState();
          return { ...s, player: newPlayer };
      });
  }

  equipBest(): void {
    this._state.update(s => {
      const player = s.player;
      
      const allPossibleSlots: (keyof Equipment)[] = ['helmet', 'armor', 'weapon', 'shield', 'boots', 'gloves', 'amulet', 'ring1', 'ring2'];
      const itemSlots: Item['type'][] = ['helmet', 'armor', 'weapon', 'shield', 'boots', 'gloves', 'amulet', 'ring'];

      const inventoryGear = player.inventory.filter(i => itemSlots.includes(i.type));
      const equippedGear = Object.values(player.equipment).filter((i): i is Item => i !== null);
      const allGear = [...inventoryGear, ...equippedGear];

      const classFilteredGear = allGear.filter(i => i.playerClass === 'All' || i.playerClass === player.playerClass);

      const getItemScore = (item: Item | null): number => {
        if (!item) return -1;
        let score = 0;
        const stats = item.stats || {};
        const perks = item.perks || [];
        const isMage = player.playerClass === 'Mage';

        const priorities = {
            attack: isMage ? 1 : 2,
            defense: 1.5,
            maxHp: 1,
            maxEn: isMage ? 2 : 0.5,
            luck: 1.2,
            critDamage: 1.8,
        };

        score += (stats.attack || 0) * priorities.attack;
        score += (stats.defense || 0) * priorities.defense;
        score += (stats.maxHp || 0) * priorities.maxHp;
        score += (stats.maxEn || 0) * priorities.maxEn;
        score += (stats.luck || 0) * priorities.luck;
        score += (stats.critDamage || 0) * priorities.critDamage;

        for (const perk of perks) {
            const perkType = perk.type;
            if (perkType === 'skill_enhance') continue;
            const base = player[perkType].base;
            const effectiveStatGain = base * (perk.value / 100);
            const priority = priorities[perkType as keyof Omit<typeof priorities, 'luck'>];
            score += effectiveStatGain * priority;
        }
        return score;
      };
      
      const bestSet: Equipment = { ...INITIAL_PLAYER.equipment };
      
      for (const slot of itemSlots.filter(t => t !== 'ring')) {
        const bestItem = classFilteredGear
          .filter(i => i.type === slot)
          .reduce((best, current) => (!best || getItemScore(current) > getItemScore(best)) ? current : best, null as Item | null);
        if (bestItem) {
            bestSet[slot as keyof Equipment] = bestItem;
        }
      }

      const bestRings = classFilteredGear
        .filter(i => i.type === 'ring')
        .sort((a, b) => getItemScore(b) - getItemScore(a));
      
      if (bestRings[0]) bestSet.ring1 = bestRings[0];
      if (bestRings[1]) bestSet.ring2 = bestRings[1];

      const bestSetItems = new Set(Object.values(bestSet).filter((i): i is Item => i !== null));
      const nonGearInventory = player.inventory.filter(i => !itemSlots.includes(i.type));
      const leftoverGear = allGear.filter(item => !bestSetItems.has(item));
      const newInventory = [...nonGearInventory, ...leftoverGear];

      const newEquipment = bestSet;
      const equipmentStats = this.recalculateEquipmentStats(newEquipment);

      const newPlayer: Player = {
        ...player,
        inventory: newInventory,
        equipment: newEquipment,
        maxHp: { ...player.maxHp, gear: equipmentStats.gearMaxHp, perks: equipmentStats.perkMaxHp },
        maxEn: { ...player.maxEn, gear: equipmentStats.gearMaxEn, perks: equipmentStats.perkMaxEn },
        attack: { ...player.attack, gear: equipmentStats.gearAttack, perks: equipmentStats.perkAttack },
        defense: { ...player.defense, gear: equipmentStats.gearDefense, perks: equipmentStats.perkDefense },
        luck: { ...player.luck, gear: equipmentStats.gearLuck, perks: equipmentStats.perkLuck },
        critDamage: { ...player.critDamage, gear: equipmentStats.gearCritDamage, perks: equipmentStats.perkCritDamage },
      };
      
      newPlayer.hp = Math.min(newPlayer.hp, this.getTotalStat('maxHp', newPlayer));
      newPlayer.en = Math.min(newPlayer.en, this.getTotalStat('maxEn', newPlayer));
      
      let message = 'Optimal gear equipped!';
      this.messageService.showMessage(message, 'success');
      this.saveState();
      return { ...s, player: newPlayer };
    });
  }

  private getRunSummaryState(currentState: GameState, outcome: 'victory' | 'defeat', killer?: Enemy): Partial<GameState> {
    if (!currentState.runStats || !currentState.currentMapKey || !currentState.currentDifficulty) {
      return { status: 'hub', runStats: null, runSummary: null };
    }

    const mapInfo = WORLDS.find(m => m.id === currentState.currentMapKey)!;
    const notableRarities: Rarity[] = ['Rare', 'Epic', 'Legendary', 'Mythic', 'Artifact', 'Divine', 'Exotic'];
    const notableLoot = currentState.runLoot.filter(item => notableRarities.includes(item.rarity));


    const summary: RunSummary = {
      outcome,
      timeSpent: Math.floor((Date.now() - currentState.runStats.startTime) / 1000),
      goldAcquired: currentState.player.gold,
      xpGained: currentState.runStats.xpGained,
      guardiansSlain: currentState.runStats.enemiesSlain,
      notableLoot: notableLoot,
      mapName: mapInfo.name,
      difficulty: currentState.currentDifficulty,
      floorReached: currentState.dungeon.level,
    };

    if (killer && !killer.isBoss && outcome === 'defeat') {
        const nemesis: Nemesis = {
            name: `Grak the ${killer.name}-Slayer`, // Simple name generation
            baseEnemyKey: killer.key,
            level: killer.level + 2,
            stats: {
                maxHp: Math.floor(killer.maxHp * 1.5),
                attack: Math.floor(killer.attack * 1.2),
                defense: Math.floor(killer.defense * 1.2),
            },
            visuals: killer.visuals // In future, could add a visual distinction
        };
        summary.nemesisCreated = nemesis;
    }

    return {
      status: 'run-summary',
      runSummary: summary,
      runStats: null,
      activeEnemyId: null,
      combatLog: [],
      combatStatus: undefined,
      useItemModalOpen: false,
      fleeConfirmationOpen: false,
    };
  }

  private endRun(outcome: 'victory' | 'defeat'): void {
    this._state.update(s => {
        if (s.isChallengeRift) {
            this.messageService.showMessage('Challenge Rift ended!', 'info');
            const summaryState = this.getRunSummaryState(s, outcome);
            const savedPlayer = localStorage.getItem('player');
            const originalPlayer = savedPlayer ? JSON.parse(savedPlayer) : JSON.parse(JSON.stringify(INITIAL_PLAYER));
            
            return {
                ...s,
                ...summaryState,
                player: originalPlayer,
                isChallengeRift: false,
                isGauntlet: false,
            };
        }

        if (s.isGauntlet) {
             let newProgress = { ...s.playerProgress };
             newProgress.highestGauntletFloor = Math.max(newProgress.highestGauntletFloor, s.dungeon.level);
             const summaryState = this.getRunSummaryState(s, 'defeat');
             const finalState = { ...s, ...summaryState, playerProgress: newProgress, shopInventory: [] };
             this.saveState();
             return finalState;
        }
        
        let newPlayer = { ...s.player };
        let newProgress = { ...s.playerProgress };
        const { currentMapKey, currentDifficulty, runStats } = s;

        if (outcome === 'victory' && currentMapKey && currentDifficulty) {
            newPlayer.activeQuests = newPlayer.activeQuests.map(q => {
                if (q.status === 'active' && q.objective.type === 'complete_dungeon') {
                    const difficultyMet = !q.objective.difficultyRequirement ||
                        DIFFICULTY_SETTINGS[currentDifficulty].enemyStatMultiplier >= DIFFICULTY_SETTINGS[q.objective.difficultyRequirement].enemyStatMultiplier;
                    
                    if ((q.objective.targetKey === 'any' || q.objective.targetKey === currentMapKey) && difficultyMet) {
                        q.currentValue++;
                         if (q.currentValue >= q.objective.targetValue) {
                            q.status = 'completed';
                            this.messageService.showMessage(`Quest Completed: ${q.title}`, 'success');
                        }
                    }
                }
                return q;
            });

            const completed = newProgress.completedDifficulties[currentMapKey] || [];
            if (!completed.includes(currentDifficulty)) {
                newProgress.completedDifficulties[currentMapKey] = [...completed, currentDifficulty];
                const difficultyMultiplier = ['Easy', 'Medium', 'Hard', 'Dark', 'Dark+'].indexOf(currentDifficulty) + 1;
                const bonusXp = 500 * difficultyMultiplier * (newPlayer.level / 2);
                newPlayer.xp += bonusXp;
                this.messageService.showMessage(`First Time Victory! +${Math.floor(bonusXp)} bonus XP!`, 'success');
            }

            if (currentDifficulty === 'Dark') {
                const nextWorld = WORLDS.find(w => w.requiredWorldId === currentMapKey);
                if (nextWorld) {
                    if (!newProgress.unlockedWorldIds.includes(nextWorld.id)) {
                        newProgress.unlockedWorldIds = [...newProgress.unlockedWorldIds, nextWorld.id];
                        newProgress.currentWorldId = nextWorld.id;
                        this.messageService.showMessage(`Unlocked World: ${nextWorld.name}!`, 'success');
                    }
                    if (!newProgress.unlockedThemeIds.includes(nextWorld.id)) {
                        newProgress.unlockedThemeIds = [...newProgress.unlockedThemeIds, nextWorld.id];
                        this.messageService.showMessage(`Theme unlocked for ${nextWorld.name}!`, 'info');
                    }
                }
            }
             // Echoing Depths logic
            const timeSinceLastRun = newProgress.lastRunCompletedTime ? Date.now() - newProgress.lastRunCompletedTime : Infinity;
            const ONE_HOUR = 3600 * 1000;
            
            if (newProgress.lastRunMapKey === currentMapKey && timeSinceLastRun < ONE_HOUR) {
                newProgress.runStreak++;
            } else {
                newProgress.runStreak = 1; // Start a new streak
            }
            
            newProgress.lastRunCompletedTime = Date.now();
            newProgress.lastRunMapKey = currentMapKey;
            newProgress.lastRunEliteKills = runStats?.elitesSlainThisRun || [];
        } else { // On defeat, break the streak
            newProgress.runStreak = 0;
            newProgress.lastRunCompletedTime = null;
            newProgress.lastRunMapKey = null;
            newProgress.lastRunEliteKills = [];
        }


        const summaryState = this.getRunSummaryState(s, outcome);
        if (summaryState.runSummary?.nemesisCreated) {
            newProgress.nemesis = summaryState.runSummary.nemesisCreated;
        }
        const finalState = { ...s, ...summaryState, player: newPlayer, playerProgress: newProgress, shopInventory: [] };
        this.saveState();
        return finalState;
    });
}


  toggleExitConfirmation(): void {
    this._state.update(s => ({ ...s, exitConfirmationOpen: !s.exitConfirmationOpen }));
  }

  exitMatch(): void {
    if (this.state().status === 'playing' || this.state().status === 'combat') {
      this.toggleExitConfirmation();
    }
  }

  confirmExitMatch(): void {
    if (this.state().status === 'playing' || this.state().status === 'combat') {
      this.toggleExitConfirmation();
      this.endRun('defeat');
    }
  }

  private endCombat(victory: boolean): void {
      this._state.update(s => {
          let { player, enemies, activeEnemyId, playerProgress, runStats, dungeon, skillsUsedThisCombat, runLoot } = s;
          const enemyIndex = enemies.findIndex(e => e.id === activeEnemyId);
          if (enemyIndex === -1) return { ...s, status: 'playing', activeEnemyId: null, combatLog: [] };
          
          let newPlayer = { ...player };
          let newEnemies = [...enemies];
          let newProgress = { ...playerProgress };
          let newRunStats = runStats ? { ...runStats } : null;
          let newDungeon = dungeon;
          let newRunLoot = [...runLoot];
          const enemy = enemies[enemyIndex];

          if (victory) {
              const dustDropped = Math.floor(Math.random() * (enemy.level + 2)) + 1;
              newPlayer.arcaneDust += dustDropped;
              newPlayer.position = enemy.position;
              newEnemies.splice(enemyIndex, 1);
              
              if (newRunStats) {
                newRunStats.enemiesSlain++;
                if (enemy.isElite) {
                    newRunStats.elitesSlainThisRun.push(enemy.key);
                }
              }

              if (!s.isGauntlet) {
                  let xpGain = enemy.xpValue;
                  let goldGain = enemy.goldValue;
                  
                  if (s.currentRunType === 'echoing') {
                      xpGain = Math.floor(xpGain * 1.25);
                      goldGain = Math.floor(goldGain * 1.25);
                  }

                  newPlayer.xp += xpGain;
                  newPlayer.gold += goldGain;
                  if (newRunStats) {
                      newRunStats.xpGained += xpGain;
                      newRunStats.goldCollected += goldGain;
                  }
              }

              newPlayer.activeQuests = newPlayer.activeQuests.map(q => {
                  if (q.status === 'active' && q.objective.type === 'slay_enemy') {
                      if (q.objective.targetKey === 'any' || 
                          q.objective.targetKey === enemy.key ||
                          (q.objective.targetKey === 'elite' && enemy.isElite)) {
                          q.currentValue++;
                          if (q.currentValue >= q.objective.targetValue) {
                              q.status = 'completed';
                              this.messageService.showMessage(`Quest Completed: ${q.title}`, 'success');
                          }
                      }
                  }
                  return q;
              });

              const lootResult = this._generateEnemyLoot(enemy, newPlayer, newProgress);
              const loot = lootResult.items;
              newProgress = lootResult.playerProgress;

              if (loot.length > 0) {
                  this.messageService.showMessage(`You found ${loot.length} item(s)!`, 'success');
                  newPlayer.inventory.push(...loot);
                  newRunLoot.push(...loot);
              }

              const hasLegendaryOrBetter = loot.some(item => RARITY_ORDER.indexOf(item.rarity) >= RARITY_ORDER.indexOf('Legendary'));
              if (newProgress.manifestTreasureActive) {
                  newProgress.synergyMeter = 0;
                  newProgress.manifestTreasureActive = false;
              } else if (hasLegendaryOrBetter) {
                  newProgress.synergyMeter = 0;
                  this.messageService.showMessage('Your luck has been rewarded! Synergy Meter reset.', 'info');
              } else if (enemy.isElite || enemy.isBoss) {
                  const synergyGain = enemy.isBoss ? 25 : 10;
                  newProgress.synergyMeter = Math.min(100, (newProgress.synergyMeter || 0) + synergyGain);

                  if (newProgress.synergyMeter >= 100) {
                      newProgress.synergyMeter = 0;
                      return {
                          ...s,
                          playerProgress: newProgress,
                          synergyBreakOpen: true,
                          synergyChoices: SYNERGY_CHOICES_DATA,
                      };
                  }
              }

              const xpPerUse = 10 + Math.floor(enemy.level / 2);
              newPlayer.skills = newPlayer.skills.map(skill => {
                  if (skillsUsedThisCombat.includes(skill.id)) {
                      skill.masteryXp += xpPerUse;
                      if (skill.masteryXp >= skill.masteryXpToNextLevel) {
                          skill.masteryLevel++;
                          skill.masteryXp -= skill.masteryXpToNextLevel;
                          skill.masteryXpToNextLevel = Math.floor(skill.masteryXpToNextLevel * 2);
                          skill.masteryBonus = { attack: (skill.masteryBonus?.attack || 0) + 1 };
                          this.messageService.showMessage(`${skill.name} mastery increased to ${skill.masteryLevel}!`, 'success');
                      }
                  }
                  return skill;
              });

              if (!newProgress.discoveredEnemyKeys.includes(enemy.key)) {
                  newProgress.discoveredEnemyKeys.push(enemy.key);
                  this.messageService.showMessage(`Codex Updated: ${enemy.name}`, 'info');
              }

              if (newEnemies.length === 0) {
                const newGrid = dungeon.grid.map(r => [...r]);
                newGrid[enemy.position.y][enemy.position.x] = 'S';
                newDungeon = { ...dungeon, grid: newGrid };
                this.messageService.showMessage('A portal has appeared!', 'success');
              }

              if (newPlayer.xp >= newPlayer.xpToNextLevel) {
                  const result = this._levelUp(newPlayer, newProgress);
                  newPlayer = result.player;
                  newProgress = result.progress;
              }
          }

          return {
              ...s,
              player: newPlayer,
              enemies: newEnemies,
              dungeon: newDungeon,
              playerProgress: newProgress,
              runStats: newRunStats,
              runLoot: newRunLoot,
              status: 'playing',
              activeEnemyId: null,
              combatLog: [],
              combatStatus: undefined,
              useItemModalOpen: false,
              fleeConfirmationOpen: false,
              skillsUsedThisCombat: [],
          };
      });
  }

  playerAttack(): void { this.submitPlayerAction('attack'); }
  guard(): void { this.submitPlayerAction('guard'); }
  useSkill(skillId: string): void { this.submitPlayerAction({ type: 'skill', skillId }); }
  flee(): void { this.submitPlayerAction('flee'); }
  
  submitPlayerAction(action: CombatActionType): void {
      const s = this.state();
      if (s.combatStatus !== 'player_turn') return;
      
      this._state.update(s => this._processPlayerTurn(s, action));
  }

  private _calculateDamage(attacker: Player | Enemy, defender: Player | Enemy, baseAttack: number): number {
    const defenderTotalDefense = 'playerClass' in defender
      ? this.getTotalStat('defense', defender)
      : defender.defense;
    
    let mitigatedDamage = Math.floor(baseAttack * (100 / (100 + defenderTotalDefense)));
    
    const isGuarding = (defender.statusEffects as StatusEffect[]).some(e => e.type === 'guarding' || e.type === 'set_guard');
    if (isGuarding) {
      mitigatedDamage = Math.floor(mitigatedDamage / 2);
    }

    const isWeakened = (defender.statusEffects as StatusEffect[]).some(e => e.type === 'weaken');
    if (isWeakened) {
      mitigatedDamage = Math.floor(mitigatedDamage * 1.25);
    }

    return Math.max(1, mitigatedDamage);
  }

  private _processPlayerTurn(s: GameState, action: CombatActionType): GameState {
    let { player, enemies, activeEnemyId, combatLog, skillsUsedThisCombat, playerProgress } = s;
    if (!activeEnemyId) return s;
    
    const enemy = enemies.find(e => e.id === activeEnemyId);
    if (!enemy) return s;

    let newPlayer = JSON.parse(JSON.stringify(player));
    let newEnemy = JSON.parse(JSON.stringify(enemy));
    let newCombatLog = [...combatLog];
    let newSkillsUsed = [...skillsUsedThisCombat];
    let newProgress = { ...playerProgress };
    let newRunStats = s.runStats ? { ...s.runStats } : null;

    if (action === 'attack') {
        const playerDamage = this._calculateDamage(newPlayer, newEnemy, this.getTotalStat('attack', newPlayer));
        if (newEnemy.affixes?.includes('ReflectsDamage')) {
            const reflectDamage = Math.floor(playerDamage * 0.25);
            newPlayer.hp -= reflectDamage;
            newCombatLog.push(`> ${newEnemy.name}'s ReflectsDamage affix deals ${reflectDamage} damage back to you!`);
        }
        newEnemy.hp -= playerDamage;
        newCombatLog.push(`> You attack ${newEnemy.name} for ${playerDamage} damage.`);
        if (newPlayer.equipment.weapon?.exoticEffect?.id === 'on_hit_chain_lightning') {
            if (Math.random() < 0.25) {
                const lightningDamage = Math.floor(playerDamage * 0.5);
                newEnemy.hp -= lightningDamage;
                newCombatLog.push(`> Storm Caller unleashes Chain Lightning for an extra ${lightningDamage} damage!`);
            }
        }
    } else if (action === 'guard') {
        newPlayer.statusEffects.push({ type: 'guarding', duration: 1 });
        const enRestore = Math.floor(this.getTotalStat('maxEn', newPlayer) * 0.10);
        newPlayer.en = Math.min(this.getTotalStat('maxEn', newPlayer), newPlayer.en + enRestore);
        newCombatLog.push(`> You guard, bracing for an attack and restoring ${enRestore} EN.`);
    } else if (typeof action === 'object' && action !== null) {
        if (action.type === 'skill') {
            const skill = newPlayer.skills.find((s: Skill) => s.id === action.skillId);
            if (skill) {
                const hasArcaneOverload = newPlayer.learnedAscensionNodeIds.includes('asc_mage_keystone_overload');
                if (hasArcaneOverload) {
                    newPlayer.hp -= skill.cost;
                    newCombatLog.push(`> You sacrifice ${skill.cost} HP for power!`);
                } else {
                    newPlayer.en -= skill.cost;
                }

                skill.currentCooldown = skill.cooldown;
                if (!newSkillsUsed.includes(skill.id)) {
                  newSkillsUsed.push(skill.id);
                }

                // BOON SYSTEM: Track skill usage
                if (newRunStats) {
                    if (!newRunStats.skillUsageThisRun) {
                        newRunStats.skillUsageThisRun = {};
                    }
                    const currentUsage = newRunStats.skillUsageThisRun[skill.id] || 0;
                    const newUsage = currentUsage + 1;
                    newRunStats.skillUsageThisRun[skill.id] = newUsage;

                    if (newUsage >= BOON_THRESHOLD && !newProgress.boonInfusion && BOON_DATA[skill.id]) {
                        newProgress.boonInfusion = { skillId: skill.id, charges: 1 };
                        this.messageService.showMessage(`You feel an attunement to ${skill.name}. Your next compatible drop will be empowered.`, 'info');
                    }
                }

                newCombatLog.push(`> You use ${skill.name}!`);
                const masteryAttackBonus = skill.masteryBonus?.attack || 0;
                switch(skill.id) {
                    case 'shield_bash':
                        const bashDamage = this._calculateDamage(newPlayer, newEnemy, 5 + masteryAttackBonus);
                        newEnemy.hp -= bashDamage;
                        newCombatLog.push(`> You bash for ${bashDamage} damage.`);
                        if (Math.random() < 0.8) {
                            newEnemy.statusEffects.push({ type: 'stun', duration: 2 });
                            newCombatLog.push(`> ${newEnemy.name} is stunned!`);
                        }
                        break;
                    case 'frost_nova':
                         const novaDamage = this._calculateDamage(newPlayer, newEnemy, 8 + masteryAttackBonus);
                         newEnemy.hp -= novaDamage;
                         newCombatLog.push(`> The frost nova hits for ${novaDamage} damage.`);
                         newEnemy.statusEffects.push({ type: 'chilled', duration: 4 });
                         newCombatLog.push(`> ${newEnemy.name} is Chilled.`);
                        break;
                    case 'retaliate':
                        newPlayer.statusEffects.push({ type: 'retaliating', duration: 2 });
                        newCombatLog.push(`> You take a defensive stance!`);
                        break;
                    case 'phase_shift':
                        newPlayer.statusEffects.push({ type: 'phased', duration: 2 });
                        const enRestore = 15;
                        newPlayer.en = Math.min(this.getTotalStat('maxEn', newPlayer), newPlayer.en + enRestore);
                        newCombatLog.push(`> You phase out of reality, restoring ${enRestore} EN.`);
                        if (newPlayer.equipment.amulet?.exoticEffect?.id === 'chronos_reset') {
                            newPlayer.skills.forEach((sk: Skill) => {
                                if (sk.id !== 'phase_shift') sk.currentCooldown = 0;
                            });
                            newCombatLog.push(`> The Chronos Pendant resets your other cooldowns!`);
                        }
                        break;
                    case 'cauterize':
                        newPlayer.statusEffects = newPlayer.statusEffects.filter((e: StatusEffect) => e.type !== 'bleed');
                        newPlayer.statusEffects.push({ type: 'enraged', duration: 3 });
                        newCombatLog.push('> You cauterize your wounds, becoming enraged!');
                        break;
                    case 'combustion':
                        const combustionDamage = this._calculateDamage(newPlayer, newEnemy, 15 + masteryAttackBonus);
                        newEnemy.hp -= combustionDamage;
                        const burnDamage = 10 + Math.floor(masteryAttackBonus / 2);
                        newEnemy.statusEffects.push({ type: 'burn', duration: 5, value: burnDamage });
                        newCombatLog.push(`> The combustion hits for ${combustionDamage} and applies a potent burn!`);
                        break;
                }
            }
        }
    } else if (action === 'flee') {
    }

    if (newEnemy.hp <= 0) {
        if (newEnemy.onDeath?.type === 'explode') {
            newCombatLog.push(`> The ${newEnemy.name} explodes!`);
            const explosionDamage = newEnemy.onDeath.damage;
            newPlayer.hp -= explosionDamage;
            newCombatLog.push(`> You take ${explosionDamage} damage from the explosion.`);
            if (newPlayer.hp <= 0) {
                newPlayer.hp = 0;
                newCombatLog.push(`> You have been defeated by the explosion!`);
                const summaryState = this.getRunSummaryState({ ...s, player: newPlayer }, 'defeat');
                return { ...s, player: newPlayer, combatLog: newCombatLog, combatStatus: 'ending', ...summaryState };
            }
        }

        newEnemy.hp = 0;
        newCombatLog.push(`> You defeated the ${newEnemy.name}!`);
        setTimeout(() => this.endCombat(true), 1000);
        return {
            ...s,
            enemies: s.enemies.map(e => e.id === newEnemy.id ? newEnemy : e),
            combatLog: newCombatLog,
            skillsUsedThisCombat: newSkillsUsed,
            playerProgress: newProgress,
            runStats: newRunStats,
            combatStatus: 'ending',
        };
    }

    setTimeout(() => this._processEnemyTurn(), 500);

    return {
        ...s,
        player: newPlayer,
        enemies: s.enemies.map(e => e.id === newEnemy.id ? newEnemy : e),
        combatLog: newCombatLog,
        skillsUsedThisCombat: newSkillsUsed,
        playerProgress: newProgress,
        runStats: newRunStats,
        combatStatus: 'enemy_turn',
    };
  }

  private _processEnemyTurn() {
    this._state.update(s => {
        let { player, enemies, activeEnemyId, combatLog } = s;
        if (!activeEnemyId) return s;
        const enemy = enemies.find(e => e.id === activeEnemyId);
        if (!enemy) return s;

        let newPlayer = JSON.parse(JSON.stringify(player));
        let newEnemy = JSON.parse(JSON.stringify(enemy));
        let newCombatLog = [...combatLog];

        const poison = newPlayer.statusEffects.find((e: StatusEffect) => e.type === 'poison');
        if (poison) {
            const poisonDamage = poison.value || 3;
            newPlayer.hp -= poisonDamage;
            newCombatLog.push(`> You take ${poisonDamage} damage from poison.`);
        }
        const burn = newPlayer.statusEffects.find((e: StatusEffect) => e.type === 'burn');
        if (burn) {
            const burnDamage = burn.value || 5;
            newPlayer.hp -= burnDamage;
            newCombatLog.push(`> You take ${burnDamage} damage from burning.`);
        }
        const bleed = newPlayer.statusEffects.find((e: StatusEffect) => e.type === 'bleed');
        if (bleed) {
            const bleedDamage = bleed.value || 4;
            newPlayer.hp -= bleedDamage;
            newCombatLog.push(`> You take ${bleedDamage} damage from bleeding.`);
        }
        
        if (newPlayer.hp <= 0) {
            newPlayer.hp = 0;
            newCombatLog.push(`> You have been defeated!`);
            const summaryState = this.getRunSummaryState({ ...s, player: newPlayer }, 'defeat', enemy);
            return { ...s, player: newPlayer, combatLog: newCombatLog, ...summaryState };
        }

        if (newEnemy.statusEffects.some((e: StatusEffect) => e.type === 'stun')) {
            newCombatLog.push(`> ${newEnemy.name} is stunned and cannot act!`);
        } else {
            let isGuarding = newPlayer.statusEffects.some((e: StatusEffect) => e.type === 'guarding');
            let isPhased = newPlayer.statusEffects.some((e: StatusEffect) => e.type === 'phased');
            
            if (isPhased) {
                newCombatLog.push(`> ${newEnemy.name}'s attack phases through you harmlessly!`);
            } else {
                let attackPower = 0;
                let attackDescription = '';
                let skipDamagePhase = false;
                let specialMoveUsed = false;
                let finalDamage = 0;

                if (newEnemy.statusEffects.some((e: StatusEffect) => e.type === 'channeling')) {
                    attackPower = newEnemy.attack * 2.5;
                    attackDescription = `${newEnemy.name} unleashes a devastating blow`;
                    newEnemy.statusEffects = newEnemy.statusEffects.filter((e: StatusEffect) => e.type !== 'channeling');
                } else if (newEnemy.abilities && newEnemy.abilities.length > 0) {
                  for (const ability of newEnemy.abilities) {
                    if (Math.random() < ability.chance) {
                      switch (ability.id) {
                        case 'enrage':
                          if (newEnemy.hp < newEnemy.maxHp / 2 && !newEnemy.statusEffects.some(e => e.type === 'enraged')) {
                              newEnemy.statusEffects.push({ type: 'enraged', duration: 999 });
                              newEnemy.statusEffects.push({ type: 'weaken', duration: 999 });
                              newCombatLog.push(`> ${newEnemy.name} enters a Cornered Fury, becoming stronger but vulnerable!`);
                              specialMoveUsed = true;
                          }
                          break;
                        case 'channel_power':
                           const guardianChannelChance = (newEnemy.hp < newEnemy.maxHp * 0.6) ? 0.6 : 0.3;
                           if (Math.random() < guardianChannelChance) {
                                newEnemy.statusEffects.push({ type: 'channeling', duration: 2 });
                                newEnemy.statusEffects.push({ type: 'defense_boost', duration: 2, value: 100 });
                                const message = (newEnemy.hp < newEnemy.maxHp * 0.6)
                                    ? `> Wounded, the ${newEnemy.name} channels desperately, hardening its form!`
                                    : `> ${newEnemy.name} channels ancient power, hardening its form!`;
                                newCombatLog.push(message);
                                specialMoveUsed = true;
                           }
                          break;
                        case 'fade':
                          const playerHasBuffs = newPlayer.statusEffects.some((e: StatusEffect) => ['guarding', 'retaliating', 'defense_boost', 'thorns'].includes(e.type));
                          const spriteFadeChance = playerHasBuffs ? 0.75 : 0.25;
                          if (Math.random() < spriteFadeChance) {
                              newEnemy.statusEffects.push({ type: 'phased', duration: 2 });
                              const message = playerHasBuffs ? `> Sensing your power, the ${newEnemy.name} fades into the shadows!` : `> ${newEnemy.name} fades into the shadows!`;
                              newCombatLog.push(message);
                              specialMoveUsed = true;
                          }
                          break;
                        case 'venom_spit':
                          const playerIsPoisoned = newPlayer.statusEffects.some((e: StatusEffect) => e.type === 'poison');
                          if (!playerIsPoisoned) {
                              const poisonDamage = Math.max(1, Math.floor(newEnemy.attack / 3));
                              newPlayer.statusEffects.push({ type: 'poison', duration: 4, value: poisonDamage, source: 'Venom Spit' });
                              newCombatLog.push(`> ${newEnemy.name} spits venom at you! You are poisoned.`);
                              specialMoveUsed = true;
                          }
                          break;
                        case 'set_guard':
                          newEnemy.statusEffects.push({ type: 'set_guard', duration: 2, value: 50 });
                          newCombatLog.push(`> ${newEnemy.name} hardens its shell!`);
                          specialMoveUsed = true;
                          break;
                        case 'fire_bolt':
                            const playerIsBurning = newPlayer.statusEffects.some((e: StatusEffect) => e.type === 'burn');
                            if (!playerIsBurning) {
                                const burnDamage = Math.max(2, Math.floor(newEnemy.attack / 4));
                                newPlayer.statusEffects.push({ type: 'burn', duration: 3, value: burnDamage, source: 'Fire Bolt'});
                                newCombatLog.push(`> ${newEnemy.name} hurls a fire bolt! You are burning.`);
                                specialMoveUsed = true;
                            }
                            break;
                        case 'bleed_attack':
                            const playerIsBleeding = newPlayer.statusEffects.some((e: StatusEffect) => e.type === 'bleed');
                            if (!playerIsBleeding) {
                                const bleedDamage = Math.max(3, Math.floor(newEnemy.attack / 3));
                                newPlayer.statusEffects.push({ type: 'bleed', duration: 4, value: bleedDamage, source: 'Rending Claws'});
                                newCombatLog.push(`> ${newEnemy.name}'s attack causes you to bleed!`);
                            }
                            break;
                      }
                      if (specialMoveUsed) break;
                    }
                  }
                }

                if (specialMoveUsed) {
                    skipDamagePhase = true;
                } else {
                    attackPower = newEnemy.attack;
                    if (newEnemy.statusEffects.some((e: StatusEffect) => e.type === 'enraged')) {
                        attackPower *= 1.5;
                    }
                    if (newPlayer.statusEffects.some((e: StatusEffect) => e.type === 'chilled')) {
                        attackPower = Math.floor(attackPower * 0.75);
                    }
                    attackDescription = `${newEnemy.name} hits you`;
                }

                if (!skipDamagePhase && attackPower > 0) {
                    finalDamage = this._calculateDamage(newEnemy, newPlayer, attackPower);
                    if (isGuarding) {
                        finalDamage = Math.floor(finalDamage / 2);
                        newCombatLog.push(`> You guard against the attack!`);
                    }

                    if (newPlayer.playerClass === 'Warrior' && !newPlayer.learnedAscensionNodeIds.includes('asc_warrior_keystone_unstoppable')) {
                        let blockChance = 0.15;
                        const isRetaliating = newPlayer.statusEffects.some((e: StatusEffect) => e.type === 'retaliating');
                        if (isRetaliating) {
                            blockChance *= 3;
                        }

                        if (Math.random() < blockChance) {
                            newCombatLog.push(`> You block the attack!`);
                            if (isRetaliating) {
                                const reflectDamage = Math.floor(finalDamage / 2);
                                newEnemy.hp -= reflectDamage;
                                newCombatLog.push(`> You retaliate, reflecting ${reflectDamage} damage!`);
                            }
                            finalDamage = 0;
                        }
                    }

                    if (finalDamage > 0) {
                        newPlayer.hp -= finalDamage;
                        newCombatLog.push(`> ${attackDescription} for ${finalDamage} damage.`);
                    }
                }

                if (newEnemy.affixes?.includes('Vampiric') && finalDamage > 0) {
                    const healAmount = Math.floor(finalDamage * 0.5); // Heal for 50% of damage dealt
                    newEnemy.hp = Math.min(newEnemy.maxHp, newEnemy.hp + healAmount);
                    newCombatLog.push(`> ${newEnemy.name}'s Vampiric affix heals it for ${healAmount} HP.`);
                }
            }
        }

        if (newPlayer.hp <= 0) {
            newPlayer.hp = 0;
            newCombatLog.push(`> You have been defeated!`);
            const summaryState = this.getRunSummaryState({ ...s, player: newPlayer }, 'defeat', enemy);
            return { ...s, player: newPlayer, combatLog: newCombatLog, ...summaryState };
        }

        const tickDown = (effects: StatusEffect[]) => {
            return effects
                .map(e => ({ ...e, duration: e.duration - 1 }))
                .filter(e => e.duration > 0);
        };
        newPlayer.statusEffects = tickDown(newPlayer.statusEffects);
        newEnemy.statusEffects = tickDown(newEnemy.statusEffects);

        newPlayer.skills = newPlayer.skills.map((skill: Skill) => ({
            ...skill,
            currentCooldown: Math.max(0, skill.currentCooldown - 1)
        }));

        const newEnemies = s.enemies.map(e => e.id === newEnemy.id ? newEnemy : e);

        newCombatLog.push(`It's your turn.`);

        return {
            ...s,
            player: newPlayer,
            enemies: newEnemies,
            combatLog: newCombatLog,
            combatStatus: 'player_turn',
        };
    });
  }

    private _calculateVisibility({ x, y }: { x: number; y: number }, visibilityGrid: boolean[][]): boolean[][] {
        const newGrid = visibilityGrid.map(row => [...row]);
        const radius = 3;
        for (let i = Math.max(0, y - radius); i <= Math.min(newGrid.length - 1, y + radius); i++) {
            for (let j = Math.max(0, x - radius); j <= Math.min(newGrid[0].length - 1, x + radius); j++) {
                const distance = Math.sqrt(Math.pow(x - j, 2) + Math.pow(y - i, 2));
                if (distance <= radius) {
                    newGrid[i][j] = true;
                }
            }
        }
        return newGrid;
    }

    private _recalculatePassiveBonuses(player: Player): Player {
        const newPlayer = { ...player };

        newPlayer.passiveBonuses = {
            maxHp: { flat: 0, percent: 0 }, maxEn: { flat: 0, percent: 0 },
            attack: { flat: 0, percent: 0 }, defense: { flat: 0, percent: 0 },
            luck: { flat: 0, percent: 0 },
            critDamage: { flat: 0, percent: 0 },
        };
        newPlayer.skills = [];

        for (const nodeId of newPlayer.learnedSkillNodeIds) {
            const node = SKILL_TREE_DATA.find(n => n.id === nodeId);
            if (node) {
                if (node.type === 'passive' && node.bonuses) {
                    for (const bonus of node.bonuses) {
                        newPlayer.passiveBonuses[bonus.stat][bonus.type] += bonus.value;
                    }
                } else if (node.type === 'active' && node.skillId) {
                    const skillData = SKILLS_DATA.find(s => s.id === node.skillId);
                    if (skillData) {
                        newPlayer.skills.push({ ...skillData, currentCooldown: 0, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 });
                    }
                }
            }
        }
        return newPlayer;
    }

    private _generateShopInventory(playerLevel: number): ShopItem[] {
        const inventory: ShopItem[] = [];
        const player = this.state().player;
        const activeEvent = this.eventService.activeEvent();

        BASE_SHOP_CONSUMABLES.forEach(consumable => {
            inventory.push({ ...consumable, stock: Math.floor(Math.random() * 5) + 3, isSpecial: false });
        });

        const availableEquipment = EQUIPMENT_SHOP_POOL.filter(item => 
            playerLevel >= item.minLevel &&
            (item.item.playerClass === 'All' || item.item.playerClass === player.playerClass)
        );

        if (activeEvent?.shopModifier === 'special_stock') {
            MERCHANT_FESTIVAL_SPECIALS.forEach(special => {
                if (playerLevel >= special.minLevel) {
                    inventory.push({ ...special, stock: 1, isSpecial: true });
                }
            });
        }

        const numEquipmentItems = Math.min(availableEquipment.length, 3 + Math.floor(playerLevel / 5));
        for (let i = 0; i < numEquipmentItems; i++) {
            const itemTemplate = availableEquipment[Math.floor(Math.random() * availableEquipment.length)];
            if (!inventory.some(invItem => invItem.id === itemTemplate.id)) {
                inventory.push({ ...itemTemplate, stock: 1, isSpecial: Math.random() < 0.1 });
            }
        }
        return inventory;
    }

    public movePlayer(dx: number, dy: number): void {
      const s = this.state();
      if (s.status !== 'playing') return;
    
      const { player, dungeon } = s;
      const newX = player.position.x + dx;
      const newY = player.position.y + dy;
      
      const canPhaseWalk = player.equipment.boots?.exoticEffect?.id === 'phase_walk';

      if (newX < 0 || newX >= dungeon.grid[0].length || newY < 0 || newY >= dungeon.grid.length) {
        return;
      }

      if (dungeon.grid[newY][newX] === '#' && !canPhaseWalk) {
        return;
      }
    
      const enemyAtTarget = s.enemies.find(e => e.position.x === newX && e.position.y === newY);
      if (enemyAtTarget) {
        this._state.update(st => ({ ...st, status: 'combat', activeEnemyId: enemyAtTarget.id, combatLog: [`You encounter a ${enemyAtTarget.name}!`], combatStatus: 'player_turn' }));
        return;
      }
      
      const targetTile = dungeon.grid[newY][newX];

      if (targetTile === 'C') {
        this.messageService.showMessage('The chest emanates a dark aura... A monster appears!', 'error');
        this._state.update(st => {
          let newDungeon = { ...st.dungeon, grid: st.dungeon.grid.map(r => [...r]) };
          newDungeon.grid[newY][newX] = '.'; 

          const cursedEnemyTemplate = ENEMY_TYPES['cursedBeast'];
          const multiplier = st.currentDifficulty ? DIFFICULTY_SETTINGS[st.currentDifficulty].enemyStatMultiplier : 1;
          const cursedEnemy: Enemy = {
              ...cursedEnemyTemplate,
              id: `cursed-beast-${newY}-${newX}`,
              key: 'cursedBeast',
              position: { x: newX, y: newY },
              statusEffects: [],
              hp: Math.floor(cursedEnemyTemplate.maxHp * multiplier),
              maxHp: Math.floor(cursedEnemyTemplate.maxHp * multiplier),
              attack: Math.floor(cursedEnemyTemplate.attack * multiplier),
              defense: Math.floor(cursedEnemyTemplate.defense * multiplier),
          };

          const newEnemies = [...st.enemies, cursedEnemy];
          return {
            ...st,
            dungeon: newDungeon,
            enemies: newEnemies,
            status: 'combat',
            activeEnemyId: cursedEnemy.id,
            combatLog: [`A ${cursedEnemy.name} bursts from the chest!`],
            combatStatus: 'player_turn'
          };
        });
        return;
      }

      if (targetTile === 'A') {
        this.messageService.showMessage('You have found a mysterious altar.', 'info');
        this._state.update(st => {
            let newDungeon = { ...st.dungeon, grid: st.dungeon.grid.map(r => [...r]) };
            newDungeon.grid[newY][newX] = '.'; // Altar is used up
            
            const choices: AltarChoice[] = [];
            const availableChoices = [...ALTAR_CHOICES_DATA];
            for (let i = 0; i < 3 && availableChoices.length > 0; i++) {
                const choiceIndex = Math.floor(Math.random() * availableChoices.length);
                choices.push(availableChoices.splice(choiceIndex, 1)[0]);
            }
    
            return {
                ...st,
                dungeon: newDungeon,
                altarOpen: true,
                altarChoices: choices,
                player: { ...st.player, position: { x: newX, y: newY } }
            };
        });
        return;
      }

      if (targetTile === 'S') {
          if (s.isGauntlet) {
              this.loadLevel(s.dungeon.level + 1);
              return;
          }
          const difficultySetting = DIFFICULTY_SETTINGS[s.currentDifficulty!];
          if (s.dungeon.level === difficultySetting.finalLevel) {
              this.endRun('victory');
          } else {
              this.loadLevel(s.dungeon.level + 1);
          }
          return;
      }
    
      this._state.update(st => {
        let newPlayer = { ...st.player, position: { x: newX, y: newY } };
        let newDungeon = { ...st.dungeon, grid: st.dungeon.grid.map(r => [...r]) };
        let newProgress = st.playerProgress;
        let newRunLoot = st.runLoot;
    
        const currentTile = newDungeon.grid[newY][newX];
        if (currentTile === 'T') {
          this.messageService.showMessage('You found a chest!', 'success');
          const loot = this.generateLoot();
          newPlayer.inventory.push(loot);
          newRunLoot = [...st.runLoot, loot];
          if (!newProgress.discoveredItemIds.includes(loot.id)) {
             newProgress = {...newProgress, discoveredItemIds: [...newProgress.discoveredItemIds, loot.id]};
          }
          newDungeon.grid[newY][newX] = '.';
        } else if (currentTile === 'H') {
          this.messageService.showMessage('You drink from the Fountain of Healing!', 'success');
          const maxHp = this.getTotalStat('maxHp', newPlayer);
          const maxEn = this.getTotalStat('maxEn', newPlayer);
          newPlayer.hp = maxHp;
          newPlayer.en = maxEn;
          newDungeon.grid[newY][newX] = '.';
        } else if (currentTile === '^') {
          const damage = Math.floor(this.getTotalStat('maxHp', newPlayer) * 0.1);
          newPlayer.hp = Math.max(1, newPlayer.hp - damage);
          this.messageService.showMessage(`You stepped on a hidden trap and took ${damage} damage!`, 'error');
          newDungeon.grid[newY][newX] = '.';
        }
    
        newDungeon.visibilityGrid = this._calculateVisibility(newPlayer.position, st.dungeon.visibilityGrid);
        return { ...st, player: newPlayer, dungeon: newDungeon, playerProgress: newProgress, runLoot: newRunLoot };
      });
    }

    public calculateGearScore(item: Item): number {
        if (!item) return 0;
        let score = (item.stats?.attack || 0) * 2 + (item.stats?.defense || 0) * 1.5 + (item.stats?.maxHp || 0) * 1 + (item.stats?.maxEn || 0) * 0.75;
        (item.perks || []).forEach(p => {
            if (p.type !== 'skill_enhance') {
                score += p.value * 5;
            }
        });
        const rarityMultiplier = { 'Common': 1, 'Uncommon': 1.2, 'Rare': 1.5, 'Epic': 2, 'Legendary': 2.5, 'Mythic': 3, 'Artifact': 3.5, 'Divine': 4, 'Exotic': 5, 'Unique': 10 };
        score *= rarityMultiplier[item.rarity];
        return Math.floor(score);
    }
    
    public requestFlee(): void { this._state.update(s => ({ ...s, fleeConfirmationOpen: true })); }
    public cancelFlee(): void { this._state.update(s => ({ ...s, fleeConfirmationOpen: false })); }
    public confirmFlee(): void {
        this._state.update(s => {
            if (s.status !== 'combat') return s;
            if (Math.random() < 0.75) {
                this.messageService.showMessage('You successfully fled!', 'success');
                return { ...s, status: 'playing', activeEnemyId: null, combatLog: [], combatStatus: undefined, fleeConfirmationOpen: false };
            } else {
                this.messageService.showMessage('Flee attempt failed!', 'error');
                const newState = this._processPlayerTurn(s, 'flee');
                return { ...newState, combatLog: [...s.combatLog, '> Your attempt to flee failed!'], fleeConfirmationOpen: false };
            }
        });
    }
    
    public learnSkillNode(nodeId: string): void {
        this._state.update(s => {
            const node = SKILL_TREE_DATA.find(n => n.id === nodeId);
            const player = s.player;
            if (!node || player.skillPoints < node.cost) return s;
            let newPlayer = { ...player, skillPoints: player.skillPoints - node.cost, learnedSkillNodeIds: [...player.learnedSkillNodeIds, nodeId] };
            newPlayer = this._recalculatePassiveBonuses(newPlayer);
            this.messageService.showMessage(`Learned: ${node.name}`, 'success');
            this.saveState();
            return { ...s, player: newPlayer };
        });
    }

    public respecSkills(): void {
        this._state.update(s => {
            const player = s.player;
            const cost = player.level * 100;
            if (player.gold < cost) return s;
            const pointsRefunded = player.learnedSkillNodeIds.reduce((total, id) => total + (SKILL_TREE_DATA.find(n => n.id === id)?.cost || 0), 0);
            let newPlayer = { ...player, gold: player.gold - cost, skillPoints: player.skillPoints + pointsRefunded, learnedSkillNodeIds: [] };
            newPlayer = this._recalculatePassiveBonuses(newPlayer);
            this.messageService.showMessage(`Skills reset. ${pointsRefunded} points refunded for ${cost} G.`, 'success');
            this.saveState();
            return { ...s, player: newPlayer };
        });
    }
    
    public upgradeItem(itemIndex: number): void {
        this._state.update(s => {
            const item = s.player.inventory[itemIndex];
            if (!item) return s;
            const currentLevel = item.upgradeLevel || 0;
            const cost = 10 + (currentLevel * 5) + Math.floor(Math.pow(1.2, currentLevel));
            if (s.player.arcaneDust < cost) return s;

            const newItem = { ...item, stats: { ...(item.stats || {}) }, upgradeLevel: currentLevel + 1 };
            if (newItem.stats) {
                switch (newItem.type) {
                    case 'weapon': newItem.stats.attack = (newItem.stats.attack || 0) + 1; break;
                    case 'armor': newItem.stats.defense = (newItem.stats.defense || 0) + 1; newItem.stats.maxHp = (newItem.stats.maxHp || 0) + 5; break;
                    case 'helmet': newItem.stats.maxHp = (newItem.stats.maxHp || 0) + 3; newItem.stats.maxEn = (newItem.stats.maxEn || 0) + 3; break;
                    case 'shield': newItem.stats.defense = (newItem.stats.defense || 0) + 2; break;
                }
            }
            const newInventory = [...s.player.inventory];
            newInventory[itemIndex] = newItem;
            const newPlayer = { ...s.player, arcaneDust: s.player.arcaneDust - cost, inventory: newInventory };
            this.messageService.showMessage(`${newItem.name} upgraded to +${newItem.upgradeLevel}!`, 'success');
            this.saveState();
            return { ...s, player: newPlayer };
        });
    }
    
  public claimQuestReward(questId: string): void {
    this._state.update(s => {
      const player = { ...s.player };
      const questIndex = player.activeQuests.findIndex(q => q.id === questId);

      if (questIndex === -1) {
        this.messageService.showMessage('Quest not found.', 'error');
        return s;
      }

      const quest = player.activeQuests[questIndex];
      if (quest.status !== 'completed') {
        this.messageService.showMessage('Quest is not yet completed.', 'error');
        return s;
      }

      // Add rewards
      if (quest.rewards.gold) {
        player.gold += quest.rewards.gold;
      }
      if (quest.rewards.arcaneDust) {
        player.arcaneDust += quest.rewards.arcaneDust;
      }
      if (quest.rewards.diamonds) {
        player.diamonds += quest.rewards.diamonds;
      }
      if (quest.rewards.reforgingEmbers) {
        player.reforgingEmbers += quest.rewards.reforgingEmbers;
      }

      // Update quest status
      const newActiveQuests = [...player.activeQuests];
      newActiveQuests[questIndex] = { ...quest, status: 'claimed' };
      const newPlayer = { ...player, activeQuests: newActiveQuests };

      this.messageService.showMessage(`Rewards for "${quest.title}" claimed!`, 'success');
      
      return { ...s, player: newPlayer };
    });
    this.saveState();
  }

    public getRequiredLevelForAscension(prestige: number): number {
        return 50 + (prestige * 10);
    }

    public ascendPlayer(): void {
        this._state.update(s => {
            const player = s.player;
            const requiredLevel = this.getRequiredLevelForAscension(player.prestige);
            if (player.level < requiredLevel) {
                this.messageService.showMessage(`You must reach Level ${requiredLevel} to Ascend.`, 'error');
                return s;
            }
            
            const pointsFromPrestige = 10;

            const newPlayer: Player = {
                ...player,
                level: 1,
                xp: 0,
                xpToNextLevel: 100,
                gold: 0,
                skillPoints: player.level -1,
                learnedSkillNodeIds: [],
                skills: [],
                prestige: player.prestige + 1,
                ascensionPoints: player.ascensionPoints + pointsFromPrestige,
            };

            const finalPlayer = this._recalculatePassiveBonuses(newPlayer);
            finalPlayer.hp = this.getTotalStat('maxHp', finalPlayer);
            finalPlayer.en = this.getTotalStat('maxEn', finalPlayer);

            this.messageService.showMessage(`Ascended to Prestige ${finalPlayer.prestige}! You earned ${pointsFromPrestige} Ascension Points.`, 'success');
            this.saveState();
            return { ...s, player: finalPlayer, ascensionPanelOpen: false };
        });
    }

  public learnAscensionNode(nodeId: string): void {
    this._state.update(s => {
      const node = ASCENSION_GRID_DATA.find(n => n.id === nodeId);
      if (!node) {
        this.messageService.showMessage('Ascension node not found.', 'error');
        return s;
      }
      
      const player = s.player;

      if (player.ascensionPoints < node.cost) {
        this.messageService.showMessage('Not enough Ascension Points.', 'error');
        return s;
      }
      if (player.learnedAscensionNodeIds.includes(nodeId)) {
        this.messageService.showMessage('Node already learned.', 'error');
        return s;
      }
      if (node.dependencies) {
        for (const depId of node.dependencies) {
          if (!player.learnedAscensionNodeIds.includes(depId)) {
            this.messageService.showMessage('Dependencies not met.', 'error');
            return s;
          }
        }
      }

      const newPlayer = JSON.parse(JSON.stringify(player));
      
      newPlayer.ascensionPoints -= node.cost;
      newPlayer.learnedAscensionNodeIds.push(nodeId);

      for (const bonus of node.bonuses) {
        const bonusTarget = newPlayer.ascensionBonuses[bonus.stat];
        if (bonusTarget) {
            if (bonus.type === 'flat' && 'flat' in bonusTarget) {
                (bonusTarget as { flat: number }).flat += bonus.value;
            }
            if (bonus.type === 'percent' && 'percent' in bonusTarget) {
                (bonusTarget as { percent: number }).percent += bonus.value;
            }
        }
      }
      
      const newMaxHp = this.getTotalStat('maxHp', newPlayer);
      const newMaxEn = this.getTotalStat('maxEn', newPlayer);
      newPlayer.hp = Math.min(newPlayer.hp, newMaxHp);
      newPlayer.en = Math.min(newPlayer.en, newMaxEn);

      this.messageService.showMessage(`Learned Ascension: ${node.name}`, 'success');

      return { ...s, player: newPlayer };
    });
    this.saveState();
  }
    
    public gambleForItem(type: 'weapon' | 'helmet' | 'armor' | 'shield'): void {
        this._state.update(s => {
          const player = s.player;
          const costMap = { weapon: 500, helmet: 400, armor: 450, shield: 350 };
          const cost = costMap[type];
    
          if (player.gold < cost) {
            this.messageService.showMessage('Not enough gold.', 'error');
            return s;
          }
          if (player.inventory.length >= player.maxInventory) {
            this.messageService.showMessage('Inventory is full.', 'error');
            return s;
          }
    
          const newPlayer = { ...player, gold: player.gold - cost };
          
          const roll = Math.random();
          let rarity: Rarity;
          if (roll < 0.5) rarity = 'Common';
          else if (roll < 0.8) rarity = 'Uncommon';
          else if (roll < 0.95) rarity = 'Rare';
          else if (roll < 0.99) rarity = 'Epic';
          else rarity = 'Legendary';
    
          const pool = [...VERDANT_LABYRINTH_LOOT, ...EQUIPMENT_SHOP_POOL.map(i => i.item)]
            .filter(item => 
                item.type === type && 
                item.rarity === rarity &&
                (item.playerClass === 'All' || item.playerClass === newPlayer.playerClass)
            );
          
          let newItem: Item;
          if (pool.length > 0) {
            newItem = { ...pool[Math.floor(Math.random() * pool.length)] };
          } else {
            this.messageService.showMessage('The gambler had nothing for you...', 'info');
            return { ...s, player: newPlayer };
          }
          
          newPlayer.inventory.push(newItem);
          this.messageService.showMessage(`You received: ${newItem.name}!`, 'success');
          this.saveState();
          return { ...s, player: newPlayer };
        });
    }

    public gambleForSetItem(): void {
        this._state.update(s => {
          const player = s.player;
          const cost = 2500;
          if (player.gold < cost) {
            this.messageService.showMessage('Not enough gold.', 'error');
            return s;
          }
          if (player.inventory.length >= player.maxInventory) {
            this.messageService.showMessage('Inventory is full.', 'error');
            return s;
          }
    
          const newPlayer = { ...player, gold: player.gold - cost };
          const setItem = GUARDIAN_SET[Math.floor(Math.random() * GUARDIAN_SET.length)];
          
          newPlayer.inventory.push({ ...setItem });
          this.messageService.showMessage(`You received a set piece: ${setItem.name}!`, 'success');
          this.saveState();
          return { ...s, player: newPlayer };
        });
    }

    public getCurrentArenaModifier() {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const weekNumber = Math.ceil((((now.getTime() - startOfYear.getTime()) / 86400000) + startOfYear.getDay() + 1) / 7);
      return ARENA_MODIFIERS[weekNumber % ARENA_MODIFIERS.length];
    }

    public getArenaOpponents(): void {
        this._state.update(s => {
            const playerRank = s.player.arenaRank;
            const shuffled = [...ARENA_OPPONENTS_POOL].sort(() => 0.5 - Math.random());
            const opponents = shuffled.slice(0, 3).map(opp => ({
                ...opp,
                rank: playerRank + Math.floor(Math.random() * 50) - 25 // make rank relative to player
            }));
    
            return { ...s, arenaOpponents: opponents };
        });
    }

    public startArenaBattle(opponent: ArenaOpponent, isRevenge: boolean = false): void {
        this._state.update(s => {
            if (!isRevenge && s.player.arenaTickets <= 0) {
                this.messageService.showMessage("Not enough Arena Tickets.", 'error');
                return s;
            }
    
            const battleLog: string[] = [];
            const modifier = this.getCurrentArenaModifier();
            let playerHp = this.getTotalStat('maxHp', s.player);
            let opponentHp = opponent.playerSnapshot.maxHp.base;
            const playerLifesteal = modifier.id === 'bloodlust' ? 0.10 : 0;
    
            battleLog.push(`The match between your hero and ${opponent.name} begins!`);
            battleLog.push(`Weekly Modifier: ${modifier.name}`);
    
            for (let i = 0; i < 5; i++) { // Max 5 turns for simulation
                // Player turn
                let playerDamage = Math.floor(this.getTotalStat('attack', s.player) * (0.9 + Math.random() * 0.2));
                playerDamage = this._calculateDamage(s.player, opponent.playerSnapshot, playerDamage);
                opponentHp -= playerDamage;
                battleLog.push(`> You attack ${opponent.name} for ${playerDamage} damage.`);
                if (playerLifesteal > 0) {
                    const heal = Math.floor(playerDamage * playerLifesteal);
                    playerHp = Math.min(this.getTotalStat('maxHp', s.player), playerHp + heal);
                    battleLog.push(`> You heal for ${heal} HP due to Bloodlust.`);
                }
                if (opponentHp <= 0) break;
    
                // Opponent turn
                let opponentDamage = Math.floor(opponent.playerSnapshot.attack.base * (0.9 + Math.random() * 0.2));
                opponentDamage = this._calculateDamage(opponent.playerSnapshot, s.player, opponentDamage);
                playerHp -= opponentDamage;
                battleLog.push(`> ${opponent.name} hits you for ${opponentDamage} damage.`);
                if (playerHp <= 0) break;
            }
    
            const victory = playerHp > opponentHp;
            if (victory) {
                battleLog.push(`> VICTORY! You have defeated ${opponent.name}.`);
            } else {
                battleLog.push(`> DEFEAT! You have been bested by ${opponent.name}.`);
            }
    
            return {
                ...s,
                status: 'arena-combat',
                activeArenaBattle: { opponent, isRevenge },
                arenaCombatLog: battleLog
            };
        });
    }

    public finalizeArenaBattle(): void {
        this._state.update(s => {
            if (!s.activeArenaBattle) return s;
    
            const { opponent, isRevenge } = s.activeArenaBattle;
            let player = { ...s.player };
    
            if (!isRevenge) {
                player.arenaTickets--;
            }
    
            const victory = s.arenaCombatLog[s.arenaCombatLog.length - 1].includes('VICTORY');
    
            // ELO Rating Change
            const K_FACTOR = 32;
            const playerRank = player.arenaRank;
            const opponentRank = opponent.rank;
            const expectedPlayerScore = 1 / (1 + Math.pow(10, (opponentRank - playerRank) / 400));
            const actualPlayerScore = victory ? 1 : 0;
            const rankChange = Math.round(K_FACTOR * (actualPlayerScore - expectedPlayerScore));
            const newRank = player.arenaRank + rankChange;
    
            if (victory) {
                const marksGained = 10 + player.arenaWinStreak;
                player.arenaMarks += marksGained;
                player.arenaWinStreak++;
                this.messageService.showMessage(`You defeated ${opponent.name}!`, 'success');
            } else {
                const marksGained = 3;
                player.arenaMarks += marksGained;
                player.arenaWinStreak = 0;
                this.messageService.showMessage(`You were defeated by ${opponent.name}.`, 'error');
            }
    
            player.arenaRank = newRank;
    
            const newLogEntry: BattleLogEntry = {
                opponent: opponent,
                outcome: victory ? 'victory' : 'defeat',
                rankChange: rankChange,
                newRank: newRank,
                log: s.arenaCombatLog,
                isRevengeAvailable: !victory,
            };
    
            let newArenaBattleLogs = [...s.arenaBattleLogs, newLogEntry];
            if (isRevenge) {
                const logIndex = s.arenaBattleLogs.findIndex(log => log.opponent.name === opponent.name && log.isRevengeAvailable);
                if (logIndex > -1) {
                    newArenaBattleLogs = s.arenaBattleLogs.map((log, index) => 
                        index === logIndex ? { ...log, isRevengeAvailable: false } : log
                    );
                }
            }
    
            return {
                ...s,
                player,
                arenaBattleLogs: newArenaBattleLogs,
                status: 'hub',
                arenaPanelOpen: true,
                activeArenaBattle: null,
                arenaCombatLog: []
            };
        });
        this.saveState();
        this.getArenaOpponents();
    }

    public buyArenaShopItem(itemId: string): void {
      this._state.update(s => {
          const itemToBuy = ARENA_SHOP_ITEMS.find(i => i.id === itemId);
          if (!itemToBuy) return s;
  
          if (s.player.arenaMarks < itemToBuy.price) {
              this.messageService.showMessage("Not enough Arena Marks.", 'error');
              return s;
          }
  
          if (s.player.inventory.length >= s.player.maxInventory && itemToBuy.item.id !== 'reforging_ember_item') {
              this.messageService.showMessage("Inventory is full.", 'error');
              return s;
          }
  
          const newPlayer = { ...s.player };
          newPlayer.arenaMarks -= itemToBuy.price;
          
          if (itemToBuy.item.id === 'reforging_ember_item') {
              newPlayer.reforgingEmbers++;
          } else {
               newPlayer.inventory.push({ ...itemToBuy.item });
          }
          
          this.messageService.showMessage(`${itemToBuy.name} purchased!`, 'success');
          this.saveState();
          return { ...s, player: newPlayer };
      });
    }

    public buyArenaTicket(): void {
      this._state.update(s => {
          const TICKET_COST = 50;
          if (s.player.diamonds < TICKET_COST) {
              this.messageService.showMessage(`Not enough diamonds. A ticket costs ${TICKET_COST}.`, 'error');
              return s;
          }

          const newPlayer = {
              ...s.player,
              diamonds: s.player.diamonds - TICKET_COST,
              arenaTickets: s.player.arenaTickets + 1,
          };

          this.messageService.showMessage('Purchased 1 Arena Ticket!', 'success');
          this.saveState();
          return { ...s, player: newPlayer };
      });
    }

    public startChallengeRift(): void {
      this._state.update(s => {
        this.messageService.showMessage("Challenge Rift Started!", 'info');
        const riftConfig = CURRENT_CHALLENGE_RIFT;
        
        const presetPlayer = JSON.parse(JSON.stringify(riftConfig.presetPlayer));
        
        return {
          ...s,
          player: presetPlayer,
          isChallengeRift: true,
          challengeRiftPanelOpen: false,
          runStats: {
            startTime: Date.now(),
            xpGained: 0,
            enemiesSlain: 0,
            goldCollected: 0,
            elitesSlainThisRun: [],
            skillUsageThisRun: {},
          }
        }
      });
      this.startDungeon('verdant-labyrinth', 'Hard', null);
    }

    public transmuteItems(recipeId: string, itemIndices: number[]): void {
      this._state.update(s => {
        const player = s.player;
        
        if (recipeId === 'recipe_3_rare_to_epic') {
          if (itemIndices.length !== 3) {
            this.messageService.showMessage('Recipe requires 3 items.', 'error');
            return s;
          }

          const itemsToTransmute = itemIndices.map(index => player.inventory[index]);
          if (itemsToTransmute.some(item => !item || item.rarity !== 'Rare')) {
            this.messageService.showMessage('This recipe requires 3 Rare items.', 'error');
            return s;
          }
          
          const sortedIndices = [...itemIndices].sort((a, b) => b - a);
          const newInventory = [...player.inventory];
          for (const index of sortedIndices) {
            newInventory.splice(index, 1);
          }
          
          const randomEpicItem = EPIC_ITEM_POOL[Math.floor(Math.random() * EPIC_ITEM_POOL.length)];
          newInventory.push(JSON.parse(JSON.stringify(randomEpicItem)));
          
          this.messageService.showMessage(`Transmuted items into a ${randomEpicItem.name}!`, 'success');
          
          const newPlayer = { ...player, inventory: newInventory };
          this.saveState();
          return { ...s, player: newPlayer, transmutationPanelOpen: false };
        }
        return s;
      });
    }
    
    public claimLoginReward(): void {
        this._state.update(s => {
            const streak = s.playerProgress.loginStreak;
            const reward = LOGIN_REWARDS_DATA.find(r => r.day === streak);
            if (!reward) {
              this.messageService.showMessage('No reward found for today.', 'error');
              return { ...s, loginRewardPanelOpen: false };
            }

            let newPlayer = { ...s.player };

            if (reward.currency) {
                newPlayer[reward.currency.type] += reward.currency.amount;
            }
            if (reward.item) {
                newPlayer.inventory.push({ ...reward.item });
            }
            
            this.messageService.showMessage(`Claimed reward: ${reward.description}`, 'success');
            this.saveState();
            return { ...s, player: newPlayer, loginRewardPanelOpen: false };
        });
    }

    public resolveAltarChoice(choiceIndex: number): void {
        this._state.update(s => {
            if (!s.altarChoices || choiceIndex < 0 || choiceIndex >= s.altarChoices.length) {
                return { ...s, altarOpen: false, altarChoices: null };
            }
    
            const choice = s.altarChoices[choiceIndex];
            let newPlayer = JSON.parse(JSON.stringify(s.player));
            
            this.messageService.showMessage(`You chose: ${choice.title}`, 'info');
    
            for (const effect of choice.effects) {
                switch(effect.type) {
                    case 'stat_buff':
                    case 'stat_debuff':
                        if (effect.stat && newPlayer.runBonuses[effect.stat]) {
                            if (effect.valueType === 'flat') {
                                newPlayer.runBonuses[effect.stat].flat += effect.value || 0;
                            } else if (effect.valueType === 'percent') {
                                newPlayer.runBonuses[effect.stat].percent += effect.value || 0;
                            }
                        }
                        this.messageService.showMessage(effect.type === 'stat_buff' ? `Gained a buff to ${effect.stat}!` : `Received a debuff to ${effect.stat}...`, effect.type === 'stat_buff' ? 'success' : 'error');
                        break;
                    case 'give_gold':
                        newPlayer.gold += effect.value || 0;
                        this.messageService.showMessage(`You found ${effect.value} gold!`, 'success');
                        break;
                    case 'give_item':
                        if (effect.item) {
                            newPlayer.inventory.push({ ...effect.item });
                             this.messageService.showMessage(`You received ${effect.item.name}!`, 'success');
                        }
                        break;
                    case 'heal':
                        const maxHp = this.getTotalStat('maxHp', newPlayer);
                        const healAmount = Math.floor(maxHp * ((effect.value || 0) / 100));
                        newPlayer.hp = Math.min(maxHp, newPlayer.hp + healAmount);
                        this.messageService.showMessage(`You are healed for ${healAmount} HP.`, 'success');
                        break;
                }
            }
    
            newPlayer.hp = Math.min(this.getTotalStat('maxHp', newPlayer), newPlayer.hp);
            newPlayer.en = Math.min(this.getTotalStat('maxEn', newPlayer), newPlayer.en);
    
            return {
                ...s,
                player: newPlayer,
                altarOpen: false,
                altarChoices: null
            };
        });
        this.saveState();
    }

    public resolveSynergyChoice(choiceId: 'manifest' | 'infuse' | 'vision'): void {
        this._state.update(s => {
            let newProgress = { ...s.playerProgress };
            let newPlayer = { ...s.player };
            
            switch (choiceId) {
                case 'manifest':
                    newProgress.manifestTreasureActive = true;
                    this.messageService.showMessage('Manifest Treasure active! Your next elite/boss kill will be greatly rewarded.', 'info');
                    break;
                case 'infuse':
                    const skillUsage = s.runStats?.skillUsageThisRun;
                    if (skillUsage && Object.keys(skillUsage).length > 0) {
                        const mostUsedSkillId = Object.keys(skillUsage).reduce((a, b) => skillUsage[a] > skillUsage[b] ? a : b);
                        if (BOON_DATA[mostUsedSkillId]) {
                             newProgress.boonInfusion = { skillId: mostUsedSkillId, charges: 3 };
                            this.messageService.showMessage(`You are now infused with the power of ${SKILLS_DATA.find(sk=>sk.id === mostUsedSkillId)?.name}! Your next 3 compatible drops will be enhanced.`, 'success');
                        } else {
                            this.messageService.showMessage(`Your most used skill, ${SKILLS_DATA.find(sk=>sk.id === mostUsedSkillId)?.name}, cannot be infused.`, 'error');
                        }
                    } else {
                        this.messageService.showMessage('No skill usage to infuse from this run.', 'error');
                    }
                    break;
                case 'vision':
                    newPlayer.runBonuses.luck.percent += 100;
                    this.messageService.showMessage('You are filled with prophetic visions! Luck greatly increased.', 'success');
                    break;
            }
    
            return { ...s, player: newPlayer, playerProgress: newProgress, synergyBreakOpen: false, synergyChoices: null };
        });
        this.saveState();
    }
}
