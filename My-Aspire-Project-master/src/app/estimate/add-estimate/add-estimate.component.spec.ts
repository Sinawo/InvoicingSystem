import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEstimateComponent } from './add-estimate.component';

describe('AddEstimateComponent', () => {
  let component: AddEstimateComponent;
  let fixture: ComponentFixture<AddEstimateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEstimateComponent]
    });
    fixture = TestBed.createComponent(AddEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
