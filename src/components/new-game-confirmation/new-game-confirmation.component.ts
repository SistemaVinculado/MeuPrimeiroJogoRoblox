import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-new-game-confirmation',
  standalone: true,
  templateUrl: './new-game-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameConfirmationComponent {
  private gameService = inject(GameService);

  cancel(): void {
    this.gameService.toggleNewGameConfirmation();
  }

  confirm(): void {
    this.gameService.startNewGame();
  }
}