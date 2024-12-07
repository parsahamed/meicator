import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MedicationService } from '../../provider';
import { Medication } from '../../../interface';
import { Day, DosageUnit } from '../../../enum';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'medication-modal',
  templateUrl: './medication-modal.component.html',
  styleUrls: ['./medication-modal.component.css']
})
export class MedicationodelComponent implements OnInit, OnDestroy {
  medicationForm!: FormGroup;
  medicationId: string | undefined = undefined;

  units = Object.keys(DosageUnit);
  allDays = Object.keys(Day);

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private medicationService: MedicationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.medicationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dosage: [0, [Validators.required, Validators.min(0.1)]],
      unit: ['', Validators.required],
      days: this.formBuilder.array<string>([]),
      times: this.formBuilder.array<FormControl<string | null>>([]),
    });

    this.route.params.pipe(
      tap((params) => {
        this.medicationId = params['id'] || null;
        if (this.medicationId) {
          this.loadMedicationDetails(this.medicationId);
        }
      }),
      take(1),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  private loadMedicationDetails(id: string): void {
    this.medicationService.getMedicationById(id).pipe(
      tap((medication?: Medication) => {
        if (medication) {
          this.medicationForm.patchValue({
            name: medication.name,
            dosage: medication.dosage,
            unit: medication.unit,
          });

          this.days.clear();
          medication.days?.forEach((day) => this.days.push(this.formBuilder.control(day)));

          this.times.clear();
          medication.times?.forEach((time) => this.times.push(this.formBuilder.control(time)));
        }
      }),
      take(1),
      takeUntil(this.destroy$),

    ).subscribe();
  }

  get name() {
    return this.medicationForm.get('name');
  }

  get dosage() {
    return this.medicationForm.get('dosage');
  }

  get unit() {
    return this.medicationForm.get('unit');
  }

  get days(): FormArray {
    return this.medicationForm.get('days') as FormArray;
  }

  get times(): FormArray<FormControl<string | null>> {
    return this.medicationForm.get('times') as FormArray<FormControl<string | null>>;
  }

  daySelected(day: string): boolean {
    return this.days?.value.includes(day);
  }

  toggleDay(day: string): void {
    if (this.daySelected(day)) {
      this.days?.removeAt(this.days.value.indexOf(day));
    } else {
      this.days?.push(this.formBuilder.control(day));
    }
  }

  addTime(time: string): void {
    if (time && !this.times?.value.includes(time)) {
      this.times?.push(this.formBuilder.control(time));
    }
  }

  removeTime(index: number): void {
    this.times.removeAt(index);
  }

  close() {
    this.medicationService.closeMedicationDialog()
  }

  toInterface(): Medication {
    return {
      id: this.medicationId,
      name: this.name?.value,
      dosage: this.dosage?.value,
      unit: this.unit?.value,
      days: this.days?.value,
      times: this.times?.value.filter(value => value !== null) as string[],
    }
  }

  ok() {
    if (this.medicationForm.valid) {
      this.medicationService.saveMedication(this.toInterface()).pipe(
        take(1),
        takeUntil(this.destroy$),
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
