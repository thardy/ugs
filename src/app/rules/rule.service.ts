import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';
import * as underscoreQuery from 'underscore-query';
import {GenericAction} from './generic-action.model';
import {ActionNames} from './action-names.constants';
import {Action} from '@ngrx/store';
import {IProduct} from '../products/product.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {IRule} from './rule.model';
const query = underscoreQuery(_, false);

@Injectable()
export class RuleService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/rules';
  }

  // basic CRUD
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

  // facts
  // rules
  // workflow:
  //  - cycle through all rules in order
  //  - see if each rule matches the facts (isActive/isMatch?)
  //  - perform ruleActions for rule

  checkRules(action: any) {
    console.log(`Checking Rules for action = ${action.type} and actionJson = ${JSON.stringify(action)}`);
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
      rule.actions.forEach((action) => {
        this.executeAction(action, facts);
      })
    });
  }

  executeAction(action: GenericAction, facts: any) {
    // {
    //   hasOddBehavior: true,
    //     name: "Joe Smith",
    //   medications: [
    //   { name: "Super Drug", diagnosis: "Hypothyroidism", dx: null },
    //   { name: "Advil", diagnosis: "Weirdness", dx: null },
    //   { name: "Super Drug2", diagnosis: "Dementia", dx: null },
    // ]
    // }
    const parameters = action.properties;

    switch (action.name) {
      case ActionNames.alterMedicationDx:
        const medication = facts.medications.find((med) => med[parameters.lookupKey] === parameters.lookupValue)
        medication.dx = parameters.newValue;
        break;
      case ActionNames.alterFormItemVisibility:
        // todo: refactor
        for (const pageGroup of facts.layout.pageGroups) {
          if (parameters.formItemLevel === 'pageGroup') {
            if (pageGroup.shortName === parameters.shortName) {
              pageGroup.visible = parameters.newVisibilityValue;
            }
          }
          else {
            for (const page of pageGroup.pages) {
              if (parameters.formItemLevel === 'page') {
                if (page.shortName === parameters.shortName) {
                  page.visible = parameters.newVisibilityValue;
                }
              }
              else {
                for (const section of page.sections) {
                  if (parameters.formItemLevel === 'section') {
                    if (section.shortName === parameters.shortName) {
                      section.visible = parameters.newVisibilityValue;
                    }
                  }
                  else {
                    for (const question of section.questions) {
                      if (parameters.formItemLevel === 'question') {
                        if (question.shortName === parameters.shortName) {
                          question.visible = parameters.newVisibilityValue;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        break;
    }
  }
}
