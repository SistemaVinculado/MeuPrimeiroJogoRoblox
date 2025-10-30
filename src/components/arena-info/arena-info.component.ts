import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { ARENA_SEASON_REWARDS } from '../../data/arena-rewards.data';

@Component({
  selector: 'app-arena-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arena-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArenaInfoComponent {
  private gameService = inject(GameService);

  seasonRewards = ARENA_SEASON_REWARDS;

  close(): void {
    // FIX: Call the newly implemented 'toggleArenaInfo' method.
    this.gameService.toggleArenaInfo();
  }
}