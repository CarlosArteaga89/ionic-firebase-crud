import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contactos',
    pathMatch: 'full'
  },
  {
    path: 'contactos',
    loadChildren: () => import('./pages/contactos/contactos.module').then( m => m.ContactosPageModule)
  },
  {
    path: 'crear-contacto',
    loadChildren: () => import('./pages/crear-contacto/crear-contacto.module').then( m => m.CrearContactoPageModule)
  },
  {
    path: 'editar-contacto',
    loadChildren: () => import('./pages/editar-contacto/editar-contacto.module').then( m => m.EditarContactoPageModule)
  },
  {
    path: 'editar-contacto/:key',
    loadChildren: () => import('./pages/editar-contacto/editar-contacto.module').then( m => m.EditarContactoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
