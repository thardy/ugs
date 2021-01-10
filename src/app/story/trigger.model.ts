import {Event} from './event.model';
import {Action} from 'rxjs/internal/scheduler/Action';

export class Trigger {
  // Any actions that need to happen as soon as state matches requirements
  //   * at least one Requirement needs to be based on an Event to provide the async portion of the Trigger
  id: number;
  requirements: Requirement[];  // when any Event-based Requirement occurs, we check all the Requirements for a match
  // things I want to be able to do
  //  displayPage (cyoa and decision tree), arriveAtLocation, changeStat, giveItem, takeItem, killEnemy, etc
  actions: Action[];       // execute these Actions when the Requirements list matches state

  constructor(options: {
    id?: number,
    requirements?: Requirement[],
    actions?: Action[],
  } = {}) {
    this.id = options.id;
    this.requirements = options.requirements;
    this.actions = options.actions;
  }
}
