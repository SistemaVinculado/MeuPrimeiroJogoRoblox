import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { AscensionNode } from '../../services/models';
import { ASCENSION_GRID_DATA } from '../../data/ascension.data';

@Component({
  selector: 'app-ascension-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ascension-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AscensionGridComponent {
  private gameService = inject(GameService);

  player = computed(() => this.gameService.state().player);
  
  ascensionTree = computed(() => {
    const p = this.player();
    return ASCENSION_GRID_DATA.filter(node => !node.playerClass || node.playerClass === 'All' || node.playerClass === p.playerClass);
  });

  isNodeLearned(nodeId: string): boolean {
    return this.player().learnedAscensionNodeIds.includes(nodeId);
  }

  isNodeLearnable(node: AscensionNode): boolean {
    const p = this.player();
    if (this.isNodeLearned(node.id)) return false;
    if (p.ascensionPoints < node.cost) return false;
    if (node.dependencies) {
      for (const depId of node.dependencies) {
        if (!p.learnedAscensionNodeIds.includes(depId)) {
          return false;
        }
      }
    }
    return true;
  }

  learn(nodeId: string): void {
    this.gameService.learnAscensionNode(nodeId);
  }

  close(): void {
    this.gameService.toggleAscensionGrid();
  }
}