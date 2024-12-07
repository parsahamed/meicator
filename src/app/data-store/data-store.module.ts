import { NgModule } from '@angular/core';

import { DataService, StorageService } from './provider';

@NgModule({
  providers: [
    DataService,
    StorageService,
  ]
})
export class DataStoreModule { }
