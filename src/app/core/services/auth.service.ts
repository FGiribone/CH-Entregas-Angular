
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iusuario } from '../../Models/usuario.models';
import { LoginData } from '../../layouts/auth/Models/index';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private MOCK_AUTH_USER: Iusuario = {
    id: 900,
    createdAt: new Date(),
    userName: "ADMIN 1",
    userLastName: "ADMIN 1",
    userEmail: 'admin1@admin1.com',
    userCity: 'cualquiera',
    userProvince: 'cualquiera',
    userAddress: 'cualquiera',
    userCurso: 'todos',
    userCarrera: 'todas',
    inputZip: '1111',
    userPassword: 'admin1',
    role: 'ADMIN',
    actions: []
  };

  private _authUser$ = new BehaviorSubject<Iusuario | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: LoginData): void {
    if (data.email === 'user@mail.com' && data.password === '123456') {
      this._authUser$.next(this.MOCK_AUTH_USER);
      localStorage.setItem('accessToken', 'valid-token');
      this.router.navigate(['home']);
    } else {
      alert('Correo o password incorrectos');
    }
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    console.log('Token retrieved:', token);
    return !!token;
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth']);
  }
}