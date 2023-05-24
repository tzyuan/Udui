import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOrderBatchBankCardComponent } from './bank-order-batch-bank-card.component';

describe('BankOrderBatchBankCardComponent', () => {
  let component: BankOrderBatchBankCardComponent;
  let fixture: ComponentFixture<BankOrderBatchBankCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankOrderBatchBankCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankOrderBatchBankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
