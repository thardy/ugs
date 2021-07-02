import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';

import {map, switchMap} from 'rxjs/operators';
import {AppState} from '../../store/reducers';
import {RuleActions} from './rule.actions-typed';
import {RuleService} from '../rule.service';
import {Update} from '@ngrx/entity';
import {IProduct} from '../../products/product.model';
import {IRule} from '../rule.model';

@Injectable()
export class RuleEffects {

  loadRules$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(RuleActions.loadRules),
        switchMap(action => this.ruleService.getRules()),
        map((rules) => RuleActions.rulesLoaded({rules}))
      )
  );

  newRuleSaved$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(RuleActions.newRuleSaved),
        switchMap(action => this.ruleService.createRule(action.rule)),
        map((rule) => RuleActions.ruleCreated({rule: rule}))
      ),
  );

  existingRuleSaved$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(RuleActions.existingRuleSaved),
        switchMap(action => this.ruleService.updateRule(action.update.id, action.update.changes)),
        map((rule) => {
          // todo: see if we can simplify this
          const serializableRule = {...rule};
          const update: Update<IRule> = {
            id: rule.id,
            changes: serializableRule
          };
          return RuleActions.ruleUpdated({update: update})
        })
      ),
  );

  deleteRule$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(RuleActions.deleteRule),
        switchMap(action => {
          return this.ruleService.deleteRule(action.rule);
        }),
        //map((rule) => RuleActions.ruleDeleted({rule: rule}))
      ),
    {dispatch: false} // don't dispatch a new action
  );

  constructor(private actions$: Actions,
              private ruleService: RuleService,
  ) {}
}
