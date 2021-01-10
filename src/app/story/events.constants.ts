export const Events = Object.freeze({
  // These are events, things that HAVE HAPPENED in the game.
  //  Each Event can have a custom payload (data about the event), the most common payload is...
  //  { contextId, contextAmount, sourceId, destId }
  choiceSelected: 'choiceSelected',
  itemAdded: 'itemAdded',
  itemRemoved: 'itemRemoved',
  moneyAdded: 'moneyAdded',
  changeLocation: 'changeLocation', // just like it sounds (either the characters did it, or we are 'doing it' to them - think teleport)
  changeStat: 'changeStat',
  changeMoney: 'changeMoney',
  changeHealth: 'changeHealth',
});
