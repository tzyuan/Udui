import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCardOrderListComponent } from './bank-card-order-list.component';

describe('BankCardOrderListComponent', () => {
  let component: BankCardOrderListComponent;
  let fixture: ComponentFixture<BankCardOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankCardOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCardOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
