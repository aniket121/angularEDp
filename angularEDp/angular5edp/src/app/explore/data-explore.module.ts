import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataExploreRouting } from './data-explore.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {DataExploreComponent} from "./data-explore.component";
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
@NgModule({
  imports: [
    CommonModule,
    DataExploreRouting,
      SmartadminModule,
      SmartadminDatatableModule
  ],
  declarations: [DataExploreComponent]
})
export class DataExploreModule { }
