import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeOrderDetailComponent } from './recharge-order-detail.component';

describe('RechargeOrderDetailComponent', () => {
  let component: RechargeOrderDetailComponent;
  let fixture: ComponentFixture<RechargeOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
