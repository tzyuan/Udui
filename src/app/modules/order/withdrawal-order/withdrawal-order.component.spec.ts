import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalOrderComponent } from './withdrawal-order.component';

describe('WithdrawalOrderComponent', () => {
  let component: WithdrawalOrderComponent;
  let fixture: ComponentFixture<WithdrawalOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
