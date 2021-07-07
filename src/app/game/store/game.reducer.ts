import {createReducer, MetaReducer, on, State} from '@ngrx/store';
import {Quest} from '../quest.model';
import {RuleActions} from '../../rules/store/rule.actions-typed';
import {GameActions} from './game.actions-typed';
export const gameFeatureKey = 'game';

export interface IGameState {
  epicQuests: Quest[];
  quests: Quest[];
}

export const initialState: IGameState = {
  epicQuests: [],
  quests: []
};

export const reducer = createReducer(
  initialState,

  on(GameActions.incrementQuestCounter,
    (state, action) => {
      const questIndex = state.quests.findIndex((quest) => quest.id === action.appAction.contextId);
      let newQuests = state.quests;
      if (questIndex > -1) {
        newQuests[questIndex].amount += 1;
      }
      return {
        ...state,
        quests: newQuests
      };
    }),

  on(GameActions.incrementEpicQuestCounter,
    (state, action) => {
      const epicQuestIndex = state.epicQuests.findIndex((epicQuest) => epicQuest.id === action.appAction.contextId);
      let newEpicQuests = state.epicQuests;
      if (epicQuestIndex > -1) {
        newEpicQuests[epicQuestIndex].amount += 1;
      }
      return {
        ...state,
        epicQuests: newEpicQuests
      };
    }),
);



