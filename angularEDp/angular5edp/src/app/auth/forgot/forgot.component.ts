import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  providers: [AuthService],
  styleUrls:['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  public userEmail={}
  public forgotPasswordSceen:boolean=true;
  public passwordMismatch:boolean=false;
  public forgotUserEmail={}
  public restPassword={}
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
   var tokenPresentCheck=window.location.href.split("?");
   if(tokenPresentCheck.length!=1){
     this.forgotPasswordSceen=false
     console.log(tokenPresentCheck[tokenPresentCheck.length-1])
   }
  }
  submit(userEmail){
    console.log(userEmail);
       this.authService.forgotPassword(userEmail).subscribe(
       data => {
          console.log("in api")
         
       },
       error => {
         console.log("Error saving food!");
         
       
       }
    );
  }
   restUserPassword(restPasswordData){
      console.log(restPasswordData.password);
      if(restPasswordData.password==restPasswordData.confirmPassword){
       this.passwordMismatch=false;
       this.authService.resetPassword(restPasswordData.password).subscribe(
       data => {
          
          
       },
       error => {
         console.log("Error");
       
       }
     );
    }
    else{
        this.passwordMismatch=true;
    }
   
  }

}
