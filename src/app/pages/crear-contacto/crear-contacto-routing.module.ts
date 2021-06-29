import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearContactoPage } from './crear-contacto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearContactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearContactoPageRoutingModule {}
