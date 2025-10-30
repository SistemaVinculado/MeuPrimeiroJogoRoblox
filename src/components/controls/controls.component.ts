import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-controls',
  standalone: true,
  templateUrl: './controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  private gameService = inject(GameService);

  moveUp(): void {
    this.gameService.movePlayer(0, -1);
  }

  moveDown(): void {
    this.gameService.movePlayer(0, 1);
  }

  moveLeft(): void {
    this.gameService.movePlayer(-1, 0);
  }

  moveRight(): void {
    this.gameService.movePlayer(1, 0);
  }
}
