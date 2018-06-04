import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { FormsModule } from '@angular/forms';
import {SmartadminDatatableModule} from "../../shared/ui/datatable/smartadmin-datatable.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {SmartadminModule} from "../../shared/smartadmin.module";
import {AccordionModule, CarouselModule,ModalModule} from "ngx-bootstrap";
import {SmartadminWizardsModule} from "../../shared/forms/wizards/smartadmin-wizards.module";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {PickListModule} from 'primeng/picklist';
@NgModule({
  imports: [
    CommonModule,
    LocationRoutingModule,
    FormsModule,
    PickListModule,
    ConfirmDialogModule,
    SmartadminModule,
    SmartadminWizardsModule,
      NgxDatatableModule,
      SmartadminDatatableModule,
      AccordionModule.forRoot(),
      ModalModule.forRoot(),
      CarouselModule.forRoot(),

  ],
  declarations: [LocationComponent]
})
export class LocationModule { }
