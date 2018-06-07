import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
import {ModalDirective} from "ngx-bootstrap";
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {fadeInTop} from "../shared/animations/router.animations";
interface UserResponse {
  message: string;
  result: any;
  
}
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css','../../smart-admin.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService]

})
export class StoreComponent implements OnInit {
  locationData:any[] = [];
  controls={filter:''}
  public information ={url:'',id:'',type:'',status:'',tags:'',driver:'',user:'',db:'',member:'',modified:'', name:'',description:'',host:'',password:'',port:'',created:'',properties:{check_query:'',callback:'',reference_url:'',token:'',token_sec:'',zookeeper:''},folder:'',bucket:'',access_key:'', schema:'',secret_key:''}
  

  constructor(private router: Router,private dataService: DataService) { }

  ngOnInit() {
  }



}
