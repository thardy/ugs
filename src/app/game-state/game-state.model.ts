export class GameState {
  locationId: string;

  constructor(options: {
    locationId?: string,
  } = {}) {
    this.locationId = options.locationId;
  }

}
