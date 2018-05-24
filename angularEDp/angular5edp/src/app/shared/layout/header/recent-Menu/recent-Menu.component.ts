import {Component, OnInit} from '@angular/core';
import {RecentMenuService} from "./recent-Menu.service";
import {Router, RouterLink} from '@angular/router';
@Component({
  selector: 'sa-recent-Menu',
  templateUrl: './recent-Menu.component.html',
  styleUrls:['./recent-Menu.component.css'],
  providers: [RecentMenuService]
})
export class RecentMenuComponent implements OnInit {

  public Menu1: Array<any>;
  public Menu2: Array<any>;
  public getDataStore: Array<any>;
  public getExplore: Array<any>;
  public activeMenu:any;
  constructor(private router: Router,private projectsService: RecentMenuService) {

  }

  ngOnInit() {
    this.Menu1 = this.projectsService.getMenu1()
    this.Menu2 = this.projectsService.getMenu2()
    this.getDataStore=this.projectsService.getDataStore()
    this.getExplore=this.projectsService.getExplore()
    this.activeMenu=localStorage.getItem("ActiveMenu");
  }
  

 

}
