import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOrderEditComponent } from './bank-order-edit.component';

describe('BankOrderEditComponent', () => {
  let component: BankOrderEditComponent;
  let fixture: ComponentFixture<BankOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankOrderEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
