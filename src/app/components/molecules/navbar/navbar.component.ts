import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  onHamburgerClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onCloseMenu() {
    this.isMenuOpen = false;
  }

}
