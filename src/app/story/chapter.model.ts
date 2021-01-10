import {Requirement} from './event.model';
import {Page} from './page.model';

export class Chapter {
  id: number;
  title: string;
  // These are the Requirements of the current, active chapter.  They must be completed before moving on to the next chapter.
  requirements: Requirement[];
  pages: Page[];
  intro: string; // intro could be a page of its own

  constructor(options: {
    id?: number,
    title?: string,
    requirements?: Requirement[],
    pages?: Page[],
    intro?: string,
  } = {}) {
    this.id = options.id;
    this.title = options.title;
    this.requirements = options.requirements;
    this.pages = options.pages;
    this.intro = options.intro;
  }
}
