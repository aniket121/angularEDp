
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";


export const routes:Routes = [
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  }
];

export const routing = RouterModule.forChild(routes);
