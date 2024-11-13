import { AuthService } from '@/features/authentication/services/auth.service';
import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private readonly authService: AuthService) { }
  onHamburgerClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onCloseMenu() {
    this.isMenuOpen = false;
  }

  isAuthenticated(): boolean {
    return this.authService.userDetails() != null;
  }
}
