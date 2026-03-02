import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequestDTO } from '../../shared/models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: LoginRequestDTO = {
    usernameOrEmail: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token); // ✅ save JWT
        this.router.navigate(['']);       // ✅ redirect after login
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
