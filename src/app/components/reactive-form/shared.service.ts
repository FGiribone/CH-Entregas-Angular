import { Injectable } from '@angular/core';
import { Estudiante } from '../../Models/estudiante'



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private estudiante: Estudiante | null = null;

  constructor() { }

  setEstudiante(estudiante: Estudiante): void {
    this.estudiante = estudiante;
  }

  getEstudiante(): Estudiante | null {
    return this.estudiante;
  }
}