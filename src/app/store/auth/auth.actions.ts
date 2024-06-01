import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginData } from '../../../app/layouts/auth/Models';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ payload: LoginData }>(),
    logout: emptyProps(),
  },
});
