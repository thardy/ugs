import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {isLoading, isLoaded, selectAllRules} from '../store/rule.selectors';
import {IRule} from '../rule.model';
import {RuleActions} from '../store/rule.actions-typed';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {AppAction} from '../app-action.model';
import {GameActions} from '../../game/store/game.actions-typed';

@Component({
  selector: 'ugs-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RuleListComponent implements OnInit {

  rules$: Observable<IRule[]>;
  loading$: Observable<boolean>;
  loading = false;
  editing = false;
  adding = false;
  selectedRule: IRule;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rules$ = this.store
      .pipe(
        select(selectAllRules)
      );

    this.loading$ = this.store
      .pipe(
        select(isLoading),
        tap((isLoading) => {
          this.loading = isLoading;
        })
      );
    this.loading$.subscribe();

    this.store
      .pipe(
        select(isLoaded),
        tap((isLoaded) => {
          if (!this.loading && !isLoaded) {
            this.loading = true;
            this.store.dispatch(RuleActions.loadRules());
          }
        }),
        filter(isLoaded => isLoaded),
        first(),
        finalize(() => this.loading = false),
      )
      .subscribe();

    //this.testCount$ = this.store.pipe(select(testCount));
  }

  onEdit(rule: IRule) {
    this.selectedRule = {...rule};
    this.editing = true;
  }

  onAdd() {
    this.adding = true;
  }

  onDelete(rule: IRule) {
    // can't pass typed objects with their own constructors through ngRx because it violates strict serializability
    //  translating to a raw object using spread operator is MANDATORY when dealing with typed object with custom constructors
    this.store.dispatch(RuleActions.deleteRule({rule: {...rule}}));
  }

  onFormClosed() {
    this.selectedRule = null;
    this.editing = false;
    this.adding = false;
  }

  onTestButton1() {
    //this.store.dispatch(RuleActions.incrementTestCount());
  }

  onTestButton2() {
    //this.store.dispatch(RuleActions.decrementTestCount());
  }

  onDispatchAction(appActionOptions: any) {
    const appAction = new AppAction(appActionOptions);

    switch(appAction.name) {
      case 'giveItem':
        this.store.dispatch(GameActions.giveItem({appAction: {...appAction}}));
        break;
      case 'enemyDefeated':
        this.store.dispatch(GameActions.enemyDefeated({appAction: {...appAction}}));
        break;
      case 'completeQuest':
        this.store.dispatch(GameActions.completeQuest({appAction: {...appAction}}));
        break;
      case 'allianceMade':
        this.store.dispatch(GameActions.allianceMade({appAction: {...appAction}}));
        break;
      case 'testAction':
        this.store.dispatch(GameActions.incrementQuestCounter({appAction: {...appAction}}));
        break;

    }

  }
}
