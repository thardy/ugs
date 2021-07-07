import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {IAppAction} from '../app-action.model';
import {IRule} from '../rule.model';

export const loadRules = createAction('[Rules Resolver] Load Rules');
export const rulesLoaded = createAction('[loadRules Effect] Rules Loaded', props<{rules: IRule[]}>());
export const newRuleSaved = createAction('[Edit Rule] New Rule Saved', props<{rule: IRule}>());
export const ruleCreated = createAction('[newRuleSaved Effect] Rule Created', props<{rule: IRule}>());
export const existingRuleSaved = createAction('[Edit Rule] Existing Rule Saved', props<{update: Update<IRule>}>());
export const ruleUpdated = createAction('[existingRuleSaved Effect] Rule Updated', props<{update: Update<IRule>}>());
export const deleteRule = createAction('[Rules List] Delete Rule', props<{rule: IRule}>());
export const ruleDeleted = createAction('[deleteRule Effect] Rule Deleted', props<{rule: IRule}>());


