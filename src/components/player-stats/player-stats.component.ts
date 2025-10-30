import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player, Stat } from '../../services/models';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerStatsComponent {
  private gameService = inject(GameService);
  player = computed(() => this.gameService.state().player);
  playerProgress = computed(() => this.gameService.state().playerProgress);

  // FIX: Added 'critDamage' to the allowed stat keys to match the updated service method.
  private getTotalStat(statKey: 'maxHp' | 'maxEn' | 'attack' | 'defense' | 'luck' | 'critDamage'): number {
    const p = this.player();
    if (!p) return 0;
    return this.gameService.getTotalStat(statKey, p);
  }

  totalMaxHp = computed(() => this.getTotalStat('maxHp'));
  totalMaxEn = computed(() => this.getTotalStat('maxEn'));
  totalAttack = computed(() => this.getTotalStat('attack'));
  totalDefense = computed(() => this.getTotalStat('defense'));
  totalLuck = computed(() => this.getTotalStat('luck'));
  totalCritDamage = computed(() => this.getTotalStat('critDamage'));
  synergyMeter = computed(() => this.playerProgress().synergyMeter);

  getHealthPercentage(): number {
    const p = this.player();
    const maxHp = this.totalMaxHp();
    if (!p || maxHp === 0) return 0;
    return (p.hp / maxHp) * 100;
  }

  getEnergyPercentage(): number {
    const p = this.player();
    const maxEn = this.totalMaxEn();
    if (!p || maxEn === 0) return 0;
    return (p.en / maxEn) * 100;
  }

  getXpPercentage(): number {
    const p = this.player();
    if (!p || p.xpToNextLevel === 0) return 0;
    return (p.xp / p.xpToNextLevel) * 100;
  }

  getSynergyPercentage(): number {
    return this.synergyMeter();
  }
}