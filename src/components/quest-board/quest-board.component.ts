import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Quest, GuildBounty } from '../../services/models';

@Component({
  selector: 'app-quest-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quest-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestBoardComponent {
  private gameService = inject(GameService);

  currentTab = signal<'player' | 'guild'>('player');

  activeQuests = computed(() => this.gameService.state().player.activeQuests);
  guildBounty = computed(() => this.gameService.state().player.guild?.activeBounty);

  getQuestProgress(quest: Quest): number {
    if (!quest.objective || quest.currentValue >= quest.objective.targetValue) {
      return 100;
    }
    return (quest.currentValue / quest.objective.targetValue) * 100;
  }

  getBountyProgress(bounty: GuildBounty): number {
    if (!bounty.quest.objective || bounty.guildCurrentValue >= bounty.quest.objective.targetValue) {
      return 100;
    }
    return (bounty.guildCurrentValue / bounty.quest.objective.targetValue) * 100;
  }

  claimReward(questId: string): void {
    this.gameService.claimQuestReward(questId);
  }

  setTab(tab: 'player' | 'guild'): void {
    this.currentTab.set(tab);
  }

  close(): void {
    this.gameService.toggleQuestBoard();
  }
}
