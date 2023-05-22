import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCardOrderFormComponent } from './bank-card-order-form.component';

describe('BankCardOrderFormComponent', () => {
  let component: BankCardOrderFormComponent;
  let fixture: ComponentFixture<BankCardOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankCardOrderFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCardOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
