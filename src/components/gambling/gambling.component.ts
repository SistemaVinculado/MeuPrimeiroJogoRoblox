import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

type GambleItemType = 'weapon' | 'helmet' | 'armor' | 'shield' | 'set_item';

interface GambleOption {
    type: GambleItemType;
    name: string;
    cost: number;
}

@Component({
  selector: 'app-gambling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gambling.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamblingComponent {
  private gameService = inject(GameService);

  playerGold = computed(() => this.gameService.state().player.gold);

  gambleOptions: GambleOption[] = [
      { type: 'weapon', name: 'Mysterious Weapon', cost: 500 },
      { type: 'helmet', name: 'Unidentified Helm', cost: 400 },
      { type: 'armor', name: 'Enigmatic Armor', cost: 450 },
      { type: 'shield', name: 'Dubious Shield', cost: 350 },
  ];

  gambleForSetItemOption: GambleOption = { type: 'set_item', name: 'Unidentified Set Piece', cost: 2500 };

  close(): void {
    this.gameService.toggleGamblingPanel();
  }

  gamble(type: GambleItemType): void {
      if (type === 'set_item') {
        this.gameService.gambleForSetItem();
      } else {
        this.gameService.gambleForItem(type);
      }
  }
}
