
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";


export const routes:Routes = [
  {
    path: 'location',
    loadChildren: './location/location.module#LocationModule'
  },
  {
    path: 'store',
    loadChildren: './store/store.module#StoreModule'
  },
  {
    path: 'format',
    loadChildren: './format/format.module#FormatModule'
  },
  {
    path: 'explore',
    loadChildren: './explore/explore.module#ExploreModule'
  }
  
];

export const routing = RouterModule.forChild(routes);
