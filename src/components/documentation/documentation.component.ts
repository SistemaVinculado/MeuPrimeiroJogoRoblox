import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-documentation',
  standalone: true,
  templateUrl: './documentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent {
  private gameService = inject(GameService);

  close(): void {
    this.gameService.toggleDocumentation();
  }
}
