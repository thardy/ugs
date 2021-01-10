export const Actions = Object.freeze({
  // These are basically all the things a character CAN DO or HAVE DONE TO THEM in the game
  selectChoice: 'selectChoice', // the simplest action, choose a particular choice (think choose-your-own-adventure)
  displayPage: 'displayPage',   // simple game event - either 'display a page' (the game engine does it) or 'the page was displayed' (the
                                //  characters did it - not sure about that last one)
  advanceChapter: 'advanceChapter',
  killEnemy: 'defeatEnemy',   // kill an enemy
  addItem: 'addItem',         // just like it sounds
  removeItem: 'removeItem',
  addMoney: 'addMoney',
  removeMoney: 'removeMoney',
  changeLocation: 'changeLocation', // just like it sounds (either the characters did it, or we are 'doing it' to them - think teleport)
  changeStat: 'changeStat',
  changeMoney: 'changeMoney',
  changeHealth: 'changeHealth',
  // How does this one work exactly?  It's not a one-time event.  It's a state of being.  When is the check made?
  //  Do we want to build more of a history book?  ChoiceSelected, EnemyDefeated, ItemGiven, WentToLocation.
  //  Still don't know how 'have' fits in.  Sounds more like a 'StatCheck' or 'CharacterCheck' instead of an event.
  //  Maybe 'changeStat', 'changeMoney' -> that's a way to handle 'CharacterCheck' stuff as a history to be looked up and compared to
  //  objectives. (e.g. when money changes to 1000 or more gold, do something)
  //have: 'have',                 // have 18 CHA, have 1000 gold, etc - No, this should not be an action, but a Rule to occur when state
                                  //  changes.

});

// Actions
//   Define all the actions that can take place in the game
// Pros:
//   * this allows us to be more focused around what is changing and when
// Cons:
//   * more difficult to handle objectives and story movement

// Rules Engine
//   Define rules, conditions that, when matched against current state, execute a sequence of actions
// Pros:
//   * Incredibly flexible
// Cons:
//   * not at all performant - you have to run numerous queries even when they have nothing to do with the state that just changed
//     (unless you can implement efficiencies that prevent unrelated queries from running when none of their dependencies change

// Hybrid of both of the above
//   Define Actions, and configure Rules to be dependent on a list of actions, maybe?  Like, a rule can only possibly match if one of its
//   dependent actions happened - basically just another layer of "matching" to rule out actions that could never possibly cause a rule
//   to match, before the formal query conditions even need to be matched.

// Next step:
//   * Figure out primary gameplay loop - exactly how can Actions and Rules interact to move the story forward?
//     - CYOA
//     - Expand to basic role playing game
