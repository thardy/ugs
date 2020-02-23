import {Event} from './event.model';

export class Trigger {
  // The idea behind this model is, 'when this/these things happen', 'do this/these things'
  //  e.g.
  //    when selectChoice 34, then displayPage 41
  //    when defeatEnemy 79, then display Page 133
  //    when selectChoice 12, then giveItem 95
  id: number;
  requirements: Event[];  // when these things happen
  // things I want to be able to do
  //  displayPage (cyoa and decision tree), arriveAtLocation, changeStat, giveItem, takeItem, killEnemy, etc
  results: Event[];       // do these things

  constructor(options: {
    id?: number,
    requirements?: Event[],
    results?: Event[],
  } = {}) {
    this.id = options.id;
    this.requirements = options.requirements;
    this.results = options.results;
  }
}
