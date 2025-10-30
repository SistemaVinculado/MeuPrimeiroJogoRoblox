import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Player } from '../../services/models';

@Component({
  selector: 'app-arena-combat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arena-combat.component.html',
  styleUrls: ['./arena-combat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArenaCombatComponent {
  private gameService = inject(GameService);
  private state = this.gameService.state;

  player = computed(() => this.state().player);
  battle = computed(() => this.state().activeArenaBattle);
  opponent = computed(() => this.battle()?.opponent);
  combatLog = computed(() => this.state().arenaCombatLog);

  isBattleOver = computed(() => {
    const log = this.combatLog();
    if (log.length === 0) return false;
    const lastMessage = log[log.length - 1];
    return lastMessage.includes('VICTORY') || lastMessage.includes('DEFEAT');
  });

  playerTotalHp = computed(() => {
    const p = this.player();
    return this.gameService.getTotalStat('maxHp', p);
  });
  
  // Since the combat is a simulation, we need to track HP changes manually for the UI
  playerCurrentHp = computed(() => {
    const initialHp = this.playerTotalHp();
    const log = this.combatLog();
    const opponentName = this.opponent()?.name;
    if (!opponentName) return initialHp;

    const damageTaken = log
      .filter(msg => msg.startsWith(`> ${opponentName}`))
      .reduce((total, msg) => {
        const match = msg.match(/for (\d+) damage/);
        return total + (match ? parseInt(match[1], 10) : 0);
      }, 0);
      
    const lifestealHeal = log
      .filter(msg => msg.includes('and heal for'))
       .reduce((total, msg) => {
        const match = msg.match(/heal for (\d+)/);
        return total + (match ? parseInt(match[1], 10) : 0);
      }, 0);

    return Math.max(0, initialHp - damageTaken + lifestealHeal);
  });

  opponentCurrentHp = computed(() => {
    const initialHp = this.opponent()?.playerSnapshot.maxHp.base || 0;
    const log = this.combatLog();
    const damageTaken = log
      .filter(msg => msg.startsWith('> You attack'))
      .reduce((total, msg) => {
        const match = msg.match(/for (\d+) damage/);
        return total + (match ? parseInt(match[1], 10) : 0);
      }, 0);
    return Math.max(0, initialHp - damageTaken);
  });

  playerHpPercent = computed(() => {
    const maxHp = this.playerTotalHp();
    return maxHp > 0 ? (this.playerCurrentHp() / maxHp) * 100 : 0;
  });

  opponentHpPercent = computed(() => {
    const maxHp = this.opponent()?.playerSnapshot.maxHp.base || 0;
    return maxHp > 0 ? (this.opponentCurrentHp() / maxHp) * 100 : 0;
  });

  continue(): void {
    // FIX: Call the newly implemented 'finalizeArenaBattle' method.
    this.gameService.finalizeArenaBattle();
  }
}