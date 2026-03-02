import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from 'src/app/core/services/theme.service';
import { UserService } from 'src/app/core/services/user.service';
import { ThemeResponseDTO } from 'src/app/shared/models/theme.model';
import { UserRequestDTO, UserResponseDTO } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: UserResponseDTO | null = null;
  subscribedThemes: ThemeResponseDTO[] = [];
  loadingUser = true;
  loadingSubscriptions = true;
  errorUser: string | null = null;
  errorSubscriptions: string | null = null;

  currentUserId = 1; // Replace with actual user ID

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.loadingUser = true;
    this.errorUser = null;

    this.userService.getUserById(this.currentUserId).subscribe({
      next: (user: UserResponseDTO) => {
        console.log('Loaded user:', user); // DEBUG
        this.user = user;
        this.profileForm.patchValue({
          username: user.username,
          email: user.email,
          password: ''
        });
        this.loadingUser = false;
        this.loadSubscriptions();
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Load user error:', err);
        this.errorUser = 'Failed to load user profile. Please try again.';
        this.loadingUser = false;
        this.loadingSubscriptions = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadSubscriptions(): void {
    if (!this.user) {
      console.warn('No user loaded, skipping subscriptions'); // DEBUG
      this.loadingSubscriptions = false;
      return;
    }

    console.log('User subscriptions:', this.user.subscriptions); // DEBUG

    this.loadingSubscriptions = true;
    this.errorSubscriptions = null;

    this.themeService.getAllThemes().subscribe({
      next: (themes: ThemeResponseDTO[]) => {
        console.log('All themes loaded:', themes); // DEBUG
        console.log('Theme names:', themes.map(t => t.name)); // DEBUG: Log all names for comparison
        const subscribedNames = this.user?.subscriptions || [];
        console.log('Subscribed names (strings):', subscribedNames); // DEBUG
        const filteredThemes = themes
          .filter(t => subscribedNames.includes(t.name)); // Match by name
        console.log('Filtered subscribed themes:', filteredThemes); // DEBUG
        this.subscribedThemes = filteredThemes
          .map(t => ({ ...t, subscribed: true }));
        console.log('Final subscribedThemes:', this.subscribedThemes); // DEBUG
        this.loadingSubscriptions = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Load subscriptions error:', err);
        this.errorSubscriptions = 'Failed to load subscriptions. Please try again.';
        this.loadingSubscriptions = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formValue = this.profileForm.value as UserRequestDTO;
    const oldUsername = this.user?.username;
    const oldEmail = this.user?.email;

    if (this.user) {
      const updatedUser = { ...this.user, username: formValue.username, email: formValue.email };
      this.user = updatedUser;
      this.profileForm.patchValue({ username: updatedUser.username, email: updatedUser.email });
      this.cdr.detectChanges();
    }

    this.userService.updateUser(this.currentUserId, formValue).subscribe({
      next: (updatedUser: UserResponseDTO) => {
        this.user = updatedUser;
        this.profileForm.patchValue({ username: updatedUser.username, email: updatedUser.email });
        this.cdr.detectChanges();
        console.log('Profile updated successfully');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Update error:', err);
        if (this.user && oldUsername && oldEmail) {
          this.user = { ...this.user, username: oldUsername, email: oldEmail };
          this.profileForm.patchValue({ username: oldUsername, email: oldEmail });
          this.cdr.detectChanges();
        }
        this.errorUser = 'Failed to update profile. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  requestAccess(): void {
    console.log('Request access clicked');
    // Implement request access logic (e.g., open modal or API call)
  }

  onSubscriptionToggled(themeId: number): void {
    const index = this.subscribedThemes.findIndex(t => t.id === themeId);
    if (index === -1) return;

    const oldTheme = { ...this.subscribedThemes[index] };
    const oldSubscriptions = [...(this.user?.subscriptions || [])];
    const themeName = oldTheme.name; // Use name for removal

    // Optimistic: Remove from list
    this.subscribedThemes = this.subscribedThemes.filter(t => t.id !== themeId);
    if (this.user) {
      this.user.subscriptions = oldSubscriptions.filter(id => id !== themeName);
    }
    this.cdr.detectChanges();

    this.themeService.toggleSubscription(themeId).subscribe({
      next: (updatedTheme: ThemeResponseDTO) => {
        console.log('Unsubscribed successfully');
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Toggle error:', err);
        // Revert
        this.subscribedThemes.push(oldTheme);
        if (this.user) {
          this.user.subscriptions = oldSubscriptions;
        }
        this.cdr.detectChanges();
      }
    });
  }

  trackById(index: number, item: ThemeResponseDTO): number {
    return item.id;
  }

}
