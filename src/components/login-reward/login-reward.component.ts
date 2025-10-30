import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { LOGIN_REWARDS_DATA } from '../../data/login-rewards.data';
import { LoginReward } from '../../services/models';

@Component({
  selector: 'app-login-reward',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-reward.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginRewardComponent {
  private gameService = inject(GameService);

  rewards = LOGIN_REWARDS_DATA;
  loginStreak = computed(() => this.gameService.state().playerProgress.loginStreak);
  
  isRewardClaimable(day: number): boolean {
    const streak = this.loginStreak();
    // A reward is claimable if it's the next day in the streak
    return day === streak + 1;
  }

  isRewardClaimed(day: number): boolean {
    return day <= this.loginStreak();
  }

  claimReward(): void {
    this.gameService.claimLoginReward();
  }
  
  close(): void {
    this.gameService.toggleLoginRewardPanel();
  }
}