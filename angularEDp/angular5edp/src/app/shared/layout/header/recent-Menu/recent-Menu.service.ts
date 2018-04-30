import {Injectable} from '@angular/core';

@Injectable()
export class RecentMenuService {
  Menu1:any;
  Menu2:any;

  constructor() {
    this.Menu1 = [
      {
        "href": "#/data-explore",
        "title": "Data Explore"
      },
      {
        "href": "/",
        "title": "subMenu2"
      },
      {
        "href": "/",
        "title": "subMenu3"
      }
    ],
   
   this.Menu2 = [
      {
        "href": "/",
        "title": "subMenu1"
      },
      {
        "href": "/",
        "title": "subMenu2"
      },
      {
        "href": "/",
        "title": "subMenu3"
      }
    ]
  }

  getMenu1() {
    return this.Menu1
  }
  getMenu2() {
    return this.Menu2
  }

  

}
