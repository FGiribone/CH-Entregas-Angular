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

const MOCK_AUTH_USER_ADMIN: Iusuario = {
  id: 900,
  createdAt: new Date(),
  userName: "ADMIN 1",
  userLastName: "ADMIN 1",
  userEmail: 'admin@mail.com',
  userCity: 'cualquiera',
  userProvince: 'cualquiera',
  userAddress: 'cualquiera',
  userCarrera: 'Cualquiera',
  userCurso: 'todos',
  inputZip: '1111',
  userPassword: '123456',
  role: 'ADMIN',
  actions: []
};

const MOCK_AUTH_USER_NORMAL: Iusuario = {
  id: 901,
  createdAt: new Date(),
  userName: "USER 1",
  userLastName: "USER 1",
  userEmail: 'user@mail.com',
  userCity: 'cualquiera',
  userProvince: 'cualquiera',
  userAddress: 'cualquiera',
  userCurso: 'cualquiera',
  userCarrera: 'cualquiera',
  inputZip: '2222',
  userPassword: '123456',
  role: 'USER',
  actions: []
};

export const authFeatureName = 'auth';

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state, action) => {
    if (
      (action.payload.email === 'admin@mail.com' && action.payload.password === '123456') ||
      (action.payload.email === 'user@mail.com' && action.payload.password === '123456')
    ) {
      localStorage.setItem('accessToken', 'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds');
      return {
        ...state,
        authUser: action.payload.email === 'admin@mail.com' ? MOCK_AUTH_USER_ADMIN : MOCK_AUTH_USER_NORMAL,
        isLoggedIn: true,
      };
    } else {
      alert('Correo o password incorrectos');
      return state;
    }
  }),

  on(authActions.logout, () => {
    localStorage.removeItem('accessToken');
    return initialState;
  })
);