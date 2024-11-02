import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
      ],
      imports: [AtomsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-logo component', () => {
    const logoDebugElement: DebugElement = fixture.debugElement.query(By.css('app-logo'));
    expect(logoDebugElement).toBeTruthy();
  });

  it('should render three app-link components for navigation', () => {
    const linkDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-link'));
    expect(linkDebugElements.length).toBe(3);
  });

  it('should render the app-button component for login', () => {
    const buttonDebugElement: DebugElement = fixture.debugElement.query(By.css('app-button'));
    expect(buttonDebugElement).toBeTruthy();
    expect(buttonDebugElement.nativeElement.textContent.trim()).toBe('Login');
  });

  it('should render app-hamburger-icon component', () => {
    const hamburgerDebugElement: DebugElement = fixture.debugElement.query(By.css('app-hamburger-icon'));
    expect(hamburgerDebugElement).toBeTruthy();
  });

  it('should toggle isMenuOpen when onHamburgerClick is called', () => {
    expect(component.isMenuOpen).toBe(false); // Initially false
    component.onHamburgerClick();
    expect(component.isMenuOpen).toBe(true); // Should be true after the first click
    component.onHamburgerClick();
    expect(component.isMenuOpen).toBe(false); // Should toggle back to false
  });

  it('should apply the open class to nav__links when isMenuOpen is true', () => {
    component.isMenuOpen = true;
    fixture.detectChanges();
    const linksElement: HTMLElement = fixture.debugElement.query(By.css('.nav__links')).nativeElement;
    expect(linksElement.classList.contains('nav__links--open')).toBe(true);
  });

  it('should not apply the open class to nav__links when isMenuOpen is false', () => {
    component.isMenuOpen = false;
    fixture.detectChanges();
    const linksElement: HTMLElement = fixture.debugElement.query(By.css('.nav__links')).nativeElement;
    expect(linksElement.classList.contains('nav__links--open')).toBe(false);
  });
});
