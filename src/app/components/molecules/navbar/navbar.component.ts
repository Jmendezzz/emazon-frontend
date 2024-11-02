import { Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor() { }
  onHamburgerClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onCloseMenu() {
    this.isMenuOpen = false;
  }

}
