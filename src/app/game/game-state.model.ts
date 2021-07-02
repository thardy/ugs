import {Quest} from './quest.model';

export interface IGameState {
  epicQuests: Quest[];
  quests: Quest[];
}

export class GameState {
  epicQuests: Quest[];
  quests: Quest[];

  constructor(options: {
    epicQuests?: Quest[],
    quests?: Quest[],

  } = {}) {
    this.epicQuests = options.epicQuests;
    this.quests = options.quests;
  }
}
