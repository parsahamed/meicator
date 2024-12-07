import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationodelComponent } from './medication-modal.component';

describe('MedicationodelComponent', () => {
  let component: MedicationodelComponent;
  let fixture: ComponentFixture<MedicationodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationodelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MedicationodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
