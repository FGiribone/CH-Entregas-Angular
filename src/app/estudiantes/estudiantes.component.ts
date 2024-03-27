import { Component } from '@angular/core';

interface Estudiante {
  nombre: string;
  estado: string;
}

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent {
  estudiantes: Estudiante[] = [
    { nombre: 'Juan', estado: 'aprobado' },
    { nombre: 'Ana', estado: 'desaprobado' },
    { nombre: 'Florencia', estado: 'desaprobado' },
    { nombre: 'Roberto', estado: 'aprobado' },
    { nombre: 'María', estado: 'desaprobado' },
  ];

  getColor(estado: string): string {
    return estado === 'aprobado' ? 'green' : 'red';
  }
}
