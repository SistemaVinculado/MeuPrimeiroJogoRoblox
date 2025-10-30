import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ShopItem, Item, Rarity } from '../../services/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  private gameService = inject(GameService);
  private state = this.gameService.state;
  
  shopInventory = computed(() => this.state().shopInventory);
  buybackItems = computed(() => this.state().buybackItems);
  
  currentTab = signal<'buy' | 'sell' | 'buyback'>('buy');
  playerGold = computed(() => this.state().player.gold);
  
  sellableInventory = computed(() => 
    this.state().player.inventory.map((item, index) => ({ item, originalIndex: index }))
  );
  
  junkItemCount = computed(() => this.state().player.inventory.filter(i => i.isJunk).length);

  rarityColors: { [key in Rarity]: string } = {
    'Common': '#B0B0B0',
    'Uncommon': '#1EFF00',
    'Rare': '#0070DD',
    'Epic': '#A335EE',
    'Legendary': '#FF8000',
    'Mythic': '#E50000',
    'Artifact': '#00D1FF',
    'Divine': '#FFD700',
    'Exotic': '#FF8000',
    'Unique': '#f5f3ff'
  };

  close(): void {
    this.gameService.toggleShop();
  }

  buy(itemId: string, quantity: number): void {
    this.gameService.buyShopItem(itemId, quantity);
  }

  sell(itemIndex: number): void {
    this.gameService.sellItem(itemIndex);
  }
  
  buyback(buybackIndex: number): void {
      this.gameService.buybackItem(buybackIndex);
  }
  
  sellAllJunk(): void {
      this.gameService.sellAllJunk();
  }

  canAfford(price: number): boolean {
    return this.playerGold() >= price;
  }

  setTab(tab: 'buy' | 'sell' | 'buyback'): void {
    this.currentTab.set(tab);
  }
}