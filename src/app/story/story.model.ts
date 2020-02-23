import {Requirement} from './event.model';
import {Chapter} from './chapter.model';

export class Story {
  title: string;
  // when all objectives of a chapter are completed, display next chapter intro and begin next chapter (perhaps wait until they exit a location or something???)
  //  chapters should be sequential.
  chapters: Chapter[];

  constructor(options: {
    title?: string,
    chapters?: Chapter[],
  } = {}) {
    this.title = options.title;
    this.chapters = options.chapters;
  }
}

