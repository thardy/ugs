export const Actions = Object.freeze({
  // These are commands, basically all the things that can be done in a game.
  //  Each Action can have a specified payload (parameters), the most common payload is...
  //  { contextId, contextAmount, sourceId, destId }
  selectChoice: 'selectChoice', // the simplest action, choose a particular choice (think choose-your-own-adventure)
  advanceChapter: 'advanceChapter',
  killEnemy: 'killEnemy',   // kill an enemy
  addItem: 'addItem',         // just like it sounds
  removeItem: 'removeItem',
  addMoney: 'addMoney',
  removeMoney: 'removeMoney',
  changeLocation: 'changeLocation', // just like it sounds (either the characters did it, or we are 'doing it' to them - think teleport)
  changeStat: 'changeStat',
  changeMoney: 'changeMoney',
  changeHealth: 'changeHealth',
});
