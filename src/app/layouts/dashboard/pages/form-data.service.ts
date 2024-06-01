import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estudiante } from '../../../Models/estudiante'; // Ajusta la ruta según tu estructura
import { Iusuario} from '../../../Models/usuario.models';
@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<Iusuario | null>(null);
  formData$ = this.formDataSubject.asObservable();

  constructor() {}

  sendFormData(usuario: Iusuario): void {
    this.formDataSubject.next(usuario);
  }
}