import {ActionReducer, ActionReducerMap, createReducer, MetaReducer, on, State} from '@ngrx/store';
import {RuleActions} from './rule.actions-typed';
import * as _ from 'lodash-es'
import {environment} from '../../../environments/environment';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {AppState} from '../../store/reducers';
import {compareRules, IRule, Rule} from '../rule.model';

export const rulesFeatureKey = 'rules';

export interface RuleState extends EntityState<IRule> {
  loading: boolean,
  loaded: boolean
}

export const adapter = createEntityAdapter<IRule>({
  sortComparer: compareRules,
  //selectId: rule => rule.name // this is where you would override id if it is not 'id'
});

export const initialState: RuleState = adapter.getInitialState({
  loading: false,
  loaded: false
});

export const reducer = createReducer(
  initialState,

  on(RuleActions.loadRules,
    (state, action) => {
      return {
        ...state,
        loading: true,
      }
    }),

  on(RuleActions.rulesLoaded,
    (state, action) => {
      return adapter.setAll(
        action.rules,
        {...state, loading: false, loaded: true});
    }),

  on(RuleActions.ruleCreated,
    (state, action) => {
      return adapter.addOne(action.rule, state);
    }),

  on(RuleActions.ruleUpdated,
    (state, action) => {
      return adapter.updateOne(action.update, state); // todo: figure this out
    }),

  on(RuleActions.deleteRule,
    (state, action) => {
      return adapter.removeOne(action.rule.id, state);
    }),

);

export const {
  selectAll
} = adapter.getSelectors();

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
//export const metaReducer: MetaReducer<AppState>[] = !environment.production ? [logger] : [];

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
