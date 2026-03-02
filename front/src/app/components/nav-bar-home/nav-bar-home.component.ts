import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-nav-bar-home',
  templateUrl: './nav-bar-home.component.html',
  styleUrls: ['./nav-bar-home.component.scss']
})
export class NavBarHomeComponent implements OnInit {

  isMobileMenuOpen = false;
  isMobile = false;

  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile();
  }

  ngOnInit() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.authService.logout(); // Clear token
    this.router.navigate(['/login']); // Redirect to login page
    console.log('Logged out successfully');
  }
}
