import { Component, ChangeDetectionStrategy, inject, computed, signal, effect, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MessageService } from '../../services/message.service';
import { EventService } from '../../services/event.service';

type HubTab = 'play' | 'character' | 'community' | 'trade' | 'system';

@Component({
  selector: 'app-hub',
  standalone: true,
  templateUrl: './hub.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubComponent implements OnInit, OnDestroy {
  private gameService = inject(GameService);
  private messageService = inject(MessageService);
  private eventService = inject(EventService);

  private state = computed(() => this.gameService.state());
  highestFloor = computed(() => this.state().playerProgress.highestGauntletFloor || this.state().playerProgress.highestLevelReached);
  playerSkillPoints = computed(() => this.state().player.skillPoints);
  playerAscensionPoints = computed(() => this.state().player.ascensionPoints);
  playerLevel = computed(() => this.state().player.level);
  
  requiredLevelForAscension = computed(() => {
    const prestige = this.state().player.prestige;
    return this.gameService.getRequiredLevelForAscension(prestige);
  });

  isMaxLevel = computed(() => this.playerLevel() >= this.requiredLevelForAscension());

  activeTab = signal<HubTab>('play');
  
  activeEvent = this.eventService.activeEvent;
  timeLeft = signal(0);
  private timerInterval: any;

  leaderboardTimeLeft = signal('24:00:00');
  private leaderboardTimerInterval: any;

  constructor() {
    effect(() => {
        const event = this.activeEvent();
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        if (event && event.endsAt) {
            this.updateTimeLeft();
            this.timerInterval = setInterval(() => this.updateTimeLeft(), 1000);
        }
    });
  }

  ngOnInit(): void {
    this.startLeaderboardTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.leaderboardTimerInterval) {
      clearInterval(this.leaderboardTimerInterval);
    }
  }

  private startLeaderboardTimer(): void {
    const getTargetTime = (): number => {
      let target = localStorage.getItem('leaderboardResetTime');
      if (!target || Number(target) < Date.now()) {
        const newTarget = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('leaderboardResetTime', String(newTarget));
        return newTarget;
      }
      return Number(target);
    };

    let targetTime = getTargetTime();

    this.updateLeaderboardTime(targetTime); // Initial call
    this.leaderboardTimerInterval = setInterval(() => {
      if (Date.now() >= targetTime) {
        targetTime = getTargetTime();
      }
      this.updateLeaderboardTime(targetTime);
    }, 1000);
  }

  private updateLeaderboardTime(targetTime: number): void {
      const now = Date.now();
      const totalSeconds = Math.max(0, Math.floor((targetTime - now) / 1000));
      
      const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      
      this.leaderboardTimeLeft.set(`${hours}:${minutes}:${seconds}`);
  }

  private updateTimeLeft(): void {
    const event = this.activeEvent();
    if (event && event.endsAt) {
        const remaining = Math.max(0, Math.floor((event.endsAt - Date.now()) / 1000));
        this.timeLeft.set(remaining);
    }
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  
  setTab(tab: HubTab): void {
    this.activeTab.set(tab);
  }

  continueGame(): void {
    this.gameService.enterMapSelection();
  }

  startGauntlet(): void {
    if (this.state().player.prestige > 0) {
      this.messageService.showMessage('Gauntlet difficulty is scaled by your Prestige level!', 'info');
    }
    this.gameService.startGauntlet();
  }

  startNewGameClicked(): void {
    this.gameService.toggleNewGameConfirmation();
  }

  openShop(): void {
    this.gameService.toggleShop();
  }
  
  openDiamondShop(): void {
    this.gameService.toggleDiamondShop();
  }

  openChangelog(): void {
    this.gameService.toggleChangelog();
  }

  openSkillBook(): void {
    this.gameService.toggleSkillBook();
  }
  
  openDocumentation(): void {
    this.gameService.toggleDocumentation();
  }

  openThemePanel(): void {
    this.gameService.toggleCharacterPanel();
  }
  
  openForge(): void {
    this.gameService.toggleForge();
  }
  
  openCodex(): void {
    this.gameService.toggleCodex();
  }

  openLeaderboard(): void {
    this.gameService.toggleLeaderboard();
  }

  openQuestBoard(): void {
    this.gameService.toggleQuestBoard();
  }
  
  openGambling(): void {
    this.gameService.toggleGamblingPanel();
  }

  openAscension(): void {
    if (this.isMaxLevel()) {
      this.gameService.toggleAscensionPanel();
    } else {
      this.messageService.showMessage(`You must reach Level ${this.requiredLevelForAscension()} to Ascend.`, 'error');
    }
  }

  openAscensionGrid(): void {
    this.gameService.toggleAscensionGrid();
  }
  
  openArena(): void {
    this.gameService.toggleArenaPanel();
  }
  
  openChallengeRift(): void {
    this.gameService.toggleChallengeRiftPanel();
  }

  openGuildPanel(): void {
    this.gameService.toggleGuildPanel();
  }

  openTransmutationPanel(): void {
    this.gameService.toggleTransmutationPanel();
  }

  openStatsBreakdown(): void {
    this.gameService.toggleStatsBreakdown();
  }

  comingSoon(featureName: string): void {
    this.messageService.showMessage(`${featureName} is coming soon!`, 'info');
  }
}
