import {Component, ViewContainerRef} from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public title = 'app works!';

  public constructor(private router: Router,private viewContainerRef: ViewContainerRef) {
  var token=localStorage.getItem('token');
  console.log(token);
  if(!token)
  {
    
    this.router.navigate(["auth/login"])
  }
  }

}
