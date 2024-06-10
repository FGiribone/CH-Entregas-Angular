import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../../shared/data-service';
import { Carrera } from '../../../../../Models/carrera';
import { Curso } from '../../../../../Models/curso';
import { Iusuario } from '../../../../../Models/usuario.models';
import { AuthState } from '../../../../../store/auth/auth.reducer';
import { EditarCarreraCursoComponent } from './editar-carrera-cursos/editar-carrera-cursos.component';

@Component({
  selector: 'app-carreras-cursos',
  templateUrl: './carreras-cursos.component.html',
  styleUrls: ['./carreras-cursos.component.scss']
})
export class CarrerasCursosComponent implements OnInit {
  carreras: Carrera[] = [];
  cursos: { [key: number]: Curso[] } = {}; 
  usuarios: Iusuario[] = [];
  currentUser$: Observable<Iusuario | null>;

  constructor(
    private dataService: DataService,
    private store: Store<{ auth: AuthState }>,
    private dialog: MatDialog
  ) {
    this.currentUser$ = this.store.select(state => state.auth.authUser);
  }

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
    this.currentUser$.pipe(take(1)).subscribe(currentUser => {
      if (currentUser?.role !== 'ADMIN') {
        alert('No tienes permiso para eliminar cursos.');
        return;
      }
      const studentCount = this.countStudentsInCourse(curso.nombre);
      if (studentCount > 0) {
        alert(`No se puede eliminar el curso ${curso.nombre} porque tiene ${studentCount} alumno(s) inscrito(s).`);
      } else {
        this.dataService.deleteCurso(curso.id).subscribe(() => {
          this.cursos[carreraId] = this.cursos[carreraId].filter(c => c.id !== curso.id);
        });
      }
    });
  }

  editCarreraName(carrera: Carrera): void {
    this.currentUser$.pipe(take(1)).subscribe(currentUser => {
      if (currentUser?.role !== 'ADMIN') {
        alert('No tienes permiso para editar carreras.');
        return;
      }
      const dialogRef = this.dialog.open(EditarCarreraCursoComponent, {
        data: { item: carrera, isCarrera: true }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getCarreras();
        }
      });
    });
  }
  editCurso(curso: Curso): void {
    this.currentUser$.pipe(take(1)).subscribe(currentUser => {
      if (currentUser?.role !== 'ADMIN') {
        alert('No tienes permiso para editar cursos.');
        return;
      }
      const dialogRef = this.dialog.open(EditarCarreraCursoComponent, {
        data: { item: curso, isCarrera: false }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getCarreras();
        }
      });
    });
  }
}
