import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  input,
  OnDestroy,
} from '@angular/core';
import { merge, Subject, takeUntil, tap, timer } from 'rxjs';

export enum PlaceholderStates {
  CORRECT_NUMBER = 'Your number is',
  INCORRECT_NUMBER = 'Not a number',
}

@Component({
  selector: 'app-random-number-generator',
  standalone: true,
  imports: [],
  templateUrl: './random-number-generator.component.html',
  styleUrl: './random-number-generator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomNumberGeneratorComponent implements OnDestroy {
  lastNumber = input.required<number>();
  numberLength = input.required<number>();

  public resultPlaceholder: PlaceholderStates =
    PlaceholderStates.CORRECT_NUMBER;
  public evaluatedNumber: number;
  private destroy$: Subject<void> = new Subject<void>();
  private invalidNumberDestoyer$: Subject<void> = new Subject<void>();

  constructor(private cd: ChangeDetectorRef) {
    effect(() => this.timer(this.lastNumber(), this.numberLength()));
  }

  public timer(lastNumber: number, numberLength: number) {
    const minValue = Math.pow(10, numberLength - 1); // Lowest posible number
    const maxValue = Math.pow(10, numberLength) - 1; // Highest posible number

    timer(0, 5000)
      .pipe(
        //Leakage memory prevention
        takeUntil(merge(this.destroy$, this.invalidNumberDestoyer$)),
        tap(() => {
          this.evaluatedNumber = Math.floor(
            minValue + Math.random() * (maxValue - minValue)
          );

          //Adding last number
          this.evaluatedNumber =
            Math.floor(this.evaluatedNumber / 10) * 10 + lastNumber;

          if (isNaN(this.evaluatedNumber)) {
            this.resultPlaceholder = PlaceholderStates.INCORRECT_NUMBER;
            this.onInvalidNumberDestroy();
          } else this.resultPlaceholder = PlaceholderStates.CORRECT_NUMBER;

          this.cd.detectChanges();
        })
      )
      .subscribe();
  }

  private onInvalidNumberDestroy(): void {
    this.invalidNumberDestoyer$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
