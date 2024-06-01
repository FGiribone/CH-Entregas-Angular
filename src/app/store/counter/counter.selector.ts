import { createFeatureSelector, createSelector } from '@ngrx/store';
import { counterFeatureName, CounterState } from './counter.reducer';

export const counterState =
  createFeatureSelector<CounterState>(counterFeatureName);

export const counterValue = createSelector(
  counterState,
  (state) => state.value
);
