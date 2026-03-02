import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ThemeRequestDTO } from 'src/app/shared/models/theme.model';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.scss']
})
export class CreateThemeComponent implements OnInit {

  themeName: string = '';
  themeDescription: string = '';

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // No data to load
  }

  goBack(): void {
    this.router.navigate(['/themes']); // Adjust route as needed
  }

  onSubmit(): void {
    if (!this.themeName || !this.themeDescription) {
      return; // Or show validation error
    }

    const dto: ThemeRequestDTO = {
      name: this.themeName,
      description: this.themeDescription
    };

    this.themeService.createTheme(dto).subscribe({
      next: (response) => {
        console.log('Theme created:', response);
        this.router.navigate(['/themes']); // Adjust route as needed
      },
      error: (err) => {
        console.error('Error creating theme:', err);
        // TODO: Show user-friendly error message
      }
    });
  }
}
