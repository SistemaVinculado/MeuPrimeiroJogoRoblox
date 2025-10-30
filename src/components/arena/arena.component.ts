import { Component, ChangeDetectionStrategy, inject, computed, OnInit, OnDestroy, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { ArenaOpponent, BattleLogEntry, Rarity } from '../../services/models';
import { ARENA_SHOP_ITEMS, ArenaShopItem } from '../../data/arena-shop.data';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arena.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArenaComponent implements OnInit, OnDestroy {
  private gameService = inject(GameService);
  private messageService = inject(MessageService);
  
  state = computed(() => this.gameService.state());
  opponents = computed(() => this.state().arenaOpponents);
  battleLogs = computed(() => this.state().arenaBattleLogs.slice().reverse()); // Show newest first
  playerRank = computed(() => this.state().player.arenaRank);

  // New features state
  currentTab = signal<'challengers' | 'logs' | 'shop'>('challengers');
  arenaShopItems = ARENA_SHOP_ITEMS;
  currentSeason = 'Season 1';
  seasonEndDate = new Date(); // Will be set in constructor
  seasonTimeLeft = signal('');
  private timerInterval: any;

  currentArenaModifier = computed(() => this.gameService.getCurrentArenaModifier());

  canAffordTicket = computed(() => this.state().player.diamonds >= 50);

  constructor() {
    // Set season end to be 4 weeks from now for demonstration
    this.seasonEndDate.setDate(this.seasonEndDate.getDate() + 28);
  }

  ngOnInit() {
    if (this.opponents().length === 0) {
        this.gameService.getArenaOpponents();
    }
    this.updateTimeLeft();
    this.timerInterval = setInterval(() => this.updateTimeLeft(), 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTimeLeft(): void {
    const now = new Date().getTime();
    const distance = this.seasonEndDate.getTime() - now;

    if (distance < 0) {
      this.seasonTimeLeft.set('Season Ended');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seasonTimeLeft.set(`${days}d ${hours}h ${minutes}m`);
  }

  setTab(tab: 'challengers' | 'logs' | 'shop'): void {
    this.currentTab.set(tab);
  }

  close(): void {
    this.gameService.toggleArenaPanel();
  }

  openInfo(): void {
    // FIX: Call the newly implemented 'toggleArenaInfo' method.
    this.gameService.toggleArenaInfo();
  }

  fight(opponent: ArenaOpponent): void {
    this.gameService.startArenaBattle(opponent);
  }

  revengeFight(log: BattleLogEntry): void {
    this.messageService.showMessage(`Seeking revenge on ${log.opponent.name}...`, 'info');
    this.gameService.startArenaBattle(log.opponent, true);
  }

  refreshOpponents(): void {
    this.gameService.getArenaOpponents();
  }

  buyArenaItem(item: ArenaShopItem): void {
    this.gameService.buyArenaShopItem(item.id);
  }

  buyTicket(): void {
    this.gameService.buyArenaTicket();
  }

  private getRomanNumeral(num: number): string {
    if (num < 1 || num > 5) return '';
    const numerals = ['I', 'II', 'III', 'IV', 'V'];
    return numerals[num - 1];
  }

  getRankTier(rank: number): { name: string; division: string | null; color: string } {
    if (rank === 1) return { name: 'The Soul of the Dungeon', division: null, color: 'rank-celestial-diamond' };
    if (rank <= 10) return { name: 'Eternal Ghost', division: null, color: 'rank-astral-platinum' };
    if (rank <= 100) return { name: 'Lord of the Abyss', division: null, color: 'rank-legendary-gold' };
    if (rank <= 500) return { name: 'Abyssal Champion', division: null, color: 'rank-mythical-amethyst' };

    const getDivision = (playerRank: number, minRank: number, maxRank: number, totalDivisions: number): number => {
      const rankRange = maxRank - minRank + 1;
      const ranksPerDivision = rankRange / totalDivisions;
      // Subtract minRank to normalize to 0-based index for calculation
      const division = Math.floor((playerRank - minRank) / ranksPerDivision) + 1;
      return Math.min(totalDivisions, Math.max(1, division));
    };

    if (rank <= 1000) { // Obsidian Slayer (501-1000)
        const division = getDivision(rank, 501, 1000, 5);
        return { name: 'Obsidian Slayer', division: this.getRomanNumeral(division), color: 'text-purple-300' };
    }
    if (rank <= 2000) { // Adamantine Conqueror (1001-2000)
        const division = getDivision(rank, 1001, 2000, 5);
        return { name: 'Adamantine Conqueror', division: this.getRomanNumeral(division), color: 'text-slate-300' };
    }
    if (rank <= 4000) { // Mithril Guardian (2001-4000)
        const division = getDivision(rank, 2001, 4000, 5);
        return { name: 'Mithril Guardian', division: this.getRomanNumeral(division), color: 'text-cyan-300' };
    }
    if (rank <= 6000) { // Steel Sentinel (4001-6000)
        const division = getDivision(rank, 4001, 6000, 5);
        return { name: 'Steel Sentinel', division: this.getRomanNumeral(division), color: 'text-gray-300' };
    }
    if (rank <= 8000) { // Bronze Pathfinder (6001-8000)
        const division = getDivision(rank, 6001, 8000, 5);
        return { name: 'Bronze Pathfinder', division: this.getRomanNumeral(division), color: 'text-orange-400' };
    }
    if (rank <= 9999) { // Iron Tracker (8001-9999)
        const division = getDivision(rank, 8001, 9999, 3);
        return { name: 'Iron Tracker', division: this.getRomanNumeral(division), color: 'text-gray-400' };
    }
    
    return { name: 'Stone Initiate', division: null, color: 'text-gray-500' };
  }

  rarityColors: { [key in Rarity]: string } = {
    'Common': '#B0B0B0',
    'Uncommon': '#1EFF00',
    'Rare': '#0070DD',
    'Epic': '#A335EE',
    'Legendary': '#FF8000',
    'Mythic': '#E50000',
    'Artifact': '#00D1FF',
    'Divine': '#FFD700',
    'Exotic': '#FF8000',
    'Unique': '#f5f3ff'
  };
}