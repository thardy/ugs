import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {GameState} from './game-state.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private gameStateSubject: BehaviorSubject<GameState>;
  gameState$: Observable<GameState>;

  constructor() { }

  setLocation(locationId: string) {
    const gameState = this.cloneGameState();
    gameState.locationId = locationId;
    this.publishGameState(gameState);
  }

  private cloneGameState() {
    return _.cloneDeep(this.gameStateSubject.getValue());
  }

  private publishGameState(gameState: GameState) {
    this.gameStateSubject.next(gameState);
  }
}
