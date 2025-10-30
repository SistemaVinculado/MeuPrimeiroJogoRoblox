import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { GuildBounty } from '../../services/models';

@Component({
  selector: 'app-guild',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guild.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuildComponent {
  private gameService = inject(GameService);
  private messageService = inject(MessageService);

  guild = computed(() => this.gameService.state().player.guild);
  
  getBountyProgress(bounty: GuildBounty): number {
    if (!bounty.quest.objective || bounty.guildCurrentValue >= bounty.quest.objective.targetValue) {
      return 100;
    }
    return (bounty.guildCurrentValue / bounty.quest.objective.targetValue) * 100;
  }

  createGuild(name: string, tag: string): void {
    if (!name.trim() || !tag.trim()) {
        this.messageService.showMessage('Guild Name and Tag cannot be empty.', 'error');
        return;
    }
    if (tag.length > 4) {
        this.messageService.showMessage('Guild Tag cannot exceed 4 characters.', 'error');
        return;
    }
    this.gameService.createGuild(name, tag);
  }

  recruitMember(): void {
    this.gameService.recruitGuildMember();
  }

  close(): void {
    this.gameService.toggleGuildPanel();
  }
}
