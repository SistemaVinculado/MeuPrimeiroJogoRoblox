import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Stat, World } from '../../services/models';
import { WORLDS } from '../../data/maps.data';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  private gameService = inject(GameService);

  worlds = WORLDS;
  playerProgress = computed(() => this.gameService.state().playerProgress);
  
  isWorldUnlocked(world: World): boolean {
    return this.playerProgress().unlockedWorldIds.includes(world.id);
  }

  isCurrentWorld(world: World): boolean {
    return this.playerProgress().currentWorldId === world.id;
  }

  close(): void {
    this.gameService.toggleCharacterPanel();
  }
}