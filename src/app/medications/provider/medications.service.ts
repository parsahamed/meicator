import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Medication } from '../../interface';
import { DataService } from '../../data-store/provider';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }


  addMedication() {
    this.router.navigateByUrl('/medications/add')
  }

  editMedication(medication: Medication) {
    this.router.navigateByUrl(`/medications/edit/${medication.id}`)
  }

  deleteMedication(medication: Medication) {
    medication?.id && this.dataService.deleteMedication(medication.id);
  }

  closeMedicationDialog() {
    this.router.navigateByUrl('/medications');
  }

  saveMedication(medication: Medication) {
    console.log({ medication })
    if (medication.id) {
      return this.dataService.updateMedication(medication.id, medication).pipe(
        tap(() => this.router.navigateByUrl('/medications'))
      );
    }

    return this.dataService.addMedication(medication).pipe(
      tap(() => this.router.navigateByUrl('/medications')),
    );
  }

  getMedications() {
    return this.dataService.getMedications();
  }

  getMedicationById(id: string) {
    return this.dataService.getMedicationById(id);
  }
}
