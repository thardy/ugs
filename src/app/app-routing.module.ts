import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdventureMapComponent} from './adventure-map/adventure-map.component';
import {LocationMapComponent} from './location-map/location-map.component';

const routes: Routes = [
  {path: 'adventure-map', component: AdventureMapComponent},
  {path: 'location-map/:locationId', component: LocationMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
