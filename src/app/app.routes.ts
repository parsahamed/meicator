import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'medications',
    loadChildren: () => import('./medications/medications.module').then(m => m.MedicationsModule),
  },
  { path: '', redirectTo: 'medications', pathMatch: 'full' },
];
