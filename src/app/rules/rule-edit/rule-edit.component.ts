import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {Update} from '@ngrx/entity';
import {IRule, Rule} from '../rule.model';
import {RuleActions} from '../store/rule.actions-typed';
import 'brace';
import 'brace/mode/json';
import 'brace/mode/text';
import 'brace/theme/github';
import {AceConfigInterface} from 'ngx-ace-wrapper';

@Component({
  selector: 'ugs-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss']
})
export class RuleEditComponent implements OnInit {

  @Input() rule: IRule;
  @Input() mode: 'create' | 'update';
  @Output() formClosed = new EventEmitter();
  form: FormGroup;
  loading$: Observable<boolean>;
  config: AceConfigInterface;
  actionDependencyJson: any;
  actionDependencyJsonString: string;
  conditionsJsonString: string;
  outputActionsJsonString: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.config = {
      mode: 'json',
      theme: 'github',
      readOnly : false
    };
  }

  ngOnInit(): void {
    const formControls = {
      name: ['', Validators.required],
      description: ['', Validators.required],
      actionDependencies: ['', Validators.required],
      conditions: ['', Validators.required],
      outputActions: ['', Validators.required],
      priority: [0, Validators.required],
    };

    if (this.mode === 'update') {
      this.form = this.fb.group(formControls);

      const stringifiedRule = {
        ...this.rule,
        actionDependencies: this.rule.actionDependencies ? JSON.stringify(this.rule.actionDependencies, null, 2) : null,
        conditions: this.rule.conditions ? JSON.stringify(this.rule.conditions, null, 2) : null,
        outputActions: this.rule.outputActions ? JSON.stringify(this.rule.outputActions, null, 2) : null
      };

      this.actionDependencyJsonString = stringifiedRule.actionDependencies;
      this.conditionsJsonString = stringifiedRule.conditions;
      this.outputActionsJsonString = stringifiedRule.outputActions;

      this.form.patchValue({...stringifiedRule});
    }
    else if (this.mode === 'create') {
      this.form = this.fb.group({
        ...formControls
      });
    }
  }

  onCancel() {
    this.formClosed.emit();
  }

  onSave() {
    // translate the form into objects where necessary
    const formValues = {...this.form.value};
    formValues.actionDependencies = this.actionDependencyJsonString ? JSON.parse(this.actionDependencyJsonString) : {};
    formValues.conditions = this.conditionsJsonString ? JSON.parse(this.conditionsJsonString) : {};
    formValues.outputActions = this.outputActionsJsonString ? JSON.parse(this.outputActionsJsonString) : {};

    const mergedRule: IRule = {
      ...this.rule,
      ...formValues
    };

    const rule = new Rule(mergedRule);
    const serializableRule = {...rule}; // ngRx does not allow objects with their own constructors when strict serializability is turned on!!!!!

    const update: Update<IRule> = {
      id: rule.id,
      changes: serializableRule
    };

    if (this.mode === 'create') {
      this.store.dispatch(RuleActions.newRuleSaved({rule: serializableRule}));
    }
    else if (this.mode === 'update') {
      this.store.dispatch(RuleActions.existingRuleSaved({update}));
    }

    this.formClosed.emit();
  }

}
