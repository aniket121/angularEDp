import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routing} from "./data.routing";
import { DataComponent } from './data.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../interceptor';
import { DataService } from './data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    routing,
  ],
  providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      },DataService],
  declarations: [ DataComponent]
})
export class DataModule { }
