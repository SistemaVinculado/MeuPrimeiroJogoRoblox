import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floor-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floor-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorStatusComponent {
  private gameService = inject(GameService);
  dungeon = computed(() => this.gameService.state().dungeon);
  enemiesLeft = computed(() => this.gameService.state().enemies.length);
  chestsLeft = computed(() => {
    const grid = this.dungeon().grid;
    if (!grid || grid.length === 0) return 0;
    return grid.flat().filter(tile => tile === 'T').length;
  });
}
