import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOrderComponent } from './bank-order.component';

describe('BankOrderComponent', () => {
  let component: BankOrderComponent;
  let fixture: ComponentFixture<BankOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
