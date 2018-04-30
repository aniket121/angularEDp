import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routing} from "./auth.routing";
import { AuthComponent } from './auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../interceptor';
import { AuthService } from './auth.service';

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
      },AuthService],
  declarations: [ AuthComponent]
})
export class AuthModule { }
