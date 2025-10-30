import { DungeonAnomaly } from '../services/models';

export const ANOMALIES_DATA: DungeonAnomaly[] = [
    { 
        id: 'glass_cannon', 
        name: 'Glass Cannon', 
        description: 'All damage dealt and received is increased by 100%.' 
    },
    { 
        id: 'primal_surge', 
        name: 'Primal Surge', 
        description: 'The chance for items to drop as \'Primal\' is increased by 500%, but all non-boss enemies are \'Elite\'.'
    },
    {
        id: 'darkness_falls',
        name: 'Darkness Falls',
        description: 'Your visibility radius is reduced to 1, but finding the exit portal grants a special reward chest.'
    }
];
