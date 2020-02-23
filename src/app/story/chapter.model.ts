import {Objective} from '../objectives/objective.model';
import {Page} from './page.model';

export class Chapter {
  id: number;
  title: string;
  // These are the objectives of the current, active chapter.  They must be completed before moving on to the next chapter.
  objectives: Objective[];
  // when all of a page's objectives are completed, display that page (they don't necessarily have to be completed in order)
  // todo: are page objectives pre-reqs, things that have to be accomplished before the page can be displayed?
  // todo: figure out how to model choose-your-own-adventure (cyoa) first, then expand to other possibilities
  //  I'm thinking cyoa doesn't even use objectives.  Choices simply lead to certain pages?  How does that work?
  // event(events.selectChoice, choiceId) -> how does it know what page to navigate to?  DecisionTree needs to have a 'gotoPage' result?
  // todo: I need to decide of objectives/story/chapters/pages handle everything or if decisionTrees have their own specific logic and possibilities.
  // todo: Draw out cyoa tree on paper.  Draw out decision tree on paper.  Find common implementation for both.  Explore the differences.
  pages: Page[];
  intro: string;

  constructor(options: {
    id?: number,
    title?: string,
    objectives?: Objective[],
    pages?: Page[],
    intro?: string,
  } = {}) {
    this.id = options.id;
    this.title = options.title;
    this.objectives = options.objectives;
    this.pages = options.pages;
    this.intro = options.intro;
  }
}
