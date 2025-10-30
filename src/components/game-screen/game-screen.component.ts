import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Enemy, AppearanceItem } from '../../services/models';
import { CommonModule } from '@angular/common';
import { APPEARANCE_SHOP_ITEMS, DEFAULT_APPEARANCES } from '../../data/appearances.data';
import { DIFFICULTY_SETTINGS } from '../../data/maps.data';

type WardrobeCategory = 'player' | 'weapon' | 'shield';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class GameScreenComponent {
  gameService = inject(GameService);
  state = this.gameService.state;

  grid = computed(() => this.state().dungeon.grid);
  visibilityGrid = computed(() => this.state().dungeon.visibilityGrid);
  player = computed(() => this.state().player);
  enemies = computed(() => this.state().enemies);

  isFinalLevel = computed(() => {
    const s = this.state();
    if (!s.currentDifficulty) {
      return false;
    }
    const difficultyInfo = DIFFICULTY_SETTINGS[s.currentDifficulty];
    return s.dungeon.level >= difficultyInfo.finalLevel;
  });

  // Helper function for the template to find an enemy at a specific coordinate
  getEnemyAt(x: number, y: number): Enemy | undefined {
    return this.enemies().find(e => e.position.x === x && e.position.y === y);
  }
  
  private findItemVisuals(id: string, type: WardrobeCategory): AppearanceItem['visuals'] {
    if (id === 'default') {
      return DEFAULT_APPEARANCES[type].visuals;
    }
    return APPEARANCE_SHOP_ITEMS.find(item => item.id === id)?.visuals || DEFAULT_APPEARANCES[type].visuals;
  }
  
  private findItemAbbreviation(id: string, type: WardrobeCategory): string {
    if (id === 'default') {
      return DEFAULT_APPEARANCES[type].abbreviatedName;
    }
    return APPEARANCE_SHOP_ITEMS.find(item => item.id === id)?.abbreviatedName || DEFAULT_APPEARANCES[type].abbreviatedName;
  }

  playerVisuals = computed(() => {
    const p = this.player();
    return {
        player: this.findItemVisuals(p.equippedPlayerId, 'player'),
        playerAbbr: this.findItemAbbreviation(p.equippedPlayerId, 'player'),
        weapon: this.findItemVisuals(p.equippedWeaponId, 'weapon'),
        weaponAbbr: this.findItemAbbreviation(p.equippedWeaponId, 'weapon'),
        shield: this.findItemVisuals(p.equippedShieldId, 'shield'),
        shieldAbbr: this.findItemAbbreviation(p.equippedShieldId, 'shield'),
    };
  });

  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.state().status !== 'playing' || this.state().inventoryPanelOpen) return;

    switch (event.key) {
      case 'ArrowUp':
        this.gameService.movePlayer(0, -1);
        break;
      case 'ArrowDown':
        this.gameService.movePlayer(0, 1);
        break;
      case 'ArrowLeft':
        this.gameService.movePlayer(-1, 0);
        break;
      case 'ArrowRight':
        this.gameService.movePlayer(1, 0);
        break;
    }
  }
}
