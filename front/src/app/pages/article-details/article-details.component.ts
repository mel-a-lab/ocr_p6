
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { ArticleResponseDTO } from 'src/app/shared/models/article.model';
import { CommentResponseDTO, CommentRequestDTO } from 'src/app/shared/models/comment.model';



interface ExtendedCommentResponseDTO extends CommentResponseDTO {
  timeAgo: string;
  reactions: number;
  replies: number;
}
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleDetailsComponent implements OnInit {

  article: ArticleResponseDTO | null = null;
  comments: ExtendedCommentResponseDTO[] = [];
  loading = true;
  error: string | null = null;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(+id);
    } else {
      this.error = 'Article ID not found';
      this.loading = false;
    }
  }

  private loadArticle(id: number) {
    this.loading = true;
    this.articleService.getArticleById(id).subscribe({
      next: (data) => {
        this.article = data;
        this.loadComments(id);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error loading article:', err);
        this.error = 'Failed to load article';
        this.loading = false;
      }
    });
  }

  private loadComments(articleId: number) {
    this.commentService.getCommentsByArticle(articleId).subscribe({
      next: (commentsData: CommentResponseDTO[]) => {
        this.comments = commentsData.map(comment => ({
          ...comment,
          timeAgo: this.computeTimeAgo(comment.createdAt),
          reactions: 0, // Default; update if backend includes reactions
          replies: 0 // Default; update if backend includes replies
        }));
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error loading comments:', err);
        this.error = 'Failed to load comments';
        this.loading = false;
      }
    });
  }

  private computeTimeAgo(createdAt: string): string {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    if (diffInYears > 0) {
      return `${diffInYears} years ago`;
    }
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44));
    if (diffInMonths > 0) {
      return `${diffInMonths} months ago`;
    }
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    }
    return 'Today';
  }

  goBack() {
    window.history.back();
  }

  addComment() {
    if (this.newComment.trim() && this.article) {
      // For testing, hardcode userId=1; replace with real decode once implemented
      const userId = 1; // TODO: Use authService.getCurrentUserId() after adding the method
      const commentRequest: CommentRequestDTO = {
        content: this.newComment,
        articleId: this.article.id
      };
      this.commentService.addComment(userId, commentRequest).subscribe({
        next: (newComment: CommentResponseDTO) => {
          this.comments.unshift({
            ...newComment,
            timeAgo: 'Just now',
            reactions: 0,
            replies: 0
          });
          this.newComment = '';
          this.error = null;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error adding comment:', err);
          this.error = 'Failed to add comment';
        }
      });
    }
  }

}
