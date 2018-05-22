import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../auth.service';
interface UserResponse {
  message: string;
  result: any;
  
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   providers: [AuthService]

})
export class LoginComponent implements OnInit {
  public loginData={username:'',password:''};
  public loginError:boolean=false;
  data={}
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
  }

  login(loginData) {
       console.log(loginData);
       this.authService.login(loginData).subscribe(
       data => {
          if(data.status=="SUCCESS"){
            console.log("Login success");
            localStorage.setItem('token','Bearer'+" "+data.result.token);
            this.router.navigate(["home"])
          }
          else{
             console.log("Login failed");
             this.loginError=true;
          }

          
         
       }
    );
  }

}
