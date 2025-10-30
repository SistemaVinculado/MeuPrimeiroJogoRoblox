import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-changelog',
  standalone: true,
  templateUrl: './changelog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangelogComponent {
  private gameService = inject(GameService);

  close(): void {
    this.gameService.toggleChangelog();
  }
}
