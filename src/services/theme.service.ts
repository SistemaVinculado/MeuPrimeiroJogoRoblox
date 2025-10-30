import { Injectable, inject, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GameService } from './game.service';
import { WORLDS } from '../data/maps.data';
import { ThemeColors } from './models';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private gameService = inject(GameService);
  private document = inject(DOCUMENT);
  private currentThemeId: string | null = null;

  public init(): void {
    effect(() => {
      const progress = this.gameService.state().playerProgress;
      const currentWorldId = progress.currentWorldId;
      const defaultThemeId = 'verdant-labyrinth';

      // Check if theme for the current world is unlocked
      if (currentWorldId && progress.unlockedThemeIds.includes(currentWorldId)) {
        if (currentWorldId !== this.currentThemeId) {
          this.applyTheme(currentWorldId);
          this.currentThemeId = currentWorldId;
        }
      } else {
        // If theme is not unlocked, apply the default theme
        if (this.currentThemeId !== defaultThemeId) {
          this.applyTheme(defaultThemeId);
          this.currentThemeId = defaultThemeId;
        }
      }
    });
  }

  private applyTheme(worldId: string): void {
    const world = WORLDS.find(w => w.id === worldId);
    if (!world) {
      console.warn(`Theme not found for worldId: ${worldId}. Using default.`);
      // Optionally, reset to default theme here
      return;
    }
    
    const theme = world.theme;
    // FIX: Cast `this.document` to `Document` to resolve the type error.
    const root = (this.document as Document).documentElement;

    const themeMap: { [key: string]: string } = {
        '--color-primary': theme.primary,
        '--color-primary-light': theme.primaryLight,
        '--color-primary-dark': theme.primaryDark,
        '--color-primary-darker': theme.primaryDarker,
        '--color-secondary': theme.secondary,
        '--color-secondary-light': theme.secondaryLight,
        '--color-secondary-dark': theme.secondaryDark,
        '--color-secondary-darker': theme.secondaryDarker,
        '--color-success': theme.success,
        '--color-success-light': theme.successLight,
        '--color-success-dark': theme.successDark,
        '--color-success-darker': theme.successDarker,
        '--color-danger': theme.danger,
        '--color-danger-light': theme.dangerLight,
        '--color-danger-dark': theme.dangerDark,
        '--color-danger-darker': theme.dangerDarker,
        '--color-info': theme.info,
        '--color-info-light': theme.infoLight,
        '--color-info-dark': theme.infoDark,
        '--color-info-darker': theme.infoDarker,
        '--color-background': theme.background,
        '--color-panel': theme.panel,
        '--color-text': theme.text,
        '--color-text-on-primary': theme.textOnPrimary,
        '--color-text-on-secondary': theme.textOnSecondary,
        '--color-text-on-success': theme.textOnSuccess,
        '--color-text-on-danger': theme.textOnDanger,
        '--color-text-on-info': theme.textOnInfo,
    };
    
    for (const [property, value] of Object.entries(themeMap)) {
      root.style.setProperty(property, value);
    }
  }
}
