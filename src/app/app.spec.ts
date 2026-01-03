import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render Hello World title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main h1')?.textContent).toContain('Hello World!');
  });

  it('should have the correct title property', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Simple Dashboard');
  });

  it('should return currentDate in correct format', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const currentDate = app.currentDate;
    expect(currentDate).toMatch(/^Today is \w+ \d{1,2}, \d{4}$/);
  });

  it('should display the current date in the template', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const dateElement = compiled.querySelector('.current-date');
    expect(dateElement).toBeTruthy();
    expect(dateElement?.textContent).toMatch(/^Today is \w+ \d{1,2}, \d{4}$/);
  });
});
