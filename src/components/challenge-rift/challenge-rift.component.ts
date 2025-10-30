import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { CURRENT_CHALLENGE_RIFT } from '../../data/challenge-rifts.data';
import { ChallengeRiftConfig } from '../../services/models';

@Component({
  selector: 'app-challenge-rift',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-rift.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallengeRiftComponent {
  private gameService = inject(GameService);

  riftConfig = signal<ChallengeRiftConfig>(CURRENT_CHALLENGE_RIFT);

  playerBestTime = computed(() => {
    const bestTimes = this.gameService.state().playerProgress.bestRiftTime;
    return bestTimes[this.riftConfig().weekId] ?? null;
  });

  leaderboard = computed(() => this.riftConfig().leaderboard);

  formatTime(totalSeconds: number | null): string {
    if (totalSeconds === null || isNaN(totalSeconds) || totalSeconds < 0) {
      return '--:--';
    }
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  close(): void {
    this.gameService.toggleChallengeRiftPanel();
  }

  startRift(): void {
    this.gameService.startChallengeRift();
  }
}