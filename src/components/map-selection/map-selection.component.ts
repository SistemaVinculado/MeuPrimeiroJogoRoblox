import { Component, ChangeDetectionStrategy, inject, signal, computed, viewChild, ElementRef, effect, WritableSignal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MapInfo, Difficulty, World } from '../../services/models';
import { CommonModule } from '@angular/common';
import { MAPS, DIFFICULTY_SETTINGS, WORLDS } from '../../data/maps.data';

@Component({
  selector: 'app-map-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapSelectionComponent {
  private gameService = inject(GameService);
  
  worlds = WORLDS;
  difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Dark', 'Dark+'];
  difficultySettings = DIFFICULTY_SETTINGS;
  selectedMap = signal<World | null>(null);
  selectedWorldTier = signal<number | null>(null);
  
  private state = this.gameService.state;
  playerProgress = computed(() => this.state().playerProgress);
  playerLevel = computed(() => this.state().player.level);
  unlockedWorldIds = computed(() => this.playerProgress().unlockedWorldIds);
  
  unlockedWorldTiers = computed(() => {
    const map = this.selectedMap();
    if (!map) return 0;
    return this.playerProgress().unlockedWorldTiers[map.id] || 0;
  });

  firstAscentLeaderboard = computed(() => {
    const map = this.selectedMap();
    if (!map) return [];
    // Mock data for the "First Ascent" leaderboard
    if (map.id === 'verdant-labyrinth') {
        return [
            { tier: 1, name: 'Valerius', time: '3:45' },
            { tier: 2, name: 'Lyra', time: '4:12' },
            { tier: 3, name: 'Grom', time: '4:30' },
        ];
    }
    // You can add mock data for other worlds here
    return [];
  });

  // Signals for smart scroll indicators
  showLeftScrollDungeon = signal(false);
  showRightScrollDungeon = signal(false);
  showLeftScrollDifficulty = signal(false);
  showRightScrollDifficulty = signal(false);

  // Element Refs using new signal-based viewChild
  dungeonContainerRef = viewChild<ElementRef<HTMLDivElement>>('dungeonContainer');
  difficultyContainerRef = viewChild<ElementRef<HTMLDivElement>>('difficultyContainer');

  constructor() {
    // Effect to react to container availability and update scroll indicators
    effect(() => {
        const dungeonEl = this.dungeonContainerRef()?.nativeElement;
        if (dungeonEl) {
            // Initial check
            this.updateDungeonScrollIndicators();
            // Also update on resize if the container becomes scrollable/unscrollable
            const resizeObserver = new ResizeObserver(() => this.updateDungeonScrollIndicators());
            resizeObserver.observe(dungeonEl);
        }
    });

    effect(() => {
        const difficultyEl = this.difficultyContainerRef()?.nativeElement;
        if (difficultyEl) {
            this.updateDifficultyScrollIndicators();
            const resizeObserver = new ResizeObserver(() => this.updateDifficultyScrollIndicators());
            resizeObserver.observe(difficultyEl);
        }
    });
  }

  updateDungeonScrollIndicators(): void {
    const el = this.dungeonContainerRef()?.nativeElement;
    if (!el) return;
    
    // Allow a 1px tolerance for floating point inconsistencies
    const canScrollLeft = el.scrollLeft > 1;
    const canScrollRight = el.scrollWidth > el.clientWidth && el.scrollLeft < (el.scrollWidth - el.clientWidth - 1);
    
    this.showLeftScrollDungeon.set(canScrollLeft);
    this.showRightScrollDungeon.set(canScrollRight);
  }

  updateDifficultyScrollIndicators(): void {
    const el = this.difficultyContainerRef()?.nativeElement;
    if (!el) return;
    
    const canScrollLeft = el.scrollLeft > 1;
    const canScrollRight = el.scrollWidth > el.clientWidth && el.scrollLeft < (el.scrollWidth - el.clientWidth - 1);
    
    this.showLeftScrollDifficulty.set(canScrollLeft);
    this.showRightScrollDifficulty.set(canScrollRight);
  }

  scrollDungeon(direction: 'left' | 'right'): void {
    const el = this.dungeonContainerRef()?.nativeElement;
    if (!el) return;
    // Scroll by 80% of the container's visible width for a nice page-like effect
    const scrollAmount = el.clientWidth * 0.8; 
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollDifficulty(direction: 'left' | 'right'): void {
    const el = this.difficultyContainerRef()?.nativeElement;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  isWorldDiscovered(world: World): boolean {
    return this.unlockedWorldIds().includes(world.id);
  }
  
  isWorldUnlocked(world: World): boolean {
    const discovered = this.isWorldDiscovered(world);
    const levelMet = world.requiredLevel ? this.playerLevel() >= world.requiredLevel : true;
    return discovered && levelMet;
  }

  selectMap(world: World): void {
    if (this.isWorldUnlocked(world)) {
      this.selectedMap.set(world);
      this.selectedWorldTier.set(null); // Reset tier selection
    }
  }
  
  backToHub(): void {
    this.gameService.backToHub();
  }

  backToMapList(): void {
    this.selectedMap.set(null);
  }

  startDungeon(difficulty: Difficulty): void {
    if (this.selectedMap() && this.isDifficultyUnlocked(difficulty)) {
      // If a tier is selected, the difficulty is automatically Dark+
      const finalDifficulty = this.selectedWorldTier() !== null ? 'Dark+' : difficulty;
      this.gameService.startDungeon(this.selectedMap()!.id, finalDifficulty, this.selectedWorldTier());
    }
  }

  isDifficultyUnlocked(difficulty: Difficulty): boolean {
    const playerLvl = this.playerLevel();
    const requiredLvl = this.difficultySettings[difficulty].requiredPlayerLevel;

    if (playerLvl < requiredLvl) {
      return false;
    }

    const map = this.selectedMap();
    if (!map) return false;

    const completedOnMap = this.playerProgress().completedDifficulties[map.id] || [];

    switch (difficulty) {
        case 'Easy':
            return true;
        case 'Medium':
            return completedOnMap.includes('Easy');
        case 'Hard':
            return completedOnMap.includes('Medium');
        case 'Dark':
            return completedOnMap.includes('Hard');
        case 'Dark+':
            return completedOnMap.includes('Dark');
        default:
            return false;
    }
  }

  getUnlockRequirementTextForWorld(world: World): string {
    const requirements: string[] = [];
    if (world.requiredLevel && this.playerLevel() < world.requiredLevel) {
        requirements.push(`Reach Lvl ${world.requiredLevel}`);
    }
    if (world.requiredWorldId && !this.unlockedWorldIds().includes(world.id)) {
        const prevWorld = this.worlds.find(w => w.id === world.requiredWorldId);
        requirements.push(`Beat ${prevWorld?.name || 'previous world'}`);
    }
    return requirements.join(' & ');
  }

  getUnlockRequirementTextForDifficulty(difficulty: Difficulty): string {
    const playerLvl = this.playerLevel();
    const requiredLvl = this.difficultySettings[difficulty].requiredPlayerLevel;
    const map = this.selectedMap();
    if (!map) return '';
    const completedOnMap = this.playerProgress().completedDifficulties[map.id] || [];

    const requirements: string[] = [];

    // Check previous difficulty completion requirement
    let requiredCompletion: Difficulty | null = null;
    switch(difficulty) {
        case 'Medium': if (!completedOnMap.includes('Easy')) requiredCompletion = 'Easy'; break;
        case 'Hard':   if (!completedOnMap.includes('Medium')) requiredCompletion = 'Medium'; break;
        case 'Dark':   if (!completedOnMap.includes('Hard')) requiredCompletion = 'Hard'; break;
        case 'Dark+':  if (!completedOnMap.includes('Dark')) requiredCompletion = 'Dark'; break;
    }

    if (requiredCompletion) {
        requirements.push(`Beat '${requiredCompletion}'`);
    }
    
    // Check level requirement
    if (playerLvl < requiredLvl) {
        requirements.push(`Reach Lvl ${requiredLvl}`);
    }

    return "Requires: " + requirements.join(' & ');
  }

  isDarkPlusRevealed(): boolean {
    const map = this.selectedMap();
    if (!map) {
      return false;
    }
    const completedOnMap = this.playerProgress().completedDifficulties[map.id] || [];
    return completedOnMap.includes('Dark');
  }

  getDifficultyColor(difficulty: Difficulty): string {
    switch (difficulty) {
      case 'Easy': return 'border-green-500 text-green-400';
      case 'Medium': return 'border-blue-500 text-blue-400';
      case 'Hard': return 'border-orange-500 text-orange-400';
      case 'Dark': return 'border-red-600 text-red-500';
      case 'Dark+': return 'border-purple-500 text-purple-400';
      default: return 'border-slate-600 text-slate-400';
    }
  }

  getCompletedDifficulties(mapKey: string): Difficulty[] {
    return this.playerProgress().completedDifficulties[mapKey] || [];
  }

  getDifficultyBadgeColor(difficulty: Difficulty): string {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500 border-green-300';
      case 'Medium': return 'bg-blue-500 border-blue-300';
      case 'Hard': return 'bg-orange-500 border-orange-300';
      case 'Dark': return 'bg-red-600 border-red-400';
      case 'Dark+': return 'bg-purple-500 border-purple-300';
      default: return 'bg-slate-700 border-slate-500';
    }
  }
}