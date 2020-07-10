import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { ProductosComponent } from './productos/productos.component';
import { ProcesoEncuestaComponent } from './proceso-encuesta/proceso-encuesta.component';
import { LogsComponent } from './logs/logs.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent, canActivate: [ LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema' }},
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}},
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Consultar empresas'}},
            { path: 'productos/:empresa/:empresaId/:instituto', component: ProductosComponent, data: {titulo: 'Consultar productos'}},
            { path: 'proceso-encuesta/:idprod/:fecha/:empresa/:empresaId/:tipo', component: ProcesoEncuestaComponent, data: {titulo: 'Proceso de encuesta'}},
            { path: 'consultar-log', component: LogsComponent, data: {titulo: 'Log del Sistema'}}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );