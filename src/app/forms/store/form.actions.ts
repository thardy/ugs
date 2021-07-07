import {createAction, props} from '@ngrx/store';
import {IAppAction} from '../../rules/app-action.model';

export const answerCreated = createAction('answerCreated', props<{appAction: IAppAction}>());
export const answerUpdated = createAction('answerUpdated', props<{appAction: IAppAction}>());
