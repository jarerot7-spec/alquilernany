import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Nosotros } from './nosotros/nosotros';
import { Funciones } from './funciones/funciones';
import { ComoFunciona } from './como-funciona/como-funciona';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { Dashboard } from './dashboard/dashboard';


export const routes: Routes = [
    { path: '', component: Inicio},
    { path: 'nosotros', component: Nosotros},
    { path: 'funciones', component: Funciones},
    { path: 'como-funciona', component: ComoFunciona},
    { path: 'login', component: Login},
    { path: 'registro', component: Registro},
    { path: 'dashboard', component: Dashboard}
];
