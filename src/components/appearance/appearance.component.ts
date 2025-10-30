import { Component, ChangeDetectionStrategy, inject, computed, signal, WritableSignal, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AppearanceItem } from '../../services/models';
import { CommonModule } from '@angular/common';
import { APPEARANCE_SHOP_ITEMS, DEFAULT_APPEARANCES } from '../../data/appearances.data';

type WardrobeCategory = 'player' | 'weapon' | 'shield';

interface PendingSelections {
  player: string;
  weapon: string;
  shield: string;
}

@Component({
  selector: 'app-appearance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appearance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceComponent implements OnInit {
  private gameService = inject(GameService);
  
  appearanceItems = APPEARANCE_SHOP_ITEMS;
  currentTab = signal<'shop' | 'wardrobe'>('shop');
  
  // Wardrobe State
  wardrobeCategory = signal<WardrobeCategory>('player');
  pendingSelections: WritableSignal<PendingSelections>;

  private state = this.gameService.state;
  playerDiamonds = computed(() => this.state().player.diamonds);
  ownedIds = computed(() => this.state().player.ownedAppearanceIds);
  
  ownedItemsForCategory = computed(() => {
    const category = this.wardrobeCategory();
    const owned = this.ownedIds();
    return this.appearanceItems.filter(item => item.type === category && owned.includes(item.id));
  });

  private findItemVisuals(id: string, type: WardrobeCategory): AppearanceItem['visuals'] {
    if (id === 'default') {
      return DEFAULT_APPEARANCES[type].visuals;
    }
    return this.appearanceItems.find(item => item.id === id)?.visuals || DEFAULT_APPEARANCES[type].visuals;
  }
  
  private findItemAbbreviation(id: string, type: WardrobeCategory): string {
    if (id === 'default') {
      return DEFAULT_APPEARANCES[type].abbreviatedName;
    }
    return this.appearanceItems.find(item => item.id === id)?.abbreviatedName || DEFAULT_APPEARANCES[type].abbreviatedName;
  }
  
  selectedPlayerVisuals = computed(() => this.findItemVisuals(this.pendingSelections().player, 'player'));
  selectedPlayerAbbr = computed(() => this.findItemAbbreviation(this.pendingSelections().player, 'player'));
  
  selectedWeaponVisuals = computed(() => this.findItemVisuals(this.pendingSelections().weapon, 'weapon'));
  selectedWeaponAbbr = computed(() => this.findItemAbbreviation(this.pendingSelections().weapon, 'weapon'));
  
  selectedShieldVisuals = computed(() => this.findItemVisuals(this.pendingSelections().shield, 'shield'));
  selectedShieldAbbr = computed(() => this.findItemAbbreviation(this.pendingSelections().shield, 'shield'));

  hasChanges = computed(() => {
    const pending = this.pendingSelections();
    const player = this.state().player;
    return pending.player !== player.equippedPlayerId ||
           pending.weapon !== player.equippedWeaponId ||
           pending.shield !== player.equippedShieldId;
  });

  constructor() {
    const player = this.gameService.state().player;
    this.pendingSelections = signal({
        player: player.equippedPlayerId,
        weapon: player.equippedWeaponId,
        shield: player.equippedShieldId
    });
  }

  ngOnInit(): void {
    // Reset pending selections if the modal is reopened
    this.resetChanges();
  }

  close(): void {
    this.gameService.toggleAppearance();
  }

  buy(item: AppearanceItem): void {
    this.gameService.buyAppearance(item.id);
  }

  isOwned(item: AppearanceItem): boolean {
    return this.ownedIds().includes(item.id);
  }

  canAfford(item: AppearanceItem): boolean {
    return this.playerDiamonds() >= item.price;
  }
  
  setTab(tab: 'shop' | 'wardrobe'): void {
    this.currentTab.set(tab);
    if (tab === 'wardrobe') {
        this.resetChanges();
    }
  }

  setWardrobeCategory(category: WardrobeCategory): void {
    this.wardrobeCategory.set(category);
  }

  selectAppearance(itemId: string, type: WardrobeCategory): void {
    this.pendingSelections.update(selections => ({
        ...selections,
        [type]: itemId,
    }));
  }

  applyChanges(): void {
    this.gameService.applyAppearances(this.pendingSelections());
  }

  resetChanges(): void {
    const player = this.state().player;
    this.pendingSelections.set({
        player: player.equippedPlayerId,
        weapon: player.equippedWeaponId,
        shield: player.equippedShieldId,
    });
  }

  isSelected(itemId: string, type: WardrobeCategory): boolean {
    return this.pendingSelections()[type] === itemId;
  }
}
