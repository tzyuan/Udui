import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTypeSettingComponent } from './fund-type-setting.component';

describe('FundTypeSettingComponent', () => {
  let component: FundTypeSettingComponent;
  let fixture: ComponentFixture<FundTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundTypeSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
