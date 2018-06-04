import { Routes, RouterModule } from '@angular/router';
import {DataExploreComponent} from "./data-explore.component";
import {ModuleWithProviders} from "@angular/core";

export const homeRoutes: Routes = [
    {
        path: '',
        component: DataExploreComponent,
        data: {
            pageTitle: 'Data Explore'
        }
    }
];

export const DataExploreRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

