import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Item, Enemy } from '../../services/models';
import { ENEMY_TYPES } from '../../data/enemies.data';
import { CONSUMABLES, WARRIOR_ITEMS, MAGE_ITEMS, EQUIPMENT_SHOP_POOL } from '../../data/items.data';

@Component({
  selector: 'app-codex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './codex.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodexComponent {
  private gameService = inject(GameService);
  
  allEnemies = Object.entries(ENEMY_TYPES).map(([key, value]) => ({...value, key}));
  
  // Create a master list of all items in the game
  allItems = (() => {
    const itemMap = new Map<string, Item>();
    const allItemSources = [
        ...CONSUMABLES, 
        ...WARRIOR_ITEMS, 
        ...MAGE_ITEMS, 
        ...EQUIPMENT_SHOP_POOL.map(i => i.item)
    ];
    
    allItemSources.forEach(item => {
      if (!itemMap.has(item.id)) {
        itemMap.set(item.id, item);
      }
    });
    
    return Array.from(itemMap.values());
  })();
  
  private state = this.gameService.state;
  discoveredEnemyKeys = computed(() => this.state().playerProgress.discoveredEnemyKeys);
  discoveredItemIds = computed(() => this.state().playerProgress.discoveredItemIds);

  currentTab = signal<'enemies' | 'items'>('enemies');
  objectKeys = Object.keys;

  close(): void {
    this.gameService.toggleCodex();
  }

  setTab(tab: 'enemies' | 'items'): void {
    this.currentTab.set(tab);
  }

  isEnemyDiscovered(enemyKey: string): boolean {
    return this.discoveredEnemyKeys().includes(enemyKey);
  }
  
  isItemDiscovered(itemId: string): boolean {
    return this.discoveredItemIds().includes(itemId);
  }
}