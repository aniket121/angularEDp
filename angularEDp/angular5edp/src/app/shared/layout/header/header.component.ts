import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public activeMenu:any;
  constructor(private router: Router) {
  }

  ngOnInit() {
  this.activeMenu=localStorage.getItem("ActiveMenu");
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(["/auth/login"])
    
  }
}
