import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Action, ActionsSubject, Store} from '@ngrx/store';

import {AppState} from './store/reducers';
import {takeUntil} from 'rxjs/operators';
import {RuleService} from './rules/rule.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'ugs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject<void>();
  title = 'ugs';
  loading = true;

  constructor(private router: Router,
              private store: Store<AppState>,
              private actionsSubject: ActionsSubject,
              private ruleService: RuleService) {}

  ngOnInit() {
    this.actionsSubject
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((action: Action) => {
        // notify rules engine of what happened
        this.ruleService.checkRules(action);
      });

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
