export const Actions = Object.freeze({
  // These are basically all the things a character CAN DO or HAVE DONE TO THEM in the game
  selectChoice: 'selectChoice', // the simplest action, choose a particular choice (think choose-your-own-adventure)
  displayPage: 'displayPage',   // simple game event - either 'display a page' (the game engine does it) or 'the page was displayed' (the characters did it - not sure about that last one)
  advanceChapter: 'advanceChapter',
  killEnemy: 'defeatEnemy',   // kill an enemy
  giveItem: 'giveItem',         // just like it sounds
  takeItem: 'takeItem',
  giveMoney: 'giveMoney',
  arriveAtLocation: 'arriveAtLocation', // just like it sounds (either the characters did it, or we are 'doing it' to them - think teleport)
  changeStat: 'changeStat',
  changeMoney: 'changeMoney',
  changeHealth: 'changeHealth',
  // How does this one work exactly?  It's not a one-time event.  It's a state of being.  When is the check made?
  //  Do we want to build more of a history book?  ChoiceSelected, EnemyDefeated, ItemGiven, WentToLocation.
  //  Still don't know how 'have' fits in.  Sounds more like a 'StatCheck' or 'CharacterCheck' instead of an event.
  //  Maybe 'changeStat', 'changeMoney' -> that's a way to handle 'CharacterCheck' stuff as a history to be looked up and compared to
  //  objectives. (e.g. when money changes to 1000 or more gold, do something)
  //have: 'have',                 // have 18 CHA, have 1000 gold, etc

});
