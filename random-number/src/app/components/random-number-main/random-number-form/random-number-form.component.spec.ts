import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RandomNumberFormComponent } from './random-number-form.component';

describe('RandomNumberFormComponent', () => {
  let component: RandomNumberFormComponent;
  let fixture: ComponentFixture<RandomNumberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RandomNumberFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.randomNumberForm.controls.lastNumber.value).toBeNull();
    expect(component.randomNumberForm.controls.numberLength.value).toBeNull();
  });

  it('should mark form as invalid if required fields are empty', () => {
    component.randomNumberForm.controls.lastNumber.setValue(null);
    component.randomNumberForm.controls.numberLength.setValue(null);

    expect(component.randomNumberForm.invalid).toBeTrue();
  });

  it('should validate the numberLength field', () => {
    component.randomNumberForm.controls.numberLength.setValue(null);
    expect(component.randomNumberForm.controls.numberLength.invalid).toBeTrue();

    component.randomNumberForm.controls.numberLength.setValue(5);
    expect(component.randomNumberForm.controls.numberLength.valid).toBeTrue();
  });

  it('should set submitted to true on submit', () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });

  it('should disable the Submit button if the form is invalid', () => {
    component.isValidSubmittedForm.set(true);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(
      'button[type="submit"]'
    );
    expect(button.disabled).toBeTrue();
  });
});
