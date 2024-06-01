import { createReducer, on } from '@ngrx/store';
import { sumar, restar } from './counter.actions';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterFeatureName = 'counter';

export const counterReducer = createReducer(
  initialState,
  on(sumar, (state) => {
    return {
      value: state.value + 1,
    };
  }),
  on(restar, (state) => {
    return {
      value: state.value - 1,
    };
  })
);
