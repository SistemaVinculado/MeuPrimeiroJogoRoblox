import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-ascension',
  standalone: true,
  templateUrl: './ascension.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AscensionComponent {
  private gameService = inject(GameService);

  player = computed(() => this.gameService.state().player);

  requiredLevel = computed(() => {
    const prestige = this.player().prestige;
    return this.gameService.getRequiredLevelForAscension(prestige);
  });

  close(): void {
    this.gameService.toggleAscensionPanel();
  }

  ascend(): void {
    this.gameService.ascendPlayer();
  }
}