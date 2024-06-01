import { createReducer, on } from '@ngrx/store';
import { Iusuario } from '../../../app/Models/usuario.models';
import { authActions } from './auth.actions';

export interface AuthState {
  authUser: null | Iusuario;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  authUser: null,
  isLoggedIn: false,
};

const MOCK_AUTH_USER: Iusuario = {
    id: 900,
    createdAt: new Date(),
    userName: "ADMIN 1",
    userLastName: "ADMIN 1",
    userEmail: 'admin1@admin1.com',
    userCity: 'cualquiera',
    userProvince: 'cualquiera',
    userAddress: 'cualquiera',
    userCurso: 'todos',
    inputZip: '1111',
    userPassword: 'admin1',
    role: 'ADMIN',
    actions: []
};

export const authFeatureName = 'auth';

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state, action) => {
    if (
      action.payload.email !== 'user@mail.com' ||
      action.payload.password !== '123456'
    ) {
      alert('Correo o password incorrectos');
      return state;
    } else {
      localStorage.setItem(
        'accessToken',
        'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds'
      );
      return {
        ...state,
        authUser: MOCK_AUTH_USER,
        isLoggedIn: true,
      };
    }
  }),

  on(authActions.logout, () => {
    localStorage.removeItem('accessToken');
    return initialState;
  })
);