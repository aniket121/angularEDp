
import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';


export const routes:Routes = [
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'directory',
    loadChildren: './directory/directory.module#DirectoryModule'
  }
];

export const routing = RouterModule.forChild(routes);
