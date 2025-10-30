import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-altar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './altar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AltarComponent {
  private gameService = inject(GameService);
  
  choices = computed(() => this.gameService.state().altarChoices);

  choose(choiceIndex: number): void {
    // FIX: Called the newly implemented 'resolveAltarChoice' method on the game service.
    this.gameService.resolveAltarChoice(choiceIndex);
  }
}