import {Component, OnInit} from '@angular/core';
import {LocationService} from '../locations/location.service';
import {GameStateService} from '../game-state/game-state.service';
import {GameLocation} from '../locations/game-location.model';

@Component({
  selector: 'ugs-adventure-map',
  templateUrl: './adventure-map.component.html',
  styleUrls: ['./adventure-map.component.less']
})
export class AdventureMapComponent implements OnInit {
  locations = [];
  currentLocation: GameLocation;

  constructor(private locationService: LocationService, private gameStateService: GameStateService) {
    this.locations = [
      { id: 'quietVillage', name: 'quietVillage' },
      { id: 'darkDungeon', name: 'darkDungeon' },
      { id: 'hauntedForest', name: 'hauntedForest' },
    ];

    this.currentLocation = this.locations[0];
  }

  ngOnInit() {
  }

  locationSelected(locationId: any) {
    this.locationService.locationSelected(this.currentLocation.id, locationId);
  }
}
