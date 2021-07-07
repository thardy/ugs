import {createReducer, MetaReducer, on, State} from '@ngrx/store';
export const formsFeatureKey = 'forms';

export interface IFormState {

}

export const initialState: IFormState = {

};

export const reducer = createReducer(
  initialState

);
