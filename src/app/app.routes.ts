import { Routes } from '@angular/router';
import { HomeInventory } from './components/home-inventory/home-inventory';
import { Role } from './components/role/role';

export const routes: Routes = [
    {
        
        path:'',
        component:Role,
    },
    {
        path:'home',
        component: HomeInventory
    }
];
