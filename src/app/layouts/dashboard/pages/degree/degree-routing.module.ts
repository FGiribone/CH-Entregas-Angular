import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrerasCursosComponent } from './carreras-cursos/carreras-cursos.component';

const routes: Routes = [
  { path: 'carreras', component: CarrerasCursosComponent },
  // Otras rutas aquí
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DegreeRoutingModule { }