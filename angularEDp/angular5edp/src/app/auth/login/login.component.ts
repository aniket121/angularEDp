import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   providers: [AuthService]

})
export class LoginComponent implements OnInit {
  public loginData={};
  public loginError:boolean=false
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
  }

  login(loginData){
       console.log(loginData);
       this.authService.login(loginData).subscribe(
       data => {
          console.log("in api",data)
          this.router.navigate(["home"])
         
       },
       error => {
         console.log("Error");
         this.loginError=true;
         
       
       }
    );
  }

}
