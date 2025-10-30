import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../services/models';

export interface UsableItem extends Item {
  inventoryIndex: number;
}

@Component({
  selector: 'app-use-item-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './use-item-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseItemModalComponent {
  private gameService = inject(GameService);

  // Filter inventory for items usable in combat (e.g., potions)
  usableItems = computed<UsableItem[]>(() => {
    const player = this.gameService.state().player;
    return player.inventory
      .map((item, index) => ({ ...item, inventoryIndex: index }))
      .filter(item => item.type === 'potion');
  });

  close(): void {
    this.gameService.toggleUseItemModal();
  }

  useItem(itemIndex: number): void {
    this.gameService.useItem(itemIndex);
    this.close(); // Close modal after using item
  }
}
