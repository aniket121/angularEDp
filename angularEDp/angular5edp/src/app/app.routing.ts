/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {EmptyLayoutComponent} from "./shared/layout/app-layouts/empty-layout.component";
import {EdpLayoutComponent} from "./shared/layout/app-layouts/edp-layout.component";
import { AppState} from "./app.service"
import {ModuleWithProviders} from "@angular/core";

export const routes: Routes = [
    {
        path: 'home',
        component: EdpLayoutComponent,
        canActivate:[AppState],
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: 'app/home/home.module#HomeModule'
            },
        ],
    },
    {
        path: 'data-explore',
        component: EdpLayoutComponent,
        canActivate:[AppState],
        loadChildren: 'app/explore/data-explore.module#DataExploreModule',
        data: {pageTitle: 'Smartadmin'}
    },

     {path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/auth/auth.module#AuthModule'},
      {path: 'data', component: EdpLayoutComponent, loadChildren: 'app/data/data.module#DataModule'},

  {path: '', redirectTo: 'auth/login',pathMatch: 'full'}

];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
