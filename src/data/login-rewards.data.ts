import { LoginReward } from "../services/models";
import { CONSUMABLES } from "./items.data";

export const LOGIN_REWARDS_DATA: LoginReward[] = [
  // Week 1
  { day: 1, currency: { type: 'gold', amount: 500 }, description: '500 Gold' },
  { day: 2, currency: { type: 'arcaneDust', amount: 100 }, description: '100 Arcane Dust' },
  { day: 3, item: CONSUMABLES.find(c => c.id === 'hp_potion_medium'), description: '1x Health Potion' },
  { day: 4, currency: { type: 'diamonds', amount: 10 }, description: '10 Diamonds' },
  { day: 5, currency: { type: 'gold', amount: 1500 }, description: '1,500 Gold' },
  { day: 6, currency: { type: 'arcaneDust', amount: 250 }, description: '250 Arcane Dust' },
  { day: 7, currency: { type: 'reforgingEmbers', amount: 1 }, description: '1x Reforging Ember' },

  // Week 2
  { day: 8, currency: { type: 'gold', amount: 2000 }, description: '2,000 Gold' },
  { day: 9, item: CONSUMABLES.find(c => c.id === 'potion_stoneskin'), description: '1x Potion of Stoneskin' },
  { day: 10, currency: { type: 'arcaneDust', amount: 400 }, description: '400 Arcane Dust' },
  { day: 11, currency: { type: 'diamonds', amount: 25 }, description: '25 Diamonds' },
  { day: 12, currency: { type: 'gold', amount: 3000 }, description: '3,000 Gold' },
  { day: 13, item: CONSUMABLES.find(c => c.id === 'hp_potion_large'), description: '1x Greater Health Potion' },
  { day: 14, currency: { type: 'reforgingEmbers', amount: 2 }, description: '2x Reforging Embers' },
  
  // Week 3
  { day: 15, currency: { type: 'gold', amount: 4000 }, description: '4,000 Gold' },
  { day: 16, currency: { type: 'arcaneDust', amount: 600 }, description: '600 Arcane Dust' },
  { day: 17, item: CONSUMABLES.find(c => c.id === 'escape_rope'), description: '3x Escape Ropes' },
  { day: 18, currency: { type: 'diamonds', amount: 50 }, description: '50 Diamonds' },
  { day: 19, currency: { type: 'gold', amount: 5000 }, description: '5,000 Gold' },
  { day: 20, currency: { type: 'soulEssence', amount: 1 }, description: '1x Soul Essence' },
  { day: 21, currency: { type: 'reforgingEmbers', amount: 3 }, description: '3x Reforging Embers' },

  // Week 4
  { day: 22, currency: { type: 'gold', amount: 7500 }, description: '7,500 Gold' },
  { day: 23, currency: { type: 'arcaneDust', amount: 1000 }, description: '1000 Arcane Dust' },
  { day: 24, currency: { type: 'diamonds', amount: 75 }, description: '75 Diamonds' },
  { day: 25, currency: { type: 'gold', amount: 10000 }, description: '10,000 Gold' },
  { day: 26, currency: { type: 'soulEssence', amount: 2 }, description: '2x Soul Essence' },
  { day: 27, currency: { type: 'reforgingEmbers', amount: 5 }, description: '5x Reforging Embers' },
  { day: 28, currency: { type: 'diamonds', amount: 150 }, description: '150 Diamonds' },
];
