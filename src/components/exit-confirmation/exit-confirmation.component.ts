import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-exit-confirmation',
  standalone: true,
  templateUrl: './exit-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitConfirmationComponent {
  private gameService = inject(GameService);

  stay(): void {
    this.gameService.toggleExitConfirmation();
  }

  leave(): void {
    this.gameService.confirmExitMatch();
  }
}
