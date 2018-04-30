import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router} from "@angular/router";


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent implements OnInit {
 

  bsModalRef: BsModalRef;
  public termsAgreed = false
  public user={}
  constructor(
    private router: Router,  
    private modalService: BsModalService) {}
 
   ngOnInit() {}

  register(userObject){
    console.log(userObject)
  }



}
