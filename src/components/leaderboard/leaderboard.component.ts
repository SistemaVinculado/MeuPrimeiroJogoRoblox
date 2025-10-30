import { Component, ChangeDetectionStrategy, inject, signal, computed, WritableSignal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { PlayerClass, LeaderboardEntry, LeaderboardCategory } from '../../services/models';

interface PlayerData {
  name: string;
  playerClass: PlayerClass;
  kills: number;
  level: number;
  totalPower: number;
  playtime: number; // seconds
  gauntletFloor: number;
  riftTime: number | null; // seconds, or null if not completed
  hasUnique: boolean;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent {
  private gameService = inject(GameService);

  activeCategory: WritableSignal<LeaderboardCategory> = signal('global');

  private rawData: PlayerData[] = this.generateMockPlayers(120);

  private generateMockPlayers(count: number): PlayerData[] {
    const names = ['Valerius', 'Lyra', 'Grom', 'Elara', 'Zane', 'Aria', 'Kael', 'Seraphina', 'Roric', 'Faye', 'Jax', 'Nia', 'Borin', 'Vesper', 'Torbjorn', 'Astrid', 'Fenrir', 'Isolde', 'Draven', 'Mira'];
    const players: PlayerData[] = [];

    for (let i = 0; i < count; i++) {
      const name = `${names[i % names.length]}${i >= names.length ? Math.floor(i / names.length) + 1 : ''}`;
      const totalPower = Math.floor(Math.random() * 1000) + 150;
      // Only very high-power players have a chance to have a Unique
      const hasUnique = totalPower > 1050 && Math.random() > 0.8;
      players.push({
        name: name,
        playerClass: Math.random() < 0.5 ? 'Warrior' : 'Mage',
        kills: Math.floor(Math.random() * 3000) + 200,
        level: Math.floor(Math.random() * 50) + 10,
        totalPower: totalPower,
        playtime: Math.floor(Math.random() * 100 * 3600) + 3600 * 5,
        gauntletFloor: Math.floor(Math.random() * 80) + 5,
        riftTime: Math.random() > 0.1 ? Math.floor(Math.random() * 300) + 180 : null,
        hasUnique: hasUnique,
      });
    }
    return players;
  }

  private getPrestige(rank: number): number {
    if (rank === 1) return 10;
    if (rank === 2) return 8;
    if (rank === 3) return 6;
    if (rank >= 4 && rank <= 10) return 4;
    if (rank >= 11 && rank <= 50) return 2;
    if (rank >= 51 && rank <= 100) return 1;
    return 0;
  }
  
  private formatPlaytime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  private formatRiftTime(totalSeconds: number | null): string {
    if (totalSeconds === null) return 'N/A';
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  // FIX: Made the scoreKey more specific to ensure type safety within the function.
  private processLeaderboard(scoreKey: 'kills' | 'level' | 'totalPower' | 'playtime' | 'gauntletFloor' | 'riftTime', formatter: (score: number | null) => string, sort: 'asc' | 'desc' = 'desc'): LeaderboardEntry[] {
    return [...this.rawData]
      .sort((a, b) => {
        const valA = a[scoreKey] ?? (sort === 'asc' ? Infinity : -Infinity);
        const valB = b[scoreKey] ?? (sort === 'asc' ? Infinity : -Infinity);
        return sort === 'desc' ? (valB as number) - (valA as number) : (valA as number) - (valB as number);
      })
      .map((player, index) => {
        const rank = index + 1;
        return {
          rank,
          name: player.name,
          playerClass: player.playerClass,
          score: (player[scoreKey] as number) ?? 0,
          displayScore: formatter(player[scoreKey]),
          prestige: this.getPrestige(rank),
        };
      });
  }

  private rankedCombat = computed(() => this.processLeaderboard('kills', (s) => `${(s ?? 0).toLocaleString()} Kills`));
  private rankedProgression = computed(() => this.processLeaderboard('level', (s) => `Level ${s ?? 0}`));
  private rankedTotalPower = computed(() => this.processLeaderboard('totalPower', (s) => `${s ?? 0} Power`));
  private rankedDedication = computed(() => this.processLeaderboard('playtime', (s) => this.formatPlaytime(s ?? 0)));
  private rankedGauntlet = computed(() => this.processLeaderboard('gauntletFloor', (s) => `Floor ${s ?? 0}`));
  private rankedRift = computed(() => this.processLeaderboard('riftTime', (s) => this.formatRiftTime(s), 'asc'));

  private rankedUniqueGear = computed(() => {
    return [...this.rawData]
      .filter(p => p.hasUnique)
      .sort((a, b) => b.totalPower - a.totalPower)
      .map((player, index) => {
        const rank = index + 1;
        return {
          rank,
          name: player.name,
          playerClass: player.playerClass,
          score: player.totalPower,
          displayScore: `${player.totalPower} Power`,
          prestige: this.getPrestige(rank),
        };
      });
  });

  private rankedGlobal = computed(() => {
    const combatRanks = this.rankedCombat();
    const progressionRanks = this.rankedProgression();
    const equipmentRanks = this.rankedTotalPower();
    const dedicationRanks = this.rankedDedication();
    const gauntletRanks = this.rankedGauntlet();
    const riftRanks = this.rankedRift();

    return this.rawData
      .map(player => {
        const combatPrestige = combatRanks.find(p => p.name === player.name)?.prestige || 0;
        const progressionPrestige = progressionRanks.find(p => p.name === player.name)?.prestige || 0;
        const equipmentPrestige = equipmentRanks.find(p => p.name === player.name)?.prestige || 0;
        const dedicationPrestige = dedicationRanks.find(p => p.name === player.name)?.prestige || 0;
        const gauntletPrestige = gauntletRanks.find(p => p.name === player.name)?.prestige || 0;
        const riftPrestige = riftRanks.find(p => p.name === player.name)?.prestige || 0;
        const totalPrestige = combatPrestige + progressionPrestige + equipmentPrestige + dedicationPrestige + gauntletPrestige + riftPrestige;
        return {
          ...player,
          totalPrestige,
        };
      })
      .sort((a, b) => b.totalPrestige - a.totalPrestige)
      .map((player, index) => {
        const rank = index + 1;
        return {
          rank,
          name: player.name,
          playerClass: player.playerClass,
          score: player.totalPrestige,
          displayScore: `${player.totalPrestige} Pts`,
          prestige: player.totalPrestige,
        };
      });
  });

  displayData = computed<LeaderboardEntry[]>(() => {
    switch (this.activeCategory()) {
      case 'global': return this.rankedGlobal().slice(0, 50);
      case 'combat': return this.rankedCombat().slice(0, 100);
      case 'progression': return this.rankedProgression().slice(0, 100);
      case 'totalPower': return this.rankedTotalPower().slice(0, 100);
      case 'uniqueGear': return this.rankedUniqueGear().slice(0, 100);
      case 'dedication': return this.rankedDedication().slice(0, 100);
      case 'gauntlet': return this.rankedGauntlet().slice(0, 100);
      case 'rift': return this.rankedRift().slice(0, 100);
      default: return [];
    }
  });
  
  categoryHeader = computed<string>(() => {
    switch (this.activeCategory()) {
      case 'global': return 'Prestige Points';
      case 'combat': return 'Total Kills';
      case 'progression': return 'Player Level';
      case 'totalPower': return 'Total Power';
      case 'uniqueGear': return 'Unique Gear Power';
      case 'dedication': return 'Playtime';
      case 'gauntlet': return 'Highest Floor';
      case 'rift': return 'Best Time';
      default: return 'Score';
    }
  });

  setCategory(category: LeaderboardCategory): void {
    this.activeCategory.set(category);
  }

  inspectPlayer(name: string): void {
    this.gameService.togglePlayerInspector(name);
  }

  close(): void {
    this.gameService.toggleLeaderboard();
  }

  getRankClass(rank: number): string {
    const category = this.activeCategory();

    if (category === 'global') {
        if (rank === 1) return 'rank-celestial-diamond';
        if (rank >= 2 && rank <= 3) return 'rank-astral-platinum';
        if (rank >= 4 && rank <= 10) return 'rank-legendary-gold';
        if (rank >= 11 && rank <= 25) return 'rank-mythical-amethyst';
        if (rank >= 26 && rank <= 50) return 'rank-ancient-emerald';
    }

    if (rank === 1) return 'text-[#00D1FF]';
    if (rank >= 2 && rank <= 3) return 'text-[#E5E4E2]';
    if (rank >= 4 && rank <= 10) return 'text-[#FFD700]';
    if (rank >= 11 && rank <= 25) return 'text-[#A335EE]';
    if (rank >= 26 && rank <= 50) return 'text-[#00C853]';
    if (rank >= 51 && rank <= 75) return 'text-[#0070DD]';
    if (rank >= 76 && rank <= 100) return 'text-[#CD7F32]';
    
    return 'text-gray-300';
  }

  getRankTitle(rank: number): string {
    const category = this.activeCategory();

    if (category === 'global') {
        if (rank === 1) return 'Celestial Diamond';
        if (rank >= 2 && rank <= 3) return 'Astral Platinum';
        if (rank >= 4 && rank <= 10) return 'Legendary Gold';
        if (rank >= 11 && rank <= 25) return 'Mythical Amethyst';
        if (rank >= 26 && rank <= 50) return 'Ancient Emerald';
    }

    if (rank === 1) return 'Diamond';
    if (rank >= 2 && rank <= 3) return 'Platinum';
    if (rank >= 4 && rank <= 10) return 'Gold';
    if (rank >= 11 && rank <= 25) return 'Amethyst';
    if (rank >= 26 && rank <= 50) return 'Emerald';
    if (rank >= 51 && rank <= 75) return 'Sapphire';
    if (rank >= 76 && rank <= 100) return 'Bronze';
    
    return '';
  }
}