import { TransmutationRecipe } from "../services/models";
import { GUARDIAN_SET, WARRIOR_ITEMS } from "./items.data";

export const TRANSMUTATION_RECIPES: TransmutationRecipe[] = [
    {
        id: 'recipe_3_rare_to_epic',
        name: 'Upgrade Rares',
        description: 'Combine 3 Rare items to create 1 random Epic item.',
        playerClass: 'All',
        input: { rarity: 'Rare', count: 3 },
        output: { rarity: 'Epic' }
    },
    {
        id: 'recipe_reroll_guardian_set',
        name: 'Reforge Guardian\'s Resolve',
        description: 'Combine a Guardian\'s Resolve set piece with Arcane Dust to re-roll it into a different piece from the same set.',
        playerClass: 'Warrior',
        input: { itemType: 'armor', count: 1 }, // Placeholder, logic will check setName
        output: { item: GUARDIAN_SET[0] } // Placeholder, logic will handle random outcome
    },
    {
        id: 'recipe_warrior_cursed_axe',
        name: 'Forge Berserker\'s Axe',
        description: 'Combine 3 Epic Weapons to forge the Cursed Berserker\'s Axe.',
        playerClass: 'Warrior',
        input: { itemType: 'weapon', rarity: 'Epic', count: 3 },
        output: { item: WARRIOR_ITEMS.find(i => i.id === 'cursed_berserker_axe')! }
    },
];