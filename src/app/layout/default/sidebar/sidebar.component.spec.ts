import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDefaultSidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: LayoutDefaultSidebarComponent;
  let fixture: ComponentFixture<LayoutDefaultSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutDefaultSidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDefaultSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
