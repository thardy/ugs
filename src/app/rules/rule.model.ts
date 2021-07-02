import {ActionDependency} from './action-dependency.model';
import {GenericAction} from './generic-action.model';

export interface IRule {
  id: number;
  name: string;
  description: string;
  actionDependencies: ActionDependency[]; // these are fast checks against events - if ANY of these match, check our conditions
  conditions: any; // the query against state - if these match, execute our outputActions
  outputActions: GenericAction[];
  priority: number;
  created: string;
}

export class Rule {
    id: number;
    name: string;
    description: string;
    // I'm considering making both actionDependencies and outputActions use the same type
    // I'm also considering making that type very generic (e.g. {name, payload})
    actionDependencies: ActionDependency[]; // these are fast checks against actions happening - if ANY of these match, check our conditions
    conditions: any; // the query against state - if these all match, execute our outputActions
    outputActions: GenericAction[];
    priority: number;
    created: string;

    constructor(options: {
        id?: number,
        name?: string,
        description?: string,
        actionDependencies?: ActionDependency[],
        conditions?: any,
        outputActions?: GenericAction[],
        priority?: number,
        created?: string,

    } = {}) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description || '';
        this.actionDependencies = options.actionDependencies || [];
        this.conditions = options.conditions;
        this.outputActions = options.outputActions || [];
        this.priority = options.priority || 998;
        this.created = options.created;
    }
}

export function compareRules(r1: IRule, r2: IRule) {
  const compare = r1.priority - r2.priority;

  if (compare > 0) {
    return 1;
  }
  else if (compare < 0) {
    return -1;
  }
  else return 0;
}
