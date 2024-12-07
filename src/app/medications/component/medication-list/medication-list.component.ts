import { Component, OnDestroy } from '@angular/core';
import { MedicationService } from '../../provider';
import { BehaviorSubject, combineLatest, filter, map, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { Medication } from '../../../interface';

@Component({
  selector: 'medication-list',
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.css'
})
export class MedicationListComponent implements OnDestroy {
  private searchTerm$ = new BehaviorSubject<string>('');

  medicatios$ = this.service.getMedications();

  filteredMedications$ = combineLatest([
    this.medicatios$,
    this.searchTerm$,
  ]).pipe(
    map(([medications, searchTerm]) =>
      medications.filter((medication) =>
        medication.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
  );

  private destroy$ = new Subject<void>();

  constructor(
    private service: MedicationService,
  ) {
    this.filteredMedications$.pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm$.next(inputElement.value);
  }

  add() {
    this.service.addMedication();
  }

  editMeication(medication: Medication) {
    this.service.editMedication(medication);

  }

  deleteMeication(medication: Medication) {
    this.service.deleteMedication(medication);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
