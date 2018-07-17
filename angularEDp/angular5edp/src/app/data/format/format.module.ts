import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatRoutingModule } from './format-routing.module';
import { FormatComponent } from './format.component';
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
    FormatRoutingModule,
    CommonModule,
    PickListModule,
    ConfirmDialogModule,
    SmartadminModule,
    SmartadminWizardsModule,
      NgxDatatableModule,
      SmartadminDatatableModule,
      AccordionModule.forRoot(),
      ModalModule.forRoot(),
      CarouselModule.forRoot(),
    FormsModule,
  ],
  exports: [],
  declarations: [FormatComponent]
})
export class FormatModule { }
