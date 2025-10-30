import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { HubComponent } from './components/hub/hub.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GameService } from './services/game.service';
import { ThemeService } from './services/theme.service';
import { EventService } from './services/event.service';
import { MapSelectionComponent } from './components/map-selection/map-selection.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ShopComponent } from './components/shop/shop.component';
import { AppearanceComponent } from './components/appearance/appearance.component';
import { DiamondShopComponent } from './components/diamond-shop/diamond-shop.component';
import { MessageComponent } from './components/message/message.component';
import { CombatScreenComponent } from './components/combat-screen/combat-screen.component';
import { RunSummaryComponent } from './components/run-summary/run-summary.component';
import { CharacterComponent } from './components/character/character.component';
import { SkillBookComponent } from './components/skill-book/skill-book.component';
import { ExitConfirmationComponent } from './components/exit-confirmation/exit-confirmation.component';
import { NewGameConfirmationComponent } from './components/new-game-confirmation/new-game-confirmation.component';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { UseItemModalComponent } from './components/use-item-modal/use-item-modal.component';
import { FleeConfirmationComponent } from './components/flee-confirmation/flee-confirmation.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { FloorStatusComponent } from './components/floor-status/floor-status.component';
import { ForgeComponent } from './components/forge/forge.component';
import { CodexComponent } from './components/codex/codex.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { QuestBoardComponent } from './components/quest-board/quest-board.component';
import { AscensionComponent } from './components/ascension/ascension.component';
import { GamblingComponent } from './components/gambling/gambling.component';
import { AscensionGridComponent } from './components/ascension-grid/ascension-grid.component';
import { ArenaComponent } from './components/arena/arena.component';
import { ChallengeRiftComponent } from './components/challenge-rift/challenge-rift.component';
import { GuildComponent } from './components/guild/guild.component';
import { TransmutationComponent } from './components/transmutation/transmutation.component';
import { LoginRewardComponent } from './components/login-reward/login-reward.component';
import { ClassSelectionComponent } from './components/class-selection/class-selection.component';
import { StatsBreakdownComponent } from './components/stats-breakdown/stats-breakdown.component';
import { PlayerInspectorComponent } from './components/player-inspector/player-inspector.component';
import { AltarComponent } from './components/altar/altar.component';
import { ArenaInfoComponent } from './components/arena-info/arena-info.component';
import { ArenaCombatComponent } from './components/arena-combat/arena-combat.component';
import { SynergyBreakComponent } from './components/synergy-break/synergy-break.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PlayerStatsComponent,
    GameScreenComponent,
    HubComponent,
    ControlsComponent,
    MapSelectionComponent,
    InventoryComponent,
    ShopComponent,
    AppearanceComponent,
    DiamondShopComponent,
    MessageComponent,
    CombatScreenComponent,
    RunSummaryComponent,
    CharacterComponent,
    SkillBookComponent,
    ExitConfirmationComponent,
    NewGameConfirmationComponent,
    ChangelogComponent,
    UseItemModalComponent,
    FleeConfirmationComponent,
    DocumentationComponent,
    FloorStatusComponent,
    ForgeComponent,
    CodexComponent,
    LeaderboardComponent,
    QuestBoardComponent,
    AscensionComponent,
    GamblingComponent,
    AscensionGridComponent,
    ArenaComponent,
    ChallengeRiftComponent,
    GuildComponent,
    TransmutationComponent,
    LoginRewardComponent,
    ClassSelectionComponent,
    StatsBreakdownComponent,
    PlayerInspectorComponent,
    AltarComponent,
    ArenaInfoComponent,
    ArenaCombatComponent,
    SynergyBreakComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private gameService = inject(GameService);
  private themeService = inject(ThemeService);
  private eventService = inject(EventService);
  state = this.gameService.state;

  constructor() {
    this.gameService.init();
    this.themeService.init();
    this.eventService.init();
  }

  toggleInventory(): void {
    this.gameService.toggleInventory();
  }

  toggleSkillBook(): void {
    this.gameService.toggleSkillBook();
  }

  exitMatch(): void {
    this.gameService.exitMatch();
  }
}