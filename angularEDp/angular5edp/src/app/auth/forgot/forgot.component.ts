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
  public userEmail={username:''}
  public forgotPasswordSceen:boolean=true;
  public passwordMismatch:boolean=false;
  public inValidUser:boolean=false;
  public ValidUser:boolean=false;
  public resetSuccess:boolean=false;
  public resetFail:boolean=false;
  public handleResponse:boolean=false;
  public forgotUserEmail={}
  public restPassword={password:'',confirmPassword:''}
  public passwordResetToken:any=''
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
   var tokenPresentCheck=window.location.href.split("/");
   console.log(tokenPresentCheck)
   if(window.location.href.indexOf("token") > -1){
     this.forgotPasswordSceen=false
     console.log(tokenPresentCheck[tokenPresentCheck.length-1])
     this.passwordResetToken=tokenPresentCheck[tokenPresentCheck.length-1]
   }
  }
  submit(userEmail){
    console.log(userEmail);
       this.handleResponse=true
       this.authService.forgotPassword(userEmail).subscribe(
       data => {
          console.log("in api")
          if(data.message=="FAIL"){
            this.inValidUser=true;
            this.handleResponse=false;
          }
          else{
            this.ValidUser=true;
            this.inValidUser=false;
            this.handleResponse=false;
          }
       },
       error => {
         console.log("Error saving food!");
         this.handleResponse=false;
         
       
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
            this.passwordMismatch=false;
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
  navigateToLogin(){
    this.router.navigate(["auth/login"])
  }

}
