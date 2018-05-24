import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css'],
  providers: [DataService]
  
})
export class FormatComponent implements OnInit {
 

  bsModalRef: BsModalRef;
  public termsAgreed = false
  public user={firstName:'',lastName:'',clientName:'',businessUnit:'',phone:'',username:'',password:''}
  public registerError:boolean=false;
  public registerSuccess:boolean=false;
  constructor(
    private router: Router,  
    private modalService: BsModalService,private dataService: DataService) {}
 
   ngOnInit() {}

  



}
