import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-flee-confirmation',
  standalone: true,
  templateUrl: './flee-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleeConfirmationComponent {
  private gameService = inject(GameService);

  resumeBattle(): void {
    this.gameService.cancelFlee();
  }

  attemptToFlee(): void {
    this.gameService.confirmFlee();
  }
}
