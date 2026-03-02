import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ArticleRequestDTO } from 'src/app/shared/models/article.model';
import { ThemeResponseDTO } from 'src/app/shared/models/theme.model';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  selectedThemeId: number | null = null;
  articleTitle: string = '';
  articleContent: string = '';
  themes: ThemeResponseDTO[] = [];
  userId: number = 1; // TODO: Inject from AuthService or route params

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.themeService.getAllThemes().subscribe({
      next: (themes) => {
        this.themes = themes;
      },
      error: (err) => {
        console.error('Error loading themes:', err);
      }
    });
  }

  goBack(): void {
    window.history.back(); // Adjust route as needed
  }

  onSubmit(): void {
    if (!this.selectedThemeId || !this.articleTitle || !this.articleContent) {
      return; // Or show validation error
    }

    const dto: ArticleRequestDTO = {
      title: this.articleTitle,
      content: this.articleContent,
      themeId: this.selectedThemeId
    };

    this.articleService.createArticle(this.userId, dto).subscribe({
      next: (response) => {
        console.log('Article created:', response);
        this.router.navigate(['']); // Adjust route as needed
      },
      error: (err) => {
        console.error('Error creating article:', err);
        // TODO: Show user-friendly error message
      }
    });
  }
}
