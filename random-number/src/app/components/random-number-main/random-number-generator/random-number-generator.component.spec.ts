import {
  ComponentFixture,
  discardPeriodicTasks,
  TestBed,
} from '@angular/core/testing';
import { RandomNumberGeneratorComponent } from './random-number-generator.component';
import { ChangeDetectorRef } from '@angular/core';
import { PlaceholderStates } from './random-number-generator.component';
import { fakeAsync, tick } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';

describe('RandomNumberGeneratorComponent', () => {
  let component: RandomNumberGeneratorComponent;
  let fixture: ComponentFixture<RandomNumberGeneratorComponent>;
  let cd: ChangeDetectorRef;

  let mockLastNumber: WritableSignal<number>;
  let mockNumberLength: WritableSignal<number>;

  beforeEach(async () => {
    const mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', [
      'detectChanges',
    ]);

    mockLastNumber = signal<number>(5);
    mockNumberLength = signal<number>(3);

    await TestBed.configureTestingModule({
      imports: [RandomNumberGeneratorComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomNumberGeneratorComponent);
    component = fixture.componentInstance;
    cd = TestBed.inject(ChangeDetectorRef);

    // Symulowanie InputSignal przez WritableSignal
    component.lastNumber = mockLastNumber as any;
    component.numberLength = mockNumberLength as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default placeholder', () => {
    expect(component.resultPlaceholder).toBe(PlaceholderStates.CORRECT_NUMBER);
  });

  it('should generate a valid number based on inputs', fakeAsync(() => {
    component.timer(mockLastNumber(), mockNumberLength());
    tick(5000);

    const generatedNumber = component.evaluatedNumber;

    expect(generatedNumber).toBeGreaterThanOrEqual(100);
    expect(generatedNumber).toBeLessThan(1000);
    expect(generatedNumber % 10).toBe(5);

    discardPeriodicTasks();
  }));

  it('should update placeholder to incorrect if evaluatedNumber is NaN', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(NaN);

    component.timer(mockLastNumber(), mockNumberLength());
    tick(5000);

    expect(component.resultPlaceholder).toBe(
      PlaceholderStates.INCORRECT_NUMBER
    );

    discardPeriodicTasks();
  }));

  it('should unsubscribe from timer on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
