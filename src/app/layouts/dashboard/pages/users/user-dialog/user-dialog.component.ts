import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Iusuario } from '../../../../../Models/usuario.models';
import { DataService } from '../../../../../shared/data-service';
import { Carrera } from '../../../../../Models/carrera';
import { Curso } from '../../../../../Models/curso';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['././user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  user: Iusuario;
  carreras: Carrera[] = [];
  cursos: Curso[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Iusuario },
    private dataService: DataService
  ) {
    this.user = { ...data.user };
  }

  ngOnInit(): void {
    this.loadCarreras();
  }

  loadCarreras(): void {
    this.dataService.getCarreras().subscribe(carreras => {
      this.carreras = carreras;
      const selectedCarrera = this.carreras.find(c => c.id.toString() === this.user.userCarrera);
      if (selectedCarrera) {
        this.loadCursos(selectedCarrera.id);
      }
    });
  }

  loadCursos(carreraId: number): void {
    this.dataService.getCursosPorCarrera(carreraId).subscribe(cursos => {
      this.cursos = cursos;
      const selectedCurso = this.cursos.find(curso => curso.nombre === this.user.userCurso);
      if (!selectedCurso) {
        this.user.userCurso = '';
      }
    });
  }

  onCarreraSelect(event: any): void {
    const carreraId = event.target.value;
    if (carreraId) {
      this.loadCursos(parseInt(carreraId));
      this.user.userCurso = ''; 
    }
  }

  saveChanges(): void {
    this.dialogRef.close(this.user);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
