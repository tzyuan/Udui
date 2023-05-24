import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOrderBatchComponent } from './bank-order-batch.component';

describe('BankOrderBatchComponent', () => {
  let component: BankOrderBatchComponent;
  let fixture: ComponentFixture<BankOrderBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankOrderBatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankOrderBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
