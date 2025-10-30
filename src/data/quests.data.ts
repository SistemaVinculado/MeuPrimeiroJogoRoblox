import { Quest } from "../services/models";

// Use Omit to create a template type, as 'currentValue' and 'isClaimed' will be added dynamically.
type QuestTemplate = Omit<Quest, 'currentValue' | 'status'>;

export const QUEST_DATA: QuestTemplate[] = [
    // --- Dailies ---
    {
        id: 'daily_slay_5_beasts',
        type: 'daily',
        title: 'Daily Hunt: Beast Cull',
        description: 'Defeat any 5 enemies in any dungeon.',
        playerClass: 'All',
        objective: { type: 'slay_enemy', targetKey: 'any', targetValue: 5 },
        rewards: { gold: 100, arcaneDust: 15 }
    },
     {
        id: 'daily_bounty_serpents',
        type: 'daily',
        title: 'Daily Bounty: Serpent Purge',
        description: 'Defeat 3 Gloomfang Serpents in the Dark Forest.',
        playerClass: 'All',
        objective: { type: 'slay_enemy', targetKey: 'VL_GloomfangSerpent', targetValue: 3 },
        rewards: { gold: 200, arcaneDust: 25 }
    },
    {
        id: 'daily_bounty_sprites',
        type: 'daily',
        title: 'Daily Bounty: Sprite Squashing',
        description: 'Defeat 5 Whisperwood Sprites in the Dark Forest.',
        playerClass: 'All',
        objective: { type: 'slay_enemy', targetKey: 'VL_WhisperwoodSprite', targetValue: 5 },
        rewards: { gold: 200, arcaneDust: 25 }
    },
    {
        id: 'daily_collect_250_gold',
        type: 'daily',
        title: 'Daily Spoils: Gold Rush',
        description: 'Collect 250 Gold from enemies and chests.',
        playerClass: 'All',
        objective: { type: 'collect_gold', targetKey: 'any', targetValue: 250 },
        rewards: { arcaneDust: 25 }
    },
    {
        id: 'daily_clear_1_dungeon',
        type: 'daily',
        title: 'Daily Delve: Quick Run',
        description: 'Successfully complete any dungeon on any difficulty.',
        playerClass: 'All',
        objective: { type: 'complete_dungeon', targetKey: 'any', targetValue: 1 },
        rewards: { gold: 150, diamonds: 2 }
    },
    {
        id: 'daily_warrior_slay',
        type: 'daily',
        title: 'Daily Drill: Warrior\'s Might',
        description: 'As a Warrior, defeat 5 enemies.',
        playerClass: 'Warrior',
        objective: { type: 'slay_enemy', targetKey: 'any', targetValue: 5 },
        rewards: { gold: 120, arcaneDust: 20 }
    },
    {
        id: 'daily_mage_slay',
        type: 'daily',
        title: 'Daily Practice: Mage\'s Power',
        description: 'As a Mage, defeat 5 enemies.',
        playerClass: 'Mage',
        objective: { type: 'slay_enemy', targetKey: 'any', targetValue: 5 },
        rewards: { gold: 120, arcaneDust: 20 }
    },

    // --- Event Dailies ---
    {
        id: 'daily_blood_moon_slay_elites',
        type: 'daily',
        title: 'Blood Moon Hunt',
        description: 'Slay 3 Elite enemies under the Blood Moon.',
        playerClass: 'All',
        eventId: 'blood_moon',
        objective: { type: 'slay_enemy', targetKey: 'elite', targetValue: 3 },
        rewards: { gold: 500, arcaneDust: 100 }
    },
    {
        id: 'daily_merchants_festival_run',
        type: 'daily',
        title: 'Festival Delve',
        description: 'Complete any dungeon during the Merchant\'s Festival.',
        playerClass: 'All',
        eventId: 'merchants_festival',
        objective: { type: 'complete_dungeon', targetKey: 'any', targetValue: 1 },
        rewards: { gold: 300, diamonds: 5 }
    },

    // --- Weeklies ---
    {
        id: 'weekly_slay_50_beasts',
        type: 'weekly',
        title: 'Weekly Eradication',
        description: 'Defeat 50 enemies across all your dungeon runs.',
        playerClass: 'All',
        objective: { type: 'slay_enemy', targetKey: 'any', targetValue: 50 },
        rewards: { gold: 500, diamonds: 10 }
    },
    {
        id: 'weekly_clear_hard_dungeon',
        type: 'weekly',
        title: 'Weekly Challenge',
        description: 'Successfully complete any dungeon on Hard difficulty or higher.',
        playerClass: 'All',
        objective: { type: 'complete_dungeon', targetKey: 'any', targetValue: 1, difficultyRequirement: 'Hard' },
        rewards: { gold: 750, reforgingEmbers: 1 }
    },

    // --- Tutorial ---
    {
        id: 'tutorial_upgrade_item',
        type: 'tutorial',
        title: 'A Touch of Magic',
        description: 'Upgrade any item at the Forge for the first time.',
        playerClass: 'All',
        objective: { type: 'upgrade_item', targetKey: 'any', targetValue: 1 },
        rewards: { gold: 50, arcaneDust: 50 }
    }
];