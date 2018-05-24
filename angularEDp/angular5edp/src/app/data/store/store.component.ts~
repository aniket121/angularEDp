import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
interface UserResponse {
  message: string;
  result: any;
  
}
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
   providers: [DataService]

})
export class StoreComponent implements OnInit {
  public loginData={username:'',password:''};
  public loginError:boolean=false;
  data={}
  constructor(private router: Router,private dataService: DataService) { }

  ngOnInit() {
  }

  

}
