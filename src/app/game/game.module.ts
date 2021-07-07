import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromGame from './store/game.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromGame.gameFeatureKey, fromGame.reducer)
  ],
})
export class GameModule {}
