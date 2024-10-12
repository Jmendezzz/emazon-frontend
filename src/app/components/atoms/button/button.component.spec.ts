import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size "md"', () => {
    expect(component.size).toBe('md');
  });

  it('should have default variant "primary"', () => {
    expect(component.variant).toBe('primary');
  });

  it('should set the correct size input', () => {
    component.size = 'lg';
    fixture.detectChanges();
    expect(component.size).toBe('lg');
  });

  it('should set the correct variant input', () => {
    component.variant = 'outline';
    fixture.detectChanges();
    expect(component.variant).toBe('outline');
  });

  it('should disable the button if [disabled]="true"', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
  });

  it('should not disable the button if [disabled]="false"', () => {
    component.disabled = false;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeFalsy();
  });

  it('should render the button with correct class for size and variant', () => {
    component.size = 'lg';
    component.variant = 'outline';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('lg');
    expect(buttonElement.nativeElement.classList).toContain('outline');
  });
});
