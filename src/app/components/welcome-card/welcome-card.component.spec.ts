import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WelcomeCardComponent } from './welcome-card.component';

describe('WelcomeCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeCardComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(WelcomeCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default userName as "User"', () => {
    const fixture = TestBed.createComponent(WelcomeCardComponent);
    const component = fixture.componentInstance;
    expect(component.userName).toBe('User');
  });

  it('should have default welcome message', () => {
    const fixture = TestBed.createComponent(WelcomeCardComponent);
    const component = fixture.componentInstance;
    expect(component.message).toBe('Welcome to the Simple Dashboard!');
  });

  it('should display custom userName when provided', async () => {
    const fixture = TestBed.createComponent(WelcomeCardComponent);
    const component = fixture.componentInstance;
    component.userName = 'John';
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.greeting-text')?.textContent).toContain('John');
  });

  it('should display custom message when provided', async () => {
    const fixture = TestBed.createComponent(WelcomeCardComponent);
    const component = fixture.componentInstance;
    component.message = 'Custom welcome message';
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.welcome-message')?.textContent).toBe('Custom welcome message');
  });

  it('should return "Good Morning" greeting before noon', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1, 9, 0, 0)); // 9:00 AM

    const fixture = TestBed.createComponent(WelcomeCardComponent);
    const component = fixture.componentInstance;

    expect(component.greeting).toBe('Good Morning');

    vi.useRealTimers();
  });

  it('should return "Good Afternoon" greeting between noon and 6 PM', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1, 14, 0, 0)); // 2:00 PM

    const fixture = TestBed.createComponent(WelcomeCardComponent);
    const component = fixture.componentInstance;

    expect(component.greeting).toBe('Good Afternoon');

    vi.useRealTimers();
  });

  it('should return "Good Evening" greeting after 6 PM', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1, 20, 0, 0)); // 8:00 PM

    const fixture = TestBed.createComponent(WelcomeCardComponent);
    const component = fixture.componentInstance;

    expect(component.greeting).toBe('Good Evening');

    vi.useRealTimers();
  });

  it('should render the welcome card with greeting icon', async () => {
    const fixture = TestBed.createComponent(WelcomeCardComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.greeting-icon')).toBeTruthy();
  });

  it('should have proper card structure', async () => {
    const fixture = TestBed.createComponent(WelcomeCardComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.welcome-card')).toBeTruthy();
    expect(compiled.querySelector('.welcome-card-header')).toBeTruthy();
    expect(compiled.querySelector('.greeting-text')).toBeTruthy();
    expect(compiled.querySelector('.welcome-message')).toBeTruthy();
  });
});
