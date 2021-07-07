import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {IAppAction} from '../../rules/app-action.model';

export const giveItem = createAction('giveItem', props<{appAction: IAppAction}>());
export const enemyDefeated = createAction('enemyDefeated', props<{appAction: IAppAction}>());
export const allianceMade = createAction('allianceMade', props<{appAction: IAppAction}>());
export const completeQuest = createAction('completeQuest', props<{appAction: IAppAction}>());

export const incrementQuestCounter = createAction('incrementQuestCounter', props<{appAction: IAppAction}>());
export const incrementEpicQuestCounter = createAction('incrementEpicQuestCounter', props<{appAction: IAppAction}>());
