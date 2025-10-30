import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Rarity, Item } from '../../services/models';

@Component({
  selector: 'app-player-inspector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-inspector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInspectorComponent {
  private gameService = inject(GameService);
  
  playerData = computed(() => this.gameService.state().playerInspectorData);

  rarityBorderColors: { [key in Rarity]: string } = {
    'Common': 'border-gray-400',
    'Uncommon': 'border-green-500',
    'Rare': 'border-blue-500',
    'Epic': 'border-purple-500',
    'Legendary': 'border-orange-500',
    'Mythic': 'border-red-600',
    'Artifact': 'border-cyan-400',
    'Divine': 'border-yellow-300',
    'Exotic': 'animate-exotic-border',
    'Unique': 'animate-unique-glow'
  };

  private equipment = computed(() => this.playerData()?.equipment || []);

  // Helper to find an item by type
  private findItem = (type: Item['type']) => computed(() => this.equipment().find(item => item.type === type));

  helmet = this.findItem('helmet');
  armor = this.findItem('armor');
  weapon = this.findItem('weapon');
  shield = this.findItem('shield');
  boots = this.findItem('boots');
  gloves = this.findItem('gloves');
  amulet = this.findItem('amulet');
  
  // Rings are special as there can be two
  private rings = computed(() => this.equipment().filter(item => item.type === 'ring'));
  ring1 = computed(() => this.rings()[0]);
  ring2 = computed(() => this.rings()[1]);

  close(): void {
    this.gameService.togglePlayerInspector(null);
  }
}