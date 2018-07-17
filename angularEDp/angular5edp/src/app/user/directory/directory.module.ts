import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryRoutingModule } from './directory-routing.module';
import { FormsModule } from '@angular/forms';
import {SmartadminDatatableModule} from '../../shared/ui/datatable/smartadmin-datatable.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SmartadminModule} from '../../shared/smartadmin.module';
import {AccordionModule, CarouselModule, ModalModule} from 'ngx-bootstrap';
import {SmartadminWizardsModule} from '../../shared/forms/wizards/smartadmin-wizards.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {PickListModule} from 'primeng/picklist';
import { DirectoryComponent } from './directory.component';
import { TagsInputModule } from 'ngx-tags-input/dist';
@NgModule({
  imports: [
    CommonModule,
    DirectoryRoutingModule,
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
    TagsInputModule.forRoot()
  ],
  exports: [],
  declarations: [DirectoryComponent]
})

export class DirectoryModule { }



