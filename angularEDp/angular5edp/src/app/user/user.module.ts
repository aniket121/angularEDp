import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routing} from "./user.routing";
import { UserComponent } from './user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../interceptor';
import { UserService } from './user.service';

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
      },UserService],
  declarations: [ UserComponent]
})
export class UserModule { }
