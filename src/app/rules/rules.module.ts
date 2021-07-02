import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import * as fromRules from './store/rule.reducers';
import {RuleEffects} from './store/rule.effects';

// import {RulesRoutingModule} from './rules-routing.module';
import {RuleService} from './rule.service';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleEditComponent } from './rule-edit/rule-edit.component';
import {ACE_CONFIG, AceConfigInterface, AceModule} from 'ngx-ace-wrapper';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
};

@NgModule({
  declarations: [
    RuleListComponent,
    RuleEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // RulesRoutingModule, // currently using eager-loading, so routes are in app-routing.module.ts
    StoreModule.forFeature(fromRules.rulesFeatureKey, fromRules.reducers, { metaReducers: fromRules.metaReducers }),
    EffectsModule.forFeature([RuleEffects]),
    AceModule,
  ],
  providers: [
    RuleService,
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ],
  exports: [
    RuleListComponent,
    RuleEditComponent,
  ]
})
export class RulesModule { }
