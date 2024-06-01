import { Component,  EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Estudiante } from '../../Models/estudiante'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDataService } from '../../layouts/dashboard/pages/form-data.service';
import { Iusuario} from '../../Models/usuario.models';
import { Carrera } from '../../Models/carrera'; 
import { Curso } from '../../Models/curso'; 
import { DataService } from '../../shared/data-service'; 


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})

export class ReactiveFormComponent implements OnInit{
  @Output() formDataSubmitted = new EventEmitter<Estudiante>();
  carreras: Carrera[] = [];
  cursos: Curso[] = [];
  userForm: FormGroup;
  // variable para validar formulario
  mostrarExito: boolean = false; 
  
  provincias: string[] = [
   'Ciudad Autónoma de Buenos Aires',
   'Buenos Aires',
   'Catamarca',
   'Chaco',
   'Chubut',
   'Córdoba',
   'Corrientes',
   'Entre Ríos',
   'Formosa',
   'Jujuy',
   'La Pampa',
   'La Rioja',
   'Mendoza',
   'Misiones',
   'Neuquen',
   'Río Negro',
   'Salta',
   'San Juan',
   'San Luis',
   'Santa Cruz',
   'Santa Fe',
   'Santiago del Estero',
   'Tierra del Fuego',
   'Tucúman'
  ]


  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private formDataService: FormDataService,
    public dialogRef: MatDialogRef<ReactiveFormComponent>
    ){ 
    this.userForm = this.formBuilder.group({
      userCarrera: ['', Validators.required],
      userCurso: ['', Validators.required],
      userName: 
      ['', 
      [
      Validators.required,
      Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
      ]],
      userLastName: 
      [
        '',
        [
        Validators.required, 
        Validators.pattern("^[a-zA-ZÁÉÍÓÚáéíóúñÑ' -]+$"),
        ]
      ],
      userEmail: 
      [
        '', 
        [Validators.required, 
        Validators.email
        ]
      ],
    userAddress: 
      ['',Validators.required],
      userProvince: ['', Validators.required],
      userCity: ['', Validators.required],
      userPassword: ['', Validators.required],
      password2: ['', Validators.required], 
    }, { validator: this.passwordMatchValidator });
  }

  // Función de validación de password
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('userPassword')?.value;
    const confirmPassword = formGroup.get('password2')?.value;

    if (password !== confirmPassword) {
      formGroup.get('password2')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('password2')?.setErrors(null);
    }
  }

  ngOnInit(): void {
  
    this.loadCarreras();

  }

  loadCarreras() {
    this.dataService.getCarreras().subscribe(carreras => {
      this.carreras = carreras;
    });
  }

  onCarreraSelect(event: any) {
    const carreraId = event.target.value;
    if (carreraId) {
      this.dataService.getCursosPorCarrera(parseInt(carreraId)).subscribe(cursos => {
        // Verifico que los cursos se estén cargando correctamente
        //console.log('Cursos cargados correctamente:', cursos); 
        this.cursos = cursos;
      });
    }
  }
 
  /* genero el Id de usuario
  generateId(): number {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }
  */

  // evito que se repitan los datos 
  isSubmitting: boolean = false;
  onSubmit() {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      const formData = this.userForm.value as Iusuario;
  
      if (formData.userCurso) {
        const curso = this.cursos.find(curso => curso.id.toString() === formData.userCurso);
        if (curso) {
          formData.userCurso = curso.nombre;
        }
      }
  
  
      const currentDate = new Date();
      formData.createdAt = currentDate;
      formData.role = 'USER';
      formData.actions = [];
  
      //console.log('Datos desde formulario:', formData);
  
      this.dataService.createUser(formData).subscribe(
        response => {
          console.log('Usuario creado exitosamente:', response);
          this.dialogRef.close(); 
        },
        error => {
          console.error('Error al crear usuario:', error);
          this.isSubmitting = false; 
        }
      );
    }
  }
}