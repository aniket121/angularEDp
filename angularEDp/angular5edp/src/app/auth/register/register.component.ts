import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
  
})
export class RegisterComponent implements OnInit {
 

  bsModalRef: BsModalRef;
  public termsAgreed = false
  public user={firstName:'',lastName:'',clientName:'',businessUnit:'',phone:'',username:'',password:''}
  public registerError:boolean=false;
  public registerSuccess:boolean=false;
  constructor(
    private router: Router,  
    private modalService: BsModalService,private authService: AuthService) {}
 
   ngOnInit() {}

  register(registerObject){
       console.log(registerObject);
       this.authService.registerUser(registerObject).subscribe(
       data => {
          console.log("in api")
          this.registerSuccess=true;
         
       },
       error => {
         console.log("Error");
         this.registerError=true;
         
       
       }
    );
    
  }
   openModal(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.bsModalRef = this.modalService.show(template);
  }
  onTermsAgree(){
    this.termsAgreed = true
    this.bsModalRef.hide()
  }

  onTermsClose(){
    this.bsModalRef.hide()
  }




}
