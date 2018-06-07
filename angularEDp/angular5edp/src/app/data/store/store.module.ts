import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../../interceptor';
import { DataService } from '../data.service';
import {SmartadminDatatableModule} from "../../shared/ui/datatable/smartadmin-datatable.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {SmartadminModule} from "../../shared/smartadmin.module";
import {AccordionModule, CarouselModule,ModalModule} from "ngx-bootstrap";
import {SmartadminWizardsModule} from "../../shared/forms/wizards/smartadmin-wizards.module";

@NgModule({
  imports: [  
    CommonModule,
    StoreRoutingModule,
    HttpClientModule,
    FormsModule,
    SmartadminDatatableModule,
    NgxDatatableModule,
    SmartadminModule,
    AccordionModule,
    CarouselModule,
    ModalModule,
    SmartadminWizardsModule

  ],
  providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      },DataService],
  declarations: [StoreComponent]
})
export class StoreModule { }
