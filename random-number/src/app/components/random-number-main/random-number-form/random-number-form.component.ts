import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  RandomNumberForm,
  RandomNumberFormService,
} from './random-number-form.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RandomNumberGeneratorComponent } from '../random-number-generator/random-number-generator.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-random-number-form',
  standalone: true,
  imports: [
    RandomNumberGeneratorComponent,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './random-number-form.component.html',
  providers: [RandomNumberFormService],
  styleUrl: './random-number-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomNumberFormComponent {
  private readonly randomNumberFormService: RandomNumberFormService = inject(
    RandomNumberFormService
  );
  protected readonly possibleNumbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  protected lastNumberValue: number | null;
  protected numberLengthValue: number | null;
  public readonly randomNumberForm: RandomNumberForm =
    this.randomNumberFormService.buildRandomNumberForm();
  public isValidSubmittedForm = signal<boolean>(false);
  public submitted = false;

  public onSubmit(): void {
    this.randomNumberForm.markAsDirty();
    this.randomNumberForm.markAllAsTouched();

    this.submitted = true;

    if (this.randomNumberForm.invalid) return;

    this.lastNumberValue = this.randomNumberForm.controls.lastNumber.value;
    this.numberLengthValue = this.randomNumberForm.controls.numberLength.value;
    this.isValidSubmittedForm.set(true);

    this.randomNumberForm.controls.lastNumber.disable();
    this.randomNumberForm.controls.numberLength.disable();
  }

  public onStop(): void {
    this.isValidSubmittedForm.set(false);

    this.randomNumberForm.controls.lastNumber.enable();
    this.randomNumberForm.controls.numberLength.enable();
  }
}
