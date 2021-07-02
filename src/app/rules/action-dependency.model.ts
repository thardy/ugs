export class ActionDependency {
  // Examples:
  // if anyone gives any item from this approved list to npc 152..
  //  name: 'giveItem', possibleContextIds: [1, 2, 3, ... 101], destination: 152
  // if a particular enemy is defeated
  //  name: 'enemyDefeated', exactContextId: 381
  //
  name: string; // the name of the action
  exactContextId: number;  // required contextId (if any)
  possibleContextIds: number[];  // list of possible contextIds (if any - trumped by exactContextId)
  source: number; // required source (if any)
  destination: number;  // required destination (if any)

  constructor(options: {
    name?: string,
    exactContextId?: number,
    possibleContextIds?: number[],
    source?: number,
    destination?: number,
  } = {}) {
    this.name = options.name;
    this.exactContextId = options.exactContextId;
    this.possibleContextIds = options.possibleContextIds;
    this.source = options.source;
    this.destination = options.destination;
  }
}
