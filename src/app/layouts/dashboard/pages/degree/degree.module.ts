import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeRoutingModule } from './degree-routing.module';
import { CarrerasCursosComponent } from './carreras-cursos/carreras-cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CarrerasCursosComponent
  ],
  imports: [
    CommonModule,
    DegreeRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DegreeModule { }