import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadEditDialogComponent } from './lead-edit-dialog.component';

describe('LeadEditDialogComponent', () => {
  let component: LeadEditDialogComponent;
  let fixture: ComponentFixture<LeadEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadEditDialogComponent]
    });
    fixture = TestBed.createComponent(LeadEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
