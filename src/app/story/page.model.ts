import {Requirement} from './event.model';

// This is a generic construct that can work for Choose Your Own Adventure (CYOA) page flows and Decision/Dialog Trees
export class Page {
  id: number;
  title: string;
  // objectives: Requirement[]; // do these belong here?
  decisionTreeId: number;
  //locationId: number; // page associated with a location? display upon arrival? If we want to do that, the location should have a PageId instead.
  content: string; // this is the actual pages of the story (e.g. text/images/mebbe html?)
  choices: Choice[];

  constructor(options: {
    id?: number,
    title?: string,
    // objectives?: Requirement[],
    decisionTreeId?: number,
    // locationId?: number,
    content?: string,
    choices?: Choice[],
  } = {}) {
    this.id = options.id;
    this.title = options.title;
    // this.objectives = options.objectives;
    // this.decisionTreeId = options.decisionTreeId; // I've decided Pages are the basic building blocks of decisionTrees
    // this.locationId = options.locationId;
    this.content = options.content;
    this.choices = options.choices;
  }
}

export class Choice {
  id: number;
  text: string;               // this is the text of the choice e.g. 'Do you attack the monster?', 'Do you run for your life?'
  requirements: Requirement[];  // something that has to happen before this choice is available (e.g. have 18 CHA, must have chosen 'free the slaves', have 1000 gold, etc)
  // todo: instead of having this here, consider having a trigger that connects this choice to a Page (like a join table in a database)
  destinationPageId: number;  // this is the page you go to if you make this choice

  constructor(options: {
    id?: number,
    text?: string,
    requirements?: Requirement[],
    destinationPageId?: number,
  } = {}) {
    this.id = options.id;
    this.text = options.text;
    this.requirements = options.requirements;
    this.destinationPageId = options.destinationPageId;
  }

}
