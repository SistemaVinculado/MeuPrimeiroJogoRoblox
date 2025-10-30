import { Skill, SkillNode, PlayerClass } from "../services/models";

// FIX: Added masteryLevel, masteryXp, and masteryXpToNextLevel to each skill to match the Skill type.
export const SKILLS_DATA: Omit<Skill, 'currentCooldown'>[] = [
    { id: 'cleaving_strike', name: 'Cleaving Strike', description: 'A powerful swing that deals 150% weapon damage.', levelRequired: 5, cost: 20, cooldown: 3, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'shield_bash', name: 'Shield Bash', description: 'Deals minor damage and has an 80% chance to Stun the enemy for 1 turn.', levelRequired: 5, cost: 25, cooldown: 4, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'arcane_bolt', name: 'Arcane Bolt', description: 'A bolt of raw magic that deals moderate damage.', levelRequired: 5, cost: 20, cooldown: 2, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'frost_nova', name: 'Frost Nova', description: 'Deals low damage and Chills the enemy for 3 turns, reducing their attack damage by 25%.', levelRequired: 5, cost: 30, cooldown: 5, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'retaliate', name: 'Retaliate', description: 'A defensive stance. For 1 turn, triples your Block Chance and reflect 50% of blocked damage.', levelRequired: 10, cost: 35, cooldown: 5, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'phase_shift', name: 'Phase Shift', description: 'Costly spell that guarantees a dodge on the next incoming attack and restores 15 EN.', levelRequired: 10, cost: 40, cooldown: 6, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'execute', name: 'Execute', description: 'A vicious attack that deals 200% bonus damage to stunned targets.', levelRequired: 15, cost: 30, cooldown: 5, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'shatter', name: 'Shatter', description: 'Deals massive damage to a Chilled target, consuming the Chilled effect.', levelRequired: 15, cost: 35, cooldown: 6, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'cauterize', name: 'Cauterize', description: 'Cleanse a Bleed effect from yourself, but become Enraged for 2 turns.', levelRequired: 18, cost: 20, cooldown: 6, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
    { id: 'combustion', name: 'Combustion', description: 'Deals fire damage and applies a potent Burn for 4 turns.', levelRequired: 18, cost: 40, cooldown: 5, masteryLevel: 1, masteryXp: 0, masteryXpToNextLevel: 100 },
];

export const SKILL_TREE_DATA: SkillNode[] = [
    // --- Warrior ---
    { id: 'w_passive_hp1', name: 'Stalwart', description: 'Increases Maximum HP by 5%.', type: 'passive', playerClass: 'Warrior', cost: 1, levelRequirement: 2, bonuses: [{ stat: 'maxHp', type: 'percent', value: 5 }] },
    { id: 'w_passive_atk1', name: 'Powerful Strikes', description: 'Increases Attack by 5%.', type: 'passive', playerClass: 'Warrior', cost: 1, levelRequirement: 4, dependencies: ['w_passive_hp1'], bonuses: [{ stat: 'attack', type: 'percent', value: 5 }] },
    { id: 'w_active_cleave', name: 'Learn: Cleaving Strike', description: 'Unlocks the Cleaving Strike active skill.', type: 'active', playerClass: 'Warrior', cost: 2, levelRequirement: 5, dependencies: ['w_passive_atk1'], skillId: 'cleaving_strike' },
    { id: 'w_passive_def1', name: 'Reinforced', description: 'Increases Defense by 10.', type: 'passive', playerClass: 'Warrior', cost: 1, levelRequirement: 3, bonuses: [{ stat: 'defense', type: 'flat', value: 10 }] },
    { id: 'w_active_bash', name: 'Learn: Shield Bash', description: 'Unlocks the Shield Bash active skill.', type: 'active', playerClass: 'Warrior', cost: 2, levelRequirement: 5, dependencies: ['w_passive_def1'], skillId: 'shield_bash' },
    { id: 'w_active_retaliate', name: 'Learn: Retaliate', description: 'Unlocks the Retaliate active skill.', type: 'active', playerClass: 'Warrior', cost: 3, levelRequirement: 10, dependencies: ['w_active_bash'], skillId: 'retaliate' },
    { id: 'w_active_execute', name: 'Learn: Execute', description: 'Unlocks the Execute active skill.', type: 'active', playerClass: 'Warrior', cost: 3, levelRequirement: 15, dependencies: ['w_active_retaliate'], skillId: 'execute' },
    { id: 'w_active_cauterize', name: 'Learn: Cauterize', description: 'Unlocks the Cauterize active skill.', type: 'active', playerClass: 'Warrior', cost: 2, levelRequirement: 18, dependencies: ['w_active_execute'], skillId: 'cauterize' },
    // --- Mage ---
    { id: 'm_passive_en1', name: 'Arcane Mind', description: 'Increases Maximum Energy by 5%.', type: 'passive', playerClass: 'Mage', cost: 1, levelRequirement: 2, bonuses: [{ stat: 'maxEn', type: 'percent', value: 5 }] },
    { id: 'm_passive_atk1', name: 'Charged Strikes', description: 'Increases Attack by 5%.', type: 'passive', playerClass: 'Mage', cost: 1, levelRequirement: 4, dependencies: ['m_passive_en1'], bonuses: [{ stat: 'attack', type: 'percent', value: 5 }] },
    { id: 'm_active_bolt', name: 'Learn: Arcane Bolt', description: 'Unlocks the Arcane Bolt active skill.', type: 'active', playerClass: 'Mage', cost: 2, levelRequirement: 5, dependencies: ['m_passive_atk1'], skillId: 'arcane_bolt' },
    { id: 'm_passive_hp1', name: 'Vitality', description: 'Increases Maximum HP by 5%.', type: 'passive', playerClass: 'Mage', cost: 1, levelRequirement: 3, bonuses: [{ stat: 'maxHp', type: 'percent', value: 5 }] },
    { id: 'm_active_nova', name: 'Learn: Frost Nova', description: 'Unlocks the Frost Nova active skill.', type: 'active', playerClass: 'Mage', cost: 2, levelRequirement: 5, dependencies: ['m_passive_hp1'], skillId: 'frost_nova' },
    { id: 'm_active_phase', name: 'Learn: Phase Shift', description: 'Unlocks the Phase Shift active skill.', type: 'active', playerClass: 'Mage', cost: 3, levelRequirement: 10, dependencies: ['m_active_nova'], skillId: 'phase_shift' },
    { id: 'm_active_shatter', name: 'Learn: Shatter', description: 'Unlocks the Shatter active skill.', type: 'active', playerClass: 'Mage', cost: 3, levelRequirement: 15, dependencies: ['m_active_phase'], skillId: 'shatter' },
    { id: 'm_active_combustion', name: 'Learn: Combustion', description: 'Unlocks the Combustion active skill.', type: 'active', playerClass: 'Mage', cost: 3, levelRequirement: 18, dependencies: ['m_active_shatter'], skillId: 'combustion' },
];