import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MedicationodelComponent, MedicationListComponent } from './component';


const routes: Routes = [
  {
    path: '',
    component: MedicationListComponent,
    children: [
      {
        path: "add",
        component: MedicationodelComponent
      },
      {
        path: 'edit/:id',
        component: MedicationodelComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicationRouteModule { }
