import { Injectable } from '@angular/core';
import {GameStateService} from '../game-state/game-state.service';
import {RandomEncounterService} from '../random-encounters/random-encounter.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private gameStateService: GameStateService,
    private randomEncounterService: RandomEncounterService,
    private router: Router) {

  }

  locationSelected(sourceLocationId: string, destLocationId: string) {
    const randomEncounter = this.randomEncounterService.getRandomEncounter(sourceLocationId, destLocationId);
    if (randomEncounter) {
      // todo: what do we do here?
    }

    this.gameStateService.setLocation(destLocationId);

    const locationTransition = this.getLocationTransition(sourceLocationId, destLocationId);

    if (locationTransition) {
      this.router.navigate(['/location-transition', locationTransition.id]);
    }
    else {
      this.router.navigate(['/location-map', destLocationId]);
    }
  }

  private getLocationTransition(sourceLocationId: string, destLocationId: string) {
    let locationTransition = null;

    return locationTransition;
  }
}
