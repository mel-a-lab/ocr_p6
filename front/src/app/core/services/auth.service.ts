import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginRequestDTO, AuthResponseDTO } from '../../shared/models/auth.model';
import { UserRequestDTO } from '../../shared/models/user.model';

// import environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequestDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: AuthResponseDTO) => {
        if (response.token) {  // Assume AuthResponseDTO has 'token'
          this.saveToken(response.token);
        }
      })
    );
  }

  register(user: UserRequestDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/register`, user).pipe(
      tap((response: AuthResponseDTO) => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Add to auth.service.ts after the existing methods

  getCurrentUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      // Decode JWT payload (assume standard JWT with 'sub' as userId)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return parseInt(payload.sub, 10) || null; // Adjust 'sub' to your JWT claim (e.g., 'userId')
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }
}
