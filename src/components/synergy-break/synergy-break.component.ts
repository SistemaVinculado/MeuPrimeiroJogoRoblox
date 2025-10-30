import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { SynergyChoice } from '../../services/models';

@Component({
  selector: 'app-synergy-break',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './synergy-break.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SynergyBreakComponent {
  private gameService = inject(GameService);
  
  choices = computed(() => this.gameService.state().synergyChoices);

  choose(choiceId: 'manifest' | 'infuse' | 'vision'): void {
    // FIX: This method was missing from the game service. It has been implemented.
    this.gameService.resolveSynergyChoice(choiceId);
  }
}