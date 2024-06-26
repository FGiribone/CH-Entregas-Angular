import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from './auth.reducer';


export const authState = createFeatureSelector<AuthState>(authFeatureName);

export const authUser = createSelector(authState, (state) => state.authUser);

export const isLoggedIn = createSelector(
  authState,
  (state) => state.isLoggedIn
);