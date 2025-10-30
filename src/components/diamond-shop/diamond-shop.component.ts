import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

interface DiamondPack {
  amount: number;
  price: string;
}

@Component({
  selector: 'app-diamond-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diamond-shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiamondShopComponent {
  private gameService = inject(GameService);

  packs: DiamondPack[] = [
    { amount: 50, price: '$4.99' },
    { amount: 120, price: '$9.99' },
    { amount: 250, price: '$19.99' },
    { amount: 700, price: '$49.99' },
  ];

  close(): void {
    this.gameService.toggleDiamondShop();
  }

  purchase(amount: number): void {
    this.gameService.purchaseDiamonds(amount);
  }
}