import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {HomeComponent} from "./home.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../interceptor';
import { HomeService } from './home.service';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    homeRouting,
    SmartadminModule
  ],
  providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      },HomeService],
  declarations: [HomeComponent]
})
export class HomeModule { }
