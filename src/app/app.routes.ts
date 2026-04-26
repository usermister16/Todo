import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';

export const routes: Routes = [
    {
        path: 'login',
        // loadComponent: () => import('./pages/auth/login/login').then(m => m.Login)
        component:Login
    },
    { 
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then(m => m.Register)
    },
    {
        path: 'tasks',
        loadComponent: () => import('./pages/task/task').then(m => m.TaskComponent)
    },
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    }
];
