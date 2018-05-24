import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatRoutingModule } from './format-routing.module';
import { FormatComponent } from './format.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormatRoutingModule,

    FormsModule,
  ],
  exports: [],
  declarations: [FormatComponent]
})
export class FormatModule { }
