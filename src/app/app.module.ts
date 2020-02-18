import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdventureMapComponent } from './adventure-map/adventure-map.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { CombatMapComponent } from './combat-map/combat-map.component';

@NgModule({
  declarations: [
    AppComponent,
    AdventureMapComponent,
    LocationMapComponent,
    CombatMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
