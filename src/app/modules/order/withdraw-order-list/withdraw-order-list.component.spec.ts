import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawOrderListComponent } from './withdraw-order-list.component';

describe('WithdrawOrderListComponent', () => {
  let component: WithdrawOrderListComponent;
  let fixture: ComponentFixture<WithdrawOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
