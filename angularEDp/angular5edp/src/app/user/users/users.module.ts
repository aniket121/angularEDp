import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
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
    UsersRoutingModule,
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
  declarations: [UsersComponent]
})
export class UsersModule { }
