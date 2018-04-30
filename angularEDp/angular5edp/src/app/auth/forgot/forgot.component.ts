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
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
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
}
