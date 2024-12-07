import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Medication } from '../../interface';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly storageKey = 'medications';
  private medications$: BehaviorSubject<Medication[]>;

  constructor(private storageService: StorageService) {
    const initialData = this.storageService.getItem<Medication[]>(this.storageKey) || [];
    this.medications$ = new BehaviorSubject<Medication[]>(initialData);
  }

  getMedications(): Observable<Medication[]> {
    return this.medications$.asObservable();
  }

  addMedication(medication: Medication): Observable<boolean> {
    const currentMedications = this.medications$.getValue();
    const updatedMedications = [...currentMedications, { ...medication, id: this.generateId(), lastUpdated: new Date() }];
    this.updateMedications(updatedMedications);
    return of(true);
  }

  updateMedication(id: string, updatedData: Partial<Medication>): Observable<boolean> {
    const currentMedications = this.medications$.getValue();
    const updatedMedications = currentMedications.map((medication) =>
      medication.id === id ? { ...medication, ...updatedData, lastUpdated: new Date() } : medication
    );
    this.updateMedications(updatedMedications);
    return of(true);
  }

  deleteMedication(id: string): void {
    const currentMedications = this.medications$.getValue();
    const updatedMedications = currentMedications.filter((medication) => medication.id !== id);
    this.updateMedications(updatedMedications);
  }

  getMedicationById(id: string): Observable<Medication | undefined> {
    return this.medications$.pipe(map((medications) => medications.find((medication) => medication.id === id)));
  }

  private updateMedications(medications: Medication[]): void {
    this.medications$.next(medications);
    this.storageService.setItem(this.storageKey, medications);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
