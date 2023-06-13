import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubAccountComponent } from './add-sub-account.component';

describe('AddSubAccountComponent', () => {
  let component: AddSubAccountComponent;
  let fixture: ComponentFixture<AddSubAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
