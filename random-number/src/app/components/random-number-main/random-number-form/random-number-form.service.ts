import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable()
export class RandomNumberFormService {
  private readonly fb: FormBuilder = inject(FormBuilder);

  public buildRandomNumberForm() {
    const { required } = Validators;

    return this.fb.group({
      lastNumber: new FormControl<number | null>(null, required),
      numberLength: new FormControl<number | null>(null, required),
    });
  }
}

export type RandomNumberForm = ReturnType<
  RandomNumberFormService['buildRandomNumberForm']
>;
