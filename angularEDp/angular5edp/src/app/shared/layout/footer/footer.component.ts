import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html',
  styleUrls:['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public activeMenu:any;
  constructor(private router: Router) {}

  ngOnInit() {

  }


activeTab(activeMenuName){
this.ngOnInit();
console.log(activeMenuName)
localStorage.setItem('ActiveMenu', activeMenuName);
this.activeMenu=activeMenuName;

if(activeMenuName=='META'){
   this.activeMenu=activeMenuName;
   this.router.navigate(["data/location"])
}
if(activeMenuName=='DATA'){
   this.activeMenu=activeMenuName;
   this.router.navigate(["home"])
}

}
}