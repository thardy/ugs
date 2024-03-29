import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';
import {Quest} from '../game/quest.model';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
//export const metaReducer: MetaReducer<AppState>[] = !environment.production ? [logger] : [];

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
