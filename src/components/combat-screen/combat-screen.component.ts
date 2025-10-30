import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player, Enemy, Stat, Skill, StatusEffect } from '../../services/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-combat-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './combat-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombatScreenComponent {
  private gameService = inject(GameService);
  private state = this.gameService.state;

  player = computed(() => this.state().player);
  
  activeEnemy = computed<Enemy | null>(() => {
    const state = this.state();
    if (!state.activeEnemyId) return null;
    return state.enemies.find(e => e.id === state.activeEnemyId) || null;
  });

  combatLog = computed(() => this.state().combatLog);
  combatStatus = computed(() => this.state().combatStatus);
  
  playerFlash = signal(false);
  enemyFlash = signal(false);

  private getTotalStat(statKey: 'maxHp' | 'maxEn' | 'attack' | 'defense' | 'luck', player: Player): number {
    return this.gameService.getTotalStat(statKey, player);
  }

  playerAttack = computed(() => this.getTotalStat('attack', this.player()));
  playerDefense = computed(() => this.getTotalStat('defense', this.player()));
  playerMaxHp = computed(() => this.getTotalStat('maxHp', this.player()));
  playerMaxEn = computed(() => this.getTotalStat('maxEn', this.player()));

  getPlayerHpPercent(): number {
    const p = this.player();
    const maxHp = this.playerMaxHp();
    return maxHp > 0 ? (p.hp / maxHp) * 100 : 0;
  }

  getPlayerEnPercent(): number {
    const p = this.player();
    const maxEn = this.playerMaxEn();
    return maxEn > 0 ? (p.en / maxEn) * 100 : 0;
  }

  getEnemyHpPercent(): number {
    const enemy = this.activeEnemy();
    if (!enemy) return 0;
    return enemy.maxHp > 0 ? (enemy.hp / enemy.maxHp) * 100 : 0;
  }

  attack(): void {
    this.playerFlash.set(true);
    this.enemyFlash.set(true);
    setTimeout(() => {
        this.playerFlash.set(false);
        this.enemyFlash.set(false);
    }, 300);
    this.gameService.playerAttack();
  }
  
  guard(): void {
    this.playerFlash.set(true);
    setTimeout(() => this.playerFlash.set(false), 300);
    this.gameService.guard();
  }

  useSkill(skill: Skill): void {
      this.playerFlash.set(true);
      this.enemyFlash.set(true);
      setTimeout(() => {
          this.playerFlash.set(false);
          this.enemyFlash.set(false);
      }, 300);
      this.gameService.useSkill(skill.id);
  }

  isSkillDisabled(skill: Skill): boolean {
    const p = this.player();
    return p.en < skill.cost || skill.currentCooldown > 0 || this.combatStatus() !== 'player_turn';
  }

  openUseItemModal(): void {
    this.gameService.toggleUseItemModal();
  }

  flee(): void {
    this.gameService.requestFlee();
  }
  
  getStatusEffectTooltip(effect: StatusEffect): string {
    switch (effect.type) {
      case 'stun': return 'Stunned: Cannot perform any actions.';
      case 'chilled': return 'Chilled: Deals 25% less damage.';
      case 'poison': return `Poisoned: Takes ${effect.value || 3} damage at the start of their turn.`;
      case 'defense_boost': return `Fortified: Defense is increased by ${effect.value}%.`;
      case 'guarding': return 'Guarding: Taking 50% reduced damage for this turn.';
      case 'retaliating': return 'Retaliating: Block chance is tripled. Reflects damage on successful blocks.';
      case 'phased': return 'Phased: Will dodge the next incoming attack.';
      case 'enraged': return 'Enraged: Deals 50% more damage.';
      case 'channeling': return 'Channeling: Preparing a powerful attack for the next turn!';
      case 'thorns': return `Thorns: Reflects ${effect.value} damage back to attackers.`;
      case 'weaken': return 'Weakened: Takes 25% more damage from all sources.';
      case 'burn': return `Burning: Takes ${effect.value || 5} damage at the start of their turn.`;
      case 'bleed': return `Bleeding: Takes ${effect.value || 4} damage at the start of their turn.`;
      default: return 'An unknown effect.';
    }
  }
}