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
  public inValidUser:boolean=false;
  public ValidUser:boolean=false;
  public resetSuccess:boolean=false;
  public resetFail:boolean=false;
  public forgotUserEmail={}
  public restPassword={}
  public passwordResetToken:any=''
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
   var tokenPresentCheck=window.location.href.split("/");
   if(tokenPresentCheck.length!=6){
     this.forgotPasswordSceen=false
     console.log(tokenPresentCheck[tokenPresentCheck.length-1])
     this.passwordResetToken=tokenPresentCheck[tokenPresentCheck.length-1]
   }
  }
  submit(userEmail){
    console.log(userEmail);
       this.authService.forgotPassword(userEmail).subscribe(
       data => {
          console.log("in api")
          if(data.message=="FAIL"){
            this.inValidUser=true;
          }
          else{
            this.ValidUser=true;
            this.inValidUser=false;
          }
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
       this.authService.resetPassword({"password":restPasswordData.password,"passwordResetToken":this.passwordResetToken}).subscribe(
       data => {
          if(data.message=="FAIL"){
            this.resetFail=true;
          }
          else{
            this.resetSuccess=true;
            this.resetFail=false;
          }
          
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
