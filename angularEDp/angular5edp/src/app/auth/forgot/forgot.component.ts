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
  public forgotUserEmail={}
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
  }

  submit(forgotUserEmail){
    console.log(forgotUserEmail);
       this.authService.login(forgotUserEmail).subscribe(
       data => {
          console.log("in api")
         
       },
       error => {
         console.log("Error saving food!");
         
       
       }
    );
  }
}
