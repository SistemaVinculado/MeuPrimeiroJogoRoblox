import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { RunSummary, Rarity } from '../../services/models';

@Component({
  selector: 'app-run-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './run-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunSummaryComponent {
  private gameService = inject(GameService);
  
  summary = computed<RunSummary | null>(() => this.gameService.state().runSummary);
  isGauntletRun = computed(() => this.gameService.state().isGauntlet);
  isChallengeRift = computed(() => this.gameService.state().isChallengeRift);

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

  continueToHub(): void {
    this.gameService.backToHub();
  }

  retry(): void {
    this.gameService.retryDungeon();
  }

  formatTime(totalSeconds: number): string {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return '00:00';
    }
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  getRarityColor(rarity: Rarity): string {
    return this.rarityColors[rarity] || '#FFFFFF';
  }
}