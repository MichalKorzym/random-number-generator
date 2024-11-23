import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomNumberMainComponent } from './random-number-main.component';

describe('RandomNumberMainComponent', () => {
  let component: RandomNumberMainComponent;
  let fixture: ComponentFixture<RandomNumberMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomNumberMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomNumberMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
