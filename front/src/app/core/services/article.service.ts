// services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleRequestDTO, ArticleResponseDTO } from 'src/app/shared/models/article.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createArticle(userId: number, dto: ArticleRequestDTO): Observable<ArticleResponseDTO> {
    return this.http.post<ArticleResponseDTO>(`${this.baseUrl}/articles/user/${userId}`, dto);
  }

  updateArticle(articleId: number, userId: number, dto: ArticleRequestDTO): Observable<ArticleResponseDTO> {
    return this.http.put<ArticleResponseDTO>(`${this.baseUrl}/articles/${articleId}/user/${userId}`, dto);
  }

  deleteArticle(articleId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/articles/${articleId}/user/${userId}`);
  }

  getArticleById(id: number): Observable<ArticleResponseDTO> {
    return this.http.get<ArticleResponseDTO>(`${this.baseUrl}/articles/${id}`);
  }

  getAllArticlesSorted(sortOrder: string = 'newest'): Observable<ArticleResponseDTO[]> {
    return this.http.get<ArticleResponseDTO[]>(`${this.baseUrl}/articles?sortOrder=${sortOrder}`);
  }
}
