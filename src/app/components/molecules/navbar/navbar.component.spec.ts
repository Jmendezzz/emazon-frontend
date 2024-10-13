import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isMenuOpen initialized to false', () => {
    expect(component.isMenuOpen).toBe(false);
  });

  it('should toggle isMenuOpen when onHamburgerClick is called', () => {
    component.onHamburgerClick();
    expect(component.isMenuOpen).toBe(true);
    component.onHamburgerClick();
    expect(component.isMenuOpen).toBe(false);
  });

  it('should set isMenuOpen to false when onCloseMenu is called', () => {
    component.isMenuOpen = true;
    component.onCloseMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  it('should not change isMenuOpen when onCloseMenu is called while it is already false', () => {
    component.isMenuOpen = false;
    component.onCloseMenu();
    expect(component.isMenuOpen).toBe(false);
  });
});
