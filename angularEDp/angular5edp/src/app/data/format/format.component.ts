import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {NotificationService} from '../../shared/utils/notification.service';

declare var $: any;
@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css','../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService, ConfirmationService]
  
})
export class FormatComponent implements OnInit {
 
  rows: any[] = [];
  formatData: any[] = [];
  controls = {filter: ''}
  
  bsModalRef: BsModalRef;
  public termsAgreed = false
  
  constructor(
    private router: Router,  
    private modalService: BsModalService,private dataService: DataService) {}
    
    

   ngOnInit() {

    this.getDataFormats()
   }

   getDataFormats() {
    this.dataService.getDataFormat().subscribe(
    data => {
       this.formatData = data;
       this.rows=data;
       console.log(this.formatData);

    }
 );
}



}
