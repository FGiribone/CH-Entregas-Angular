import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeRoutingModule } from './degree-routing.module';
import { CarrerasCursosComponent } from './carreras-cursos/carreras-cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditarCarreraCursoComponent } from './carreras-cursos/editar-carrera-cursos/editar-carrera-cursos.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    CarrerasCursosComponent,
    EditarCarreraCursoComponent
  ],
  imports: [
    CommonModule,
    DegreeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, 
    FormsModule 
  ]
})
export class DegreeModule { }