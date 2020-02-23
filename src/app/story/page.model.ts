import {Objective} from '../objectives/objective.model';

export class Page {
  id: number;
  title: string;
  objectives: Objective[];
  decisionTreeId: number;
  locationId: number;
  content: string; // this is the actual pages of the story (e.g. text/images/mebbe html?)

  constructor(options: {
    id?: number,
    title?: string,
    objectives?: Objective[],
    decisionTreeId?: number,
    locationId?: number,
    content?: string,
  } = {}) {
    this.id = options.id;
    this.title = options.title;
    this.objectives = options.objectives;
    this.decisionTreeId = options.decisionTreeId;
    this.locationId = options.locationId;
    this.content = options.content;
  }
}
