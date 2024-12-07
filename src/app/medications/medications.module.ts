import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicationService } from './provider';
import { MedicationodelComponent, MedicationListComponent } from './component';
import { MedicationRouteModule } from './medications.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { DataStoreModule } from '../data-store/data-store.module';



@NgModule({
  declarations: [
    MedicationodelComponent,
    MedicationListComponent,
  ],
  imports: [
    CommonModule,
    MedicationRouteModule,
    ReactiveFormsModule,
    DataStoreModule,
  ],
  providers: [
    MedicationService
  ]
})
export class MedicationsModule { }
