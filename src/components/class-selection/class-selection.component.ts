import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { PlayerClass } from '../../services/models';

@Component({
  selector: 'app-class-selection',
  standalone: true,
  templateUrl: './class-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassSelectionComponent {
  private gameService = inject(GameService);

  selectClass(playerClass: PlayerClass): void {
    this.gameService.setPlayerClass(playerClass);
  }
}