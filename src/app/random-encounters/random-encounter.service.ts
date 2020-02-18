import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomEncounterService {
  possibleEncounters = {};

  constructor() {
    this.possibleEncounters = {
      darkDungeon: {
        1: 'dungeon random encounter one',
        2: 'dungeon random encounter two',
        3: 'dungeon random encounter three',
      },
      hauntedForest: {
        1: 'forest random encounter one',
        2: 'forest random encounter two',
        3: 'forest random encounter three',
      },
    };
  }

  getRandomEncounter(sourceLocationId: string, destLocationId: string) {
    const rand = this.rand(1, 5); // 2 in 5 chance of having no encounter at all, since there are only 3 possible at each loc
    const locationPossibleEncounters = this.possibleEncounters[destLocationId];
    let encounter = null;

    if (locationPossibleEncounters && rand <= locationPossibleEncounters.length - 1) {
      encounter = locationPossibleEncounters[rand];
    }

    return encounter;
  }

  rand(lowest: number, highest: number) {
    const adjustedHigh = (highest - lowest) + 1;
    return Math.floor(Math.random() * adjustedHigh) + lowest;
  }

}
