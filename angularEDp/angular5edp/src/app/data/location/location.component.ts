import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';

@Component({
  selector: 'app-loction',
  templateUrl: './location.component.html',
  providers: [DataService],
  styleUrls:['./location.component.css']
})
export class LocationComponent implements OnInit {
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
  constructor(private router: Router,private dataService: DataService) { }

  ngOnInit() {
 
  }
  
   

}
