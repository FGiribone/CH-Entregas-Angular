import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrera } from '../Models/carrera';
import { Curso } from '../Models/curso';
import { Iusuario } from '../Models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }
  getCarreras(): Observable<Carrera[]> {
    const url = `${this.baseUrl}/degrees`;
    return this.http.get<Carrera[]>(url).pipe(
      catchError(this.handleError<Carrera[]>('getCarreras', []))
    );
  }

  getCursosPorCarrera(carreraId: number): Observable<Curso[]> {
    const url = `${this.baseUrl}/courses?carrera_id=${carreraId}`;
    return this.http.get<Curso[]>(url).pipe(
      catchError(this.handleError<Curso[]>('getCursosPorCarrera', []))
    );
  }

  getAlumnosPorCurso(cursoNombre: string): Observable<Iusuario[]> {
    const url = `${this.baseUrl}/users?userCurso=${cursoNombre}`;
    return this.http.get<Iusuario[]>(url).pipe(
      catchError(this.handleError<Iusuario[]>('getAlumnosPorCurso', []))
    );
  }

  createUser(user: Iusuario): Observable<any> {
    const url = `${this.baseUrl}/users`;
    return this.http.post<any>(url, user).pipe(
      catchError(this.handleError<any>('createUser'))
    );
  }

  getUsers(): Observable<Iusuario[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<Iusuario[]>(url).pipe(
      catchError(this.handleError<Iusuario[]>('getUsers', []))
    );
  }

  deleteCurso(cursoId: number): Observable<any> {
    const url = `${this.baseUrl}/courses/${cursoId}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('deleteCurso'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}