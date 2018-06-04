import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../../interceptor';
import { DataService } from '../data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      },DataService],
  declarations: [StoreComponent]
})
export class StoreModule { }
