import {Injectable} from '@angular/core';

@Injectable()
export class RecentMenuService {
  Menu1:any;
  setting:any;
  dataStore:any;
  explore:any;

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
   
   this.setting = [
      {
        "href": "/",
        "title": "CONFIGURATION"
      },
      {
        "href": "/#/user/users",
        "title": "USER"
      },
      {
        "href": "/#/user/directory",
        'title': 'DIRECTORY'
      }
    ],
    this.dataStore = [
      {
        'href': '/#/data/store',
        'title': 'DATA STORE'
      },
      {
        'href': '/',
        'title': 'JOIN'
      },
      {
        'href': '/',
        'title': 'UNION'
      }
    ],
     this.explore = [
      {
        'href': '/#/data/explore',
        'title': 'DATA'
      },
      {
        'href': '/',
        'title': 'QUERY'
      }
    ]
  }

  getMenu1() {
    return this.Menu1
  }
  getSetting() {
    return this.setting
  }
  getDataStore() {
    return this.dataStore
  }
  getExplore() {
    return this.explore
  }


  

}
