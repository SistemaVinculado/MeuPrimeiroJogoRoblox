import { Perk } from '../services/models';

interface BoonDefinition {
    compatibleTypes: ('weapon' | 'shield' | 'armor' | 'helmet' | 'boots' | 'gloves' | 'amulet')[];
    perk: Perk;
    playerClass?: 'Warrior' | 'Mage';
}

export const BOON_DATA: { [skillId: string]: BoonDefinition } = {
    'shield_bash': {
        compatibleTypes: ['shield'],
        playerClass: 'Warrior',
        perk: {
            type: 'skill_enhance',
            level: 5,
            value: 1,
            skillId: 'shield_bash',
            effect: 'stun_duration',
            description: 'Boon: Increases Shield Bash stun duration by 1 turn.'
        }
    },
    'retaliate': {
        compatibleTypes: ['shield', 'armor'],
        playerClass: 'Warrior',
        perk: {
            type: 'skill_enhance',
            level: 5,
            value: 25,
            skillId: 'retaliate',
            effect: 'damage_reflect_percent',
            description: 'Boon: Retaliate reflects an additional 25% damage.'
        }
    },
    'frost_nova': {
        compatibleTypes: ['weapon'],
        playerClass: 'Mage',
        perk: {
            type: 'skill_enhance',
            level: 5,
            value: 1,
            skillId: 'frost_nova',
            effect: 'chill_duration',
            description: 'Boon: Increases Frost Nova chill duration by 1 turn.'
        }
    },
    'phase_shift': {
        compatibleTypes: ['boots', 'amulet'],
        playerClass: 'Mage',
        perk: {
            type: 'skill_enhance',
            level: 5,
            value: 10,
            skillId: 'phase_shift',
            effect: 'energy_restore_percent',
            description: 'Boon: Phase Shift restores an additional 10% of Max Energy.'
        }
    }
};

export const BOON_THRESHOLD = 20;