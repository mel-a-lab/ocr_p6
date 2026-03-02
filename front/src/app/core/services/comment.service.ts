import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentResponseDTO, CommentRequestDTO } from 'src/app/shared/models/comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  getCommentsByArticle(articleId: number): Observable<CommentResponseDTO[]> {
    return this.http.get<CommentResponseDTO[]>(`${this.apiUrl}/article/${articleId}`);
  }

  addComment(userId: number, dto: CommentRequestDTO): Observable<CommentResponseDTO> {
    return this.http.post<CommentResponseDTO>(`${this.apiUrl}/user/${userId}`, dto);
  }

  deleteComment(commentId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}/user/${userId}`);
  }

}
