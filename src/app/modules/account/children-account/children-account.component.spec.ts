import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenAccountComponent } from './children-account.component';

describe('ChildrenAccountComponent', () => {
  let component: ChildrenAccountComponent;
  let fixture: ComponentFixture<ChildrenAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
