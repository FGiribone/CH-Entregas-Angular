import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../../../../../shared/data-service';
import { Carrera } from '../../../../../../Models/carrera';
import { Curso } from '../../../../../../Models/curso';

@Component({
  selector: 'app-editar-carrera-cursos',
  templateUrl: './editar-carrera-cursos.component.html',
  styleUrls: ['./editar-carrera-cursos.component.scss']
})
export class EditarCarreraCursoComponent implements OnInit {
  item!: Carrera | Curso;
  isCarrera!: boolean;
  capacidad?: number;
  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<EditarCarreraCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Carrera | Curso, isCarrera: boolean }
  ) { }

  ngOnInit(): void {
    this.item = this.data.item;
    this.isCarrera = this.data.isCarrera;
    if (!this.isCarrera) {
      this.capacidad = (this.item as Curso).capacidad;
    }
  }

  saveChanges(): void {
    if (this.isCarrera) {
      this.dataService.updateCarrera(this.item as Carrera).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      if (!this.isCarrera && this.capacidad !== undefined) { 
        (this.item as Curso).capacidad = this.capacidad; 
      }
      this.dataService.updateCurso(this.item as Curso).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
