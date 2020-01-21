import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPartnerComponent } from './dialog-partner.component';

describe('DialogPartnerComponent', () => {
  let component: DialogPartnerComponent;
  let fixture: ComponentFixture<DialogPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
