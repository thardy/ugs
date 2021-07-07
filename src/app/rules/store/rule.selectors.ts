import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RuleState, rulesFeatureKey} from './rule.reducer';
import * as fromRules from './rule.reducer';

export const selectRuleState = createFeatureSelector<RuleState>(rulesFeatureKey);

export const selectAllRules = createSelector(
  selectRuleState,
  fromRules.selectAll
);


export const isLoading = createSelector(
  selectRuleState,
  state => state.loading
);

export const isLoaded = createSelector(
  selectRuleState,
  state => state.loaded
);

