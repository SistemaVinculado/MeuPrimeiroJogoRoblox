import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { SkillNode, Skill } from '../../services/models';
import { SKILL_TREE_DATA } from '../../data/skills.data';

@Component({
  selector: 'app-skill-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-book.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillBookComponent {
  private gameService = inject(GameService);

  player = computed(() => this.gameService.state().player);
  
  respecConfirmationVisible = signal(false);

  classSkillTree = computed(() => {
    const p = this.player();
    return SKILL_TREE_DATA.filter(node => node.playerClass === p.playerClass);
  });
  
  respecCost = computed(() => this.player().level * 100);

  isNodeLearned(nodeId: string): boolean {
    return this.player().learnedSkillNodeIds.includes(nodeId);
  }

  isNodeLearnable(node: SkillNode): boolean {
    const p = this.player();
    if (this.isNodeLearned(node.id)) return false;
    if (p.level < node.levelRequirement) return false;
    if (p.skillPoints < node.cost) return false;
    if (node.dependencies) {
      for (const depId of node.dependencies) {
        if (!p.learnedSkillNodeIds.includes(depId)) {
          return false;
        }
      }
    }
    return true;
  }

  getSkillById(skillId: string | undefined): Skill | undefined {
    if (!skillId) {
        return undefined;
    }
    return this.player().skills.find(s => s.id === skillId);
  }

  learn(nodeId: string): void {
    this.gameService.learnSkillNode(nodeId);
  }

  attemptRespec(): void {
    this.respecConfirmationVisible.set(true);
  }

  confirmRespec(): void {
    this.gameService.respecSkills();
    this.respecConfirmationVisible.set(false);
  }
  
  cancelRespec(): void {
    this.respecConfirmationVisible.set(false);
  }

  close(): void {
    this.gameService.toggleSkillBook();
  }
}
