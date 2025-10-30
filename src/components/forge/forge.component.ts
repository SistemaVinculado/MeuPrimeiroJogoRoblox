import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../services/models';

type ForgeTab = 'upgrade' | 'reforge' | 'infusion';

@Component({
  selector: 'app-forge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgeComponent {
  private gameService = inject(GameService);
  
  private state = this.gameService.state;
  player = computed(() => this.state().player);
  
  currentTab = signal<ForgeTab>('upgrade');

  // --- Upgrade Tab State ---
  selectedUpgradeItem = signal<{ item: Item, originalIndex: number } | null>(null);

  // --- Reforge Tab State ---
  selectedReforgeItem = signal<{ item: Item, originalIndex: number } | null>(null);

  // --- Infusion Tab State ---
  infusionSourceItem = signal<{ item: Item, originalIndex: number } | null>(null);
  infusionTargetItem = signal<{ item: Item, originalIndex: number } | null>(null);

  upgradableInventory = computed(() => this.filterInventory(item => ['weapon', 'armor', 'helmet', 'shield'].includes(item.type)));
  reforgeableInventory = computed(() => this.filterInventory(item => ['Legendary', 'Mythic', 'Exotic'].includes(item.rarity)));
  infusionSourceInventory = computed(() => this.filterInventory(item => !!item.perks && item.perks.length > 0));
  infusionTargetInventory = computed(() => this.filterInventory(item => !!item.perks && item.perks.length > 0));

  private filterInventory(predicate: (item: Item) => boolean) {
    return this.player().inventory
      .map((item, index) => ({ item, originalIndex: index }))
      .filter(entry => predicate(entry.item));
  }

  upgradeCost = computed(() => {
    const item = this.selectedUpgradeItem()?.item;
    if (!item) return 0;
    const currentLevel = item.upgradeLevel || 0;
    return 10 + (currentLevel * 5) + Math.floor(Math.pow(1.2, currentLevel));
  });

  nextLevelStats = computed(() => {
    const item = this.selectedUpgradeItem()?.item;
    if (!item || !item.stats) return null;

    const newStats: Partial<Item['stats']> = {};
    switch (item.type) {
        case 'weapon': newStats.attack = (item.stats.attack || 0) + 1; break;
        case 'armor': newStats.defense = (item.stats.defense || 0) + 1; newStats.maxHp = (item.stats.maxHp || 0) + 5; break;
        case 'helmet': newStats.maxHp = (item.stats.maxHp || 0) + 3; newStats.maxEn = (item.stats.maxEn || 0) + 3; break;
        case 'shield': newStats.defense = (item.stats.defense || 0) + 2; break;
    }
    return newStats;
  });

  objectKeys = Object.keys;

  setTab(tab: ForgeTab): void {
    this.currentTab.set(tab);
    // Clear selections when changing tabs
    this.selectedUpgradeItem.set(null);
    this.selectedReforgeItem.set(null);
    this.infusionSourceItem.set(null);
    this.infusionTargetItem.set(null);
  }

  close(): void {
    this.gameService.toggleForge();
  }

  selectUpgradeItem(item: { item: Item, originalIndex: number }): void {
    this.selectedUpgradeItem.set(item);
  }

  selectReforgeItem(item: { item: Item, originalIndex: number }): void {
    this.selectedReforgeItem.set(item);
  }

  selectInfusionSource(item: { item: Item, originalIndex: number }): void {
    this.infusionSourceItem.set(item);
  }

  selectInfusionTarget(item: { item: Item, originalIndex: number }): void {
    this.infusionTargetItem.set(item);
  }

  upgrade(): void {
    const sel = this.selectedUpgradeItem();
    if (sel) {
      this.gameService.upgradeItem(sel.originalIndex);
      const updatedItem = this.player().inventory[sel.originalIndex];
      if (updatedItem) {
        this.selectedUpgradeItem.set({ item: updatedItem, originalIndex: sel.originalIndex });
      } else {
        this.selectedUpgradeItem.set(null);
      }
    }
  }

  reforge(): void {
    const sel = this.selectedReforgeItem();
    if (sel) {
      // this.gameService.reforgeItem(sel.originalIndex);
      console.log("Reforging item at index:", sel.originalIndex);
      this.selectedReforgeItem.set(null);
    }
  }

  infuse(): void {
    const source = this.infusionSourceItem();
    const target = this.infusionTargetItem();
    if (source && target) {
      // this.gameService.infusePerk(source.originalIndex, target.originalIndex);
      console.log("Infusing perk from", source.originalIndex, "to", target.originalIndex);
      this.infusionSourceItem.set(null);
      this.infusionTargetItem.set(null);
    }
  }
}
