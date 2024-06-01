import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../shared/data-service';
import { Carrera } from '../../../../../Models/carrera';
import { Curso } from '../../../../../Models/curso';
import { Iusuario } from '../../../../../Models/usuario.models';

@Component({
  selector: 'app-carreras-cursos',
  templateUrl: './carreras-cursos.component.html',
  styleUrls: ['./carreras-cursos.component.scss']
})
export class CarrerasCursosComponent implements OnInit {
  carreras: Carrera[] = [];
  cursos: { [key: number]: Curso[] } = {}; // cursos por carrera
  usuarios: Iusuario[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCarreras();
    this.getUsuarios();
  }

  getCarreras(): void {
    this.dataService.getCarreras().subscribe(carreras => {
      this.carreras = carreras;
      this.carreras.forEach(carrera => {
        this.getCursosPorCarrera(carrera.id);
      });
    });
  }

  getCursosPorCarrera(carreraId: number): void {
    this.dataService.getCursosPorCarrera(carreraId).subscribe(cursos => {
      this.cursos[carreraId] = cursos;
    });
  }

  getUsuarios(): void {
    this.dataService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  countStudentsInCourse(cursoNombre: string): number {
    return this.usuarios.filter(usuario => usuario.userCurso === cursoNombre).length;
  }

  deleteCurso(curso: Curso, carreraId: number): void {
    const studentCount = this.countStudentsInCourse(curso.nombre);
    if (studentCount > 0) {
      alert(`No se puede eliminar el curso ${curso.nombre} porque tiene ${studentCount} alumno(s) inscrito(s).`);
    } else {
      this.dataService.deleteCurso(curso.id).subscribe(() => {
        this.cursos[carreraId] = this.cursos[carreraId].filter(c => c.id !== curso.id);
      });
    }
  }
}
