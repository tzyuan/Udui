import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeOrderListComponent } from './recharge-order-list.component';

describe('RechargeOrderListComponent', () => {
  let component: RechargeOrderListComponent;
  let fixture: ComponentFixture<RechargeOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
