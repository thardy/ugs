import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';
import * as underscoreQuery from 'underscore-query';
import {GenericAction} from './generic-action.model';
import {ActionNames} from './action-names.constants';
import {Action, select, Store} from '@ngrx/store';
import {IProduct} from '../products/product.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {IRule} from './rule.model';
import {selectAllRules} from './store/rule.selectors';
import {AppState} from '../store/reducers';
import {AppAction, IAppAction} from './app-action.model';
import {ActionDependency} from './action-dependency.model';
import {GameActions} from '../game/store/game.actions-typed';
const query = underscoreQuery(_, false);

@Injectable()
export class RuleService {
  baseUrl: string;
  rules: IRule[];
  appState: AppState;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.baseUrl = '/api/rules';

    this.store
      .pipe(
        select(selectAllRules),
        tap((rules) => {
          // should we map from IRule to actual Rule here?
          this.rules = rules;
        })
      )
      .subscribe();

    // todo: figure out how to grab "all" the current state - just grab the root appState?
    this.store
      .pipe(
        select((appState) => {
          this.appState = appState;
        })
      )
      .subscribe();

  }

  // basic CRUD BEGIN
  getRules() {
    return this.http.get<IRule[]>(this.baseUrl);
  }

  createRule(product: IRule): Observable<IRule> {
    return this.http.post<IRule>(this.baseUrl, product);
  }

  updateRule(id: string | number, update: Partial<IRule>): Observable<IRule> {
    return this.http.put<IRule>(`${this.baseUrl}/${id}`, update);
  }

  deleteRule(product: IRule) {
    return this.http.delete(`${this.baseUrl}/${product.id}`)
      .pipe(
        map((result) => {
          return product;
        })
      );
  }
  // basic CRUD END

  // facts
  // rules
  // workflow:
  //  - cycle through all rules in order
  //  - see if each rule matches the facts (isActive/isMatch?)
  //  - perform ruleActions for rule

  checkRules(action: any) {
    console.log(`Checking Rules for action = ${action.type} and actionJson = ${JSON.stringify(action)}`);
    const matchedRules = [];

    this.rules.forEach((rule) => {
      if (rule.actionDependencies) {
        rule.actionDependencies.forEach((actionDependency) => {
          if (this.actionMatchesRuleDependencies(action, actionDependency)) {
            // execute rule query to see if it matches current state
            // todo: test to see if we need to wrap appState in an array -> [this.appState]
            const isMatch = this.isMatch(this.appState, rule);
            if (isMatch) {
              matchedRules.push(rule);
            }
          }
        });
      }
    });

    if (matchedRules.length > 0) {
      this.executeMatchedRules(this.appState, matchedRules);
    }
  }

  actionMatchesRuleDependencies(action: any, actionDependency: ActionDependency) {
    let isMatch = false;
    const appAction = action.appAction;

    if (appAction && actionDependency.name === appAction.name) {
      const exactContextIdFilterPresent = !!actionDependency.exactContextId;
      const possibleContextIdsFilterPresent = !!actionDependency.possibleContextIds;
      const sourceFilterPresent = !!actionDependency.source;
      const destinationFilterPresent = !!actionDependency.destination;

      // all present filters must match for us to have a match
      if (exactContextIdFilterPresent) {
        // todo: settle on a type for contextIds (I'm leaning towards strings). Currently using numbers because json-server uses int Ids.
        isMatch = actionDependency.exactContextId === parseInt(appAction.contextId, 10);
        if (!isMatch) { return false; } // if any filter that's present fails, immediately return because we don't have a match
      }
      if (possibleContextIdsFilterPresent) {
        isMatch = _.includes(actionDependency.possibleContextIds, parseInt(appAction.contextId));
        if (!isMatch) { return false; }
      }
      if (sourceFilterPresent) {
        isMatch = actionDependency.source === appAction.source;
        if (!isMatch) { return false; }
      }
      if (destinationFilterPresent) {
        isMatch = actionDependency.destination === appAction.destination;
        if (!isMatch) { return false; }
      }
    }

    return isMatch;
  }

  isMatch(facts, rule) {
    let isMatch = false;

    const queryResult = query(facts, rule.conditions);

    return queryResult && queryResult.length > 0;
  }


  getMatchingRules(facts: any, rules: any[]) {
    const matchingRules = [];
    //const queryResults = [];

    rules.forEach((rule) => {
      const isMatch = this.isMatch(facts, rule);
      if (isMatch) {
        //queryResults.push(queryResult);
        matchingRules.push(rule);
      }
    });

    return matchingRules;
  }

  executeMatchedRules(facts: any, matchedRules) {
    const sortedRules = _.sortBy(matchedRules, ['priority']);

    sortedRules.forEach((rule) => {
      // execute all the ruleActions for this rule
      rule.outputActions.forEach((action) => {
        this.executeAction(action, facts);
      })
    });
  }

  executeAction(action: GenericAction, facts: any) {
    if (action && action.name) {
      const appAction = new AppAction({...action.properties, name: action.name});
      // we have to translate the typed model to a raw javascript object (via spread operator) because no object
      //  with a custom constructor can pass through ngRx (can't guarantee immutability)
      this.store.dispatch({type: action.name, appAction: {...appAction}});
    }
    // const properties = action.properties;
    //
    // switch (action.name) {
    //   case ActionNames.alterMedicationDx:
    //     const medication = facts.medications.find((med) => med[properties.lookupKey] === properties.lookupValue)
    //     medication.dx = properties.newValue;
    //     break;
    //   case ActionNames.alterFormItemVisibility:
    //     // todo: refactor
    //     for (const pageGroup of facts.layout.pageGroups) {
    //       if (properties.formItemLevel === 'pageGroup') {
    //         if (pageGroup.shortName === properties.shortName) {
    //           pageGroup.visible = properties.newVisibilityValue;
    //         }
    //       }
    //       else {
    //         for (const page of pageGroup.pages) {
    //           if (properties.formItemLevel === 'page') {
    //             if (page.shortName === properties.shortName) {
    //               page.visible = properties.newVisibilityValue;
    //             }
    //           }
    //           else {
    //             for (const section of page.sections) {
    //               if (properties.formItemLevel === 'section') {
    //                 if (section.shortName === properties.shortName) {
    //                   section.visible = properties.newVisibilityValue;
    //                 }
    //               }
    //               else {
    //                 for (const question of section.questions) {
    //                   if (properties.formItemLevel === 'question') {
    //                     if (question.shortName === properties.shortName) {
    //                       question.visible = properties.newVisibilityValue;
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //
    //     break;
    // }
  }
}
