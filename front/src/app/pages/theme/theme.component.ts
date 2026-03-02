import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ThemeResponseDTO } from 'src/app/shared/models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  themes: ThemeResponseDTO[] = [];
  loading = true;
  error: string | null = null;

  sortOptions = ['newst','oldest'];
  selectedSort = 'newst';
  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.loading = true;
    this.error = null;

    this.themeService.getAllThemes().subscribe({
      next: (themes: ThemeResponseDTO[]) => {
        this.themes = [...themes];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Load error:', err);
        this.error = 'Failed to load themes. Please try again.';
        this.loading = false;
      }
    });
  }

  onSubscriptionToggled(themeId: number): void {
    const index = this.themes.findIndex(t => t.id === themeId);
    if (index === -1) return;

    const oldState = this.themes[index].subscribed;

    // ✅ Optimistic UI update (immediate text + color change)
    const updatedThemes = [...this.themes];
    updatedThemes[index] = { ...updatedThemes[index], subscribed: !oldState };
    this.themes = updatedThemes;
    this.cdr.detectChanges();

    // ✅ API call
    this.themeService.toggleSubscription(themeId).subscribe({
      next: (updatedTheme: ThemeResponseDTO) => {
        this.themes = this.themes.map(t =>
          t.id === themeId ? { ...t, ...updatedTheme } : t
        );
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Toggle error:', err);
        // ❌ revert change if failed
        const revertedThemes = [...this.themes];
        revertedThemes[index] = { ...revertedThemes[index], subscribed: oldState };
        this.themes = revertedThemes;
        this.cdr.detectChanges();
      }
    });
  }


  trackById(index: number, item: ThemeResponseDTO): number {
    return item.id;
  }
}
