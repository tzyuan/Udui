import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleQrcodeComponent } from './google-qrcode.component';

describe('GoogleQrcodeComponent', () => {
  let component: GoogleQrcodeComponent;
  let fixture: ComponentFixture<GoogleQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleQrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
