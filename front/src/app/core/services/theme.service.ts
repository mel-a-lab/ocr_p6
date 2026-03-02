import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ThemeResponseDTO, ThemeRequestDTO } from '../../shared/models/theme.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly apiUrl = `${environment.apiUrl}/themes`;

  constructor(private http: HttpClient) { }

  getAllThemes(): Observable<ThemeResponseDTO[]> {
    return this.http.get<ThemeResponseDTO[]>(this.apiUrl);
  }

  getThemeById(id: number): Observable<ThemeResponseDTO> {
    return this.http.get<ThemeResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createTheme(dto: ThemeRequestDTO): Observable<ThemeResponseDTO> {
    return this.http.post<ThemeResponseDTO>(this.apiUrl, dto);
  }

  updateTheme(id: number, dto: ThemeRequestDTO): Observable<ThemeResponseDTO> {
    return this.http.put<ThemeResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  deleteTheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleSubscription(themeId: number): Observable<ThemeResponseDTO> {
    console.log('Calling toggleSubscription for ID:', themeId);  // DEBUG
    return this.http.post<ThemeResponseDTO>(`${this.apiUrl}/${themeId}/toggle-subscription`, {}).pipe(
      tap((response) => console.log('Toggle response:', response)),  // DEBUG
      catchError((error: HttpErrorResponse) => {  // FIXED: Type error properly
        console.error('Toggle error:', error);  // DEBUG
        if (error.status === 401) {
          // Redirect to login if unauth
          window.location.href = '/login';
        }
        return throwError(() => error);
      })
    );
  }
}
