import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html',
  styleUrls:['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {

  }


activeTab(activeMenuName){
console.log(activeMenuName)
localStorage.setItem('ActiveMenu', activeMenuName);
if(activeMenuName=='META'){
   this.router.navigate(["data/location"])
}
if(activeMenuName=='DATA'){
   this.router.navigate(["home"])
}

}
}