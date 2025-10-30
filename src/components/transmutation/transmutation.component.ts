import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { Item, TransmutationRecipe } from '../../services/models';
import { TRANSMUTATION_RECIPES } from '../../data/transmutation.data';

@Component({
  selector: 'app-transmutation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transmutation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransmutationComponent {
  private gameService = inject(GameService);
  private messageService = inject(MessageService);

  recipes = computed(() => {
    const player = this.gameService.state().player;
    return TRANSMUTATION_RECIPES.filter(r => !r.playerClass || r.playerClass === 'All' || r.playerClass === player.playerClass);
  });
  selectedRecipe = signal<TransmutationRecipe | null>(null);
  
  // Simulation of drag-and-drop slots
  inputSlots = signal<(Item & { originalIndex: number })[]>([]);

  inventory = computed(() => this.gameService.state().player.inventory.map((item, index) => ({...item, originalIndex: index})));

  // Computed signal to generate placeholder slots for the template to loop over
  recipeSlots = computed(() => {
    const recipe = this.selectedRecipe();
    if (recipe) {
      return Array.from({ length: recipe.input.count });
    }
    return [];
  });

  canTransmute = computed(() => {
    const recipe = this.selectedRecipe();
    const items = this.inputSlots();
    if (!recipe || items.length === 0) return false;

    if (items.length !== recipe.input.count) return false;

    for (const item of items) {
        if (recipe.input.rarity && item.rarity !== recipe.input.rarity) return false;
        if (recipe.input.itemType && item.type !== recipe.input.itemType) return false;
    }
    return true;
  });

  close(): void {
    this.gameService.toggleTransmutationPanel();
  }

  selectRecipe(recipe: TransmutationRecipe): void {
    this.selectedRecipe.set(recipe);
    this.inputSlots.set([]); // Clear slots when changing recipe
  }

  addItemToSlot(item: Item & { originalIndex: number }): void {
    const recipe = this.selectedRecipe();
    if (!recipe) {
      this.messageService.showMessage('Please select a recipe first.', 'error');
      return;
    }

    if (this.inputSlots().length >= recipe.input.count) {
        this.messageService.showMessage('All input slots are full.', 'error');
        return;
    }

    // Prevent adding the same item twice
    if (this.inputSlots().some(i => i.originalIndex === item.originalIndex)) return;
    
    // Validation
    if (recipe.input.rarity && item.rarity !== recipe.input.rarity) {
        this.messageService.showMessage(`Item must be of rarity '${recipe.input.rarity}'.`, 'error');
        return;
    }
    if (recipe.input.itemType && item.type !== recipe.input.itemType) {
        this.messageService.showMessage(`Item must be of type '${recipe.input.itemType}'.`, 'error');
        return;
    }

    this.inputSlots.update(current => [...current, item]);
  }

  removeItemFromSlot(item: Item & { originalIndex: number }): void {
    this.inputSlots.update(current => current.filter(i => i.originalIndex !== item.originalIndex));
  }

  isItemInSlots(itemIndex: number): boolean {
    return this.inputSlots().some(i => i.originalIndex === itemIndex);
  }

  transmute(): void {
    const recipe = this.selectedRecipe();
    const items = this.inputSlots();
    if (!recipe || !this.canTransmute()) return;

    this.gameService.transmuteItems(recipe.id, items.map(i => i.originalIndex));
    this.inputSlots.set([]); // Clear on success
  }
}