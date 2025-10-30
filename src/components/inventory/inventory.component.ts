import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { PlayerClass, Item, Equipment, Player, Stat, Rarity } from '../../services/models';
import { SET_BONUSES } from '../../data/items.data';

export interface ComparisonStats {
  statName: string;
  current: string;
  selected: string;
  diff: number;
}

type SortBy = 'default' | 'rarity' | 'score' | 'type';

const RARITY_ORDER: Rarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Artifact', 'Divine', 'Exotic', 'Unique'];
const TYPE_ORDER: Item['type'][] = ['weapon', 'shield', 'helmet', 'armor', 'boots', 'gloves', 'amulet', 'ring', 'potion', 'consumable'];

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent implements OnInit {
  private gameService = inject(GameService);
  
  private state = this.gameService.state;
  player = computed(() => this.state().player);
  
  inventory = computed(() => this.player().inventory);
  equipment = computed(() => this.player().equipment);
  bagCount = computed(() => this.inventory().length);
  maxBagCount = computed(() => this.player().maxInventory);
  playerGold = computed(() => this.player().gold);
  selectedClass = signal<PlayerClass>('Warrior');
  
  // New state for pinned and hovered items
  pinnedItem = signal<{ item: Item, source: 'inventory' | 'equipment', indexOrSlot: number | keyof Equipment } | null>(null);
  hoveredItem = signal<Item | null>(null);

  // The item to display in the details panel is the pinned item, or the hovered item as a fallback
  itemForDetails = computed(() => this.pinnedItem()?.item ?? this.hoveredItem());

  itemGearScore = computed(() => {
    const item = this.itemForDetails();
    if (!item) return 0;
    return this.gameService.calculateGearScore(item);
  });

  rarityColors: { [key in Rarity]: string } = {
    'Common': '#B0B0B0',
    'Uncommon': '#1EFF00',
    'Rare': '#0070DD',
    'Epic': '#A335EE',
    'Legendary': '#FF8000',
    'Mythic': '#E50000',
    'Artifact': '#00D1FF',
    'Divine': '#FFD700',
    'Exotic': '#FF8000', // Base color for exotic text, animation handles the rest
    'Unique': '#f5f3ff'
  };

  rarityBorderColors: { [key in Rarity]: string } = {
    'Common': 'border-gray-400',
    'Uncommon': 'border-green-500',
    'Rare': 'border-blue-500',
    'Epic': 'border-purple-500',
    'Legendary': 'border-orange-500',
    'Mythic': 'border-red-600',
    'Artifact': 'border-cyan-400',
    'Divine': 'border-yellow-300',
    'Exotic': 'animate-exotic-border',
    'Unique': 'animate-unique-glow'
  };

  itemComparison = computed<ComparisonStats[] | null>(() => {
    const selected = this.itemForDetails();
    const p = this.player();
    if (!selected || !['helmet', 'armor', 'weapon', 'shield', 'boots', 'gloves', 'amulet', 'ring'].includes(selected.type)) {
      return null;
    }
    
    let slot: keyof Equipment;
    if (selected.type === 'ring') {
        // Simple comparison: compare against ring1. A more complex UI could allow choosing.
        slot = 'ring1';
    } else {
        slot = selected.type as keyof Equipment;
    }
    
    const currentItem = p.equipment[slot];
    
    if (currentItem?.id === selected.id) return null;

    const stats: ComparisonStats[] = [];
    // FIX: Added 'critDamage' to the list of stats to compare.
    const statKeys: (keyof Player & keyof NonNullable<Item['stats']>)[] = ['maxHp', 'maxEn', 'attack', 'defense', 'luck', 'critDamage'];
    
    for (const key of statKeys) {
        const currentFlat = currentItem?.stats?.[key] || 0;
        const selectedFlat = selected.stats?.[key] || 0;

        if (currentFlat === 0 && selectedFlat === 0) {
            continue;
        }
        
        const oldTotal = this.gameService.getTotalStat(key, p);

        // Simulate the new player state with the item equipped
        const simulatedPlayer: Player = JSON.parse(JSON.stringify(p));
        const newEquipment = { ...simulatedPlayer.equipment };
        newEquipment[slot] = selected; // Temporarily equip the selected item
        simulatedPlayer.equipment = newEquipment;
        
        // Recalculate gear stats for the simulated player
        const equipmentStats = this.gameService.recalculateEquipmentStats(newEquipment);
        // FIX: Correctly rebuild the simulated player's stats, including the new 'luck' and 'critDamage' stats.
        simulatedPlayer.maxHp = { ...p.maxHp, gear: equipmentStats.gearMaxHp, perks: equipmentStats.perkMaxHp };
        simulatedPlayer.maxEn = { ...p.maxEn, gear: equipmentStats.gearMaxEn, perks: equipmentStats.perkMaxEn };
        simulatedPlayer.attack = { ...p.attack, gear: equipmentStats.gearAttack, perks: equipmentStats.perkAttack };
        simulatedPlayer.defense = { ...p.defense, gear: equipmentStats.gearDefense, perks: equipmentStats.perkDefense };
        simulatedPlayer.luck = { ...p.luck, gear: equipmentStats.gearLuck, perks: equipmentStats.perkLuck };
        simulatedPlayer.critDamage = { ...p.critDamage, gear: equipmentStats.gearCritDamage, perks: equipmentStats.perkCritDamage };
        
        const newTotal = this.gameService.getTotalStat(key, simulatedPlayer);
        const diff = newTotal - oldTotal;

        if (diff !== 0) {
            // FIX: Added 'critDamage' to the stat name map.
            const statNameMap: Record<string, string> = { 'maxHp': 'Max HP', 'maxEn': 'Max Energy', 'attack': 'Attack', 'defense': 'Defense', 'luck': 'Luck', 'critDamage': 'Crit Damage' };
            stats.push({
                statName: statNameMap[key],
                current: oldTotal.toString(),
                selected: newTotal.toString(),
                diff: diff
            });
        }
    }

    return stats.length > 0 ? stats : null;
  });
  
  objectKeys = Object.keys;

  // --- Sorting Logic ---
  sortBy = signal<SortBy>('default');

  sortedInventory = computed(() => {
    const inv = [...this.inventory()];
    const sort = this.sortBy();

    if (sort === 'default') {
      return inv;
    }
    
    return inv.sort((a, b) => {
      switch(sort) {
        case 'rarity':
          return RARITY_ORDER.indexOf(b.rarity) - RARITY_ORDER.indexOf(a.rarity);
        case 'score':
          return this.gameService.calculateGearScore(b) - this.gameService.calculateGearScore(a);
        case 'type':
          return TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
        default:
          return 0;
      }
    });
  });

  setSortBy(criteria: SortBy): void {
    if (this.sortBy() === criteria) {
      this.sortBy.set('default'); // Toggle off
    } else {
      this.sortBy.set(criteria);
    }
  }

  ngOnInit(): void {
    this.selectedClass.set(this.player().playerClass);
  }
  
  close(): void {
    this.gameService.toggleInventory();
  }

  setClass(playerClass: PlayerClass): void {
    this.selectedClass.set(playerClass);
    this.gameService.setPlayerClass(playerClass);
  }

  isItemClassCompatible(item: Item): boolean {
    const p = this.player();
    if (!p) return false;
    return item.playerClass === 'All' || item.playerClass === p.playerClass;
  }

  equipBest(): void {
    this.gameService.equipBest();
  }

  performPinnedItemAction(): void {
    const pin = this.pinnedItem();
    if (!pin) return;

    if (pin.source === 'inventory') {
      const index = pin.indexOrSlot as number;
      if (['potion', 'consumable'].includes(pin.item.type)) {
        this.gameService.useItem(index);
      } else {
        this.gameService.equipItem(index);
      }
    } else if (pin.source === 'equipment') {
      const slot = pin.indexOrSlot as keyof Equipment;
      this.gameService.unequipItem(slot);
    }
    
    this.pinnedItem.set(null); // Unpin after action
  }
  
  toggleJunkStatus(): void {
      const pin = this.pinnedItem();
      if (!pin || pin.source !== 'inventory') return;
      
      const index = pin.indexOrSlot as number;
      this.gameService.toggleItemJunkStatus(index);
  }

  togglePinItem(item: Item, source: 'inventory' | 'equipment', indexOrSlot: number | keyof Equipment): void {
    const currentPin = this.pinnedItem();
    if (currentPin && currentPin.item === item && currentPin.indexOrSlot === indexOrSlot) {
      this.pinnedItem.set(null); // Unpin if clicking the same item
    } else {
      this.pinnedItem.set({ item, source, indexOrSlot });
    }
  }

  setHoveredItem(item: Item | null): void {
    this.hoveredItem.set(item);
  }

  getStatClass(diff: number): string {
    if (diff === 0) return 'text-gray-400';
    return diff > 0 ? 'text-green-400' : 'text-red-400';
  }

  isSetBonusActive(setName: string, requiredCountIndex: number): boolean {
    const p = this.player();
    if (!p || !setName) return false;

    const setBonusesForThisSet = SET_BONUSES[setName as keyof typeof SET_BONUSES];
    if (!setBonusesForThisSet || (requiredCountIndex - 1) >= setBonusesForThisSet.length) {
      return false;
    }
    
    const requiredCount = setBonusesForThisSet[requiredCountIndex - 1].count;

    const equippedSetItemsCount = Object.values(p.equipment)
      .filter(item => item !== null && (item as Item).setName === setName)
      .length;
      
    return equippedSetItemsCount >= requiredCount;
  }
}