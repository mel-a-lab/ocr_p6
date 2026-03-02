import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';
import { ArticleResponseDTO } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit , OnChanges {
  @Input() sort: string = 'newest';
  articles: ArticleResponseDTO[] = [];

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit() {
    this.loadArticles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sort'] && !changes['firstChange']) {
      this.loadArticles();
    }
  }

  private loadArticles() {
    this.articleService.getAllArticlesSorted(this.sort).subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (err) => {
        console.error('Error loading articles:', err);
      }
    });
  }

  onArticleClick(article: ArticleResponseDTO) {
    this.router.navigate(['/article', article.id]);
  }
}
