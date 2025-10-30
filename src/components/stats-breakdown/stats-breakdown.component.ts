import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
// FIX: Import the 'Item' type to resolve a type error in the type guard below.
import { Player, Rarity, Item } from '../../services/models';

interface StatBreakdown {
  base: number;
  gear: number;
  perks: number;
  passivesFlat: number;
  passivesPercent: number;
  ascensionsFlat: number;
  ascensionsPercent: number;
  total: number;
}

@Component({
  selector: 'app-stats-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-breakdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsBreakdownComponent {
  private gameService = inject(GameService);

  player = computed(() => this.gameService.state().player);
  playerProgress = computed(() => this.gameService.state().playerProgress);

  private createBreakdown(statKey: 'maxHp' | 'maxEn' | 'attack' | 'defense' | 'luck'): StatBreakdown {
    const p = this.player();
    const stat = p[statKey];
    const passives = p.passiveBonuses[statKey] || { flat: 0, percent: 0 };
    const ascensions = p.ascensionBonuses[statKey] || { flat: 0, percent: 0 };

    const total = this.gameService.getTotalStat(statKey, p);
    
    return {
      base: stat.base,
      gear: stat.gear,
      perks: stat.perks,
      passivesFlat: passives.flat,
      passivesPercent: passives.percent,
      ascensionsFlat: ascensions.flat,
      ascensionsPercent: ascensions.percent,
      total: total
    };
  }
  
  maxHpBreakdown = computed(() => this.createBreakdown('maxHp'));
  maxEnBreakdown = computed(() => this.createBreakdown('maxEn'));
  attackBreakdown = computed(() => this.createBreakdown('attack'));
  defenseBreakdown = computed(() => this.createBreakdown('defense'));
  luckBreakdown = computed(() => this.createBreakdown('luck'));

  // Combat Ratings
  critChance = computed(() => (5 + this.luckBreakdown().total * 0.5).toFixed(1));
  critDamage = computed(() => 150); // Base value
  damageReduction = computed(() => {
    const totalDefense = this.defenseBreakdown().total;
    // Formula: DEF / (DEF + 100)
    return ((totalDefense / (totalDefense + 100)) * 100).toFixed(1);
  });

  // Bonus Stats
  goldFind = computed(() => this.player().ascensionBonuses.goldFind?.percent || 0);
  xpGain = computed(() => this.player().ascensionBonuses.xpGain?.percent || 0);

  // Equipment Summary
  equipmentSummary = computed(() => {
    const equippedItems = Object.values(this.player().equipment).filter((item): item is Item => item !== null);
    const rarityCounts: { [key in Rarity]?: number } = {};
    let primalCount = 0;
    const setCounts: { [setName: string]: number } = {};

    for (const item of equippedItems) {
      rarityCounts[item.rarity] = (rarityCounts[item.rarity] || 0) + 1;
      if (item.isPrimal) primalCount++;
      if (item.setName) {
        setCounts[item.setName] = (setCounts[item.setName] || 0) + 1;
      }
    }
    return { rarityCounts, primalCount, setCounts };
  });

  objectEntries = Object.entries;
  objectKeys = Object.keys;

  close(): void {
    this.gameService.toggleStatsBreakdown();
  }
}
