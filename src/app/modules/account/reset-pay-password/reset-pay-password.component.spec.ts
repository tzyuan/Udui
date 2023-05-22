import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPayPasswordComponent } from './reset-pay-password.component';

describe('ResetPayPasswordComponent', () => {
  let component: ResetPayPasswordComponent;
  let fixture: ComponentFixture<ResetPayPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPayPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPayPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
