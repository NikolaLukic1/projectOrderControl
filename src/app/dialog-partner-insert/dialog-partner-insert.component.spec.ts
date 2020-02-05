import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPartnerInsertComponent } from './dialog-partner-insert.component';

describe('DialogPartnerInsertComponent', () => {
  let component: DialogPartnerInsertComponent;
  let fixture: ComponentFixture<DialogPartnerInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPartnerInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPartnerInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
