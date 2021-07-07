// Commands to imperatively make something happen
// This class is an attempt to genericize actions (for the sake of rules). Every action in a system is completely unique. This is an
//  attempt to draw some common metadata out of all actions for the purpose of writing rules against them.
export interface IAppAction {
  id: number;
  name: string;     // e.g. *selectChoice* 'save the slaves', *defeatEnemy* 10 rabbits, *giveItem* 15 weapons, *giveItem* particular item, *arriveAtLocation* Haven
  contextId: any;   // e.g. selectChoice *'save the slaves'*, defeatEnemy 10 *rabbits*, giveItem 15 *weapons*, giveItem *particular item*, arriveAtLocation *Haven*
  contextAmount: number;  // e.g. selectChoice 'save the slaves', defeatEnemy *10* rabbits, giveItem *15* weapons, giveItem *1* particular item , arriveAtLocation Haven
  source: any;      // might want to type the source once we know more detail about how we will use it
  destination: any; // might want to type the destination once we know more detail about how we will use it
}

export class AppAction {
  // has the following logical structure
  //  <action> <contextAmount> <contextId>
  //  name - what we are doing with the thing
  //  contextId - the thing being acted upon or with
  //  contextAmount - how many of the thing we are talking about
  //  source - the source/giver of the action
  //  destination - the destination/receiver of the action
  //  e.g. giveItem 100 gold from player1 to npc32
  id: number;
  name: string;
  contextId: any;
  contextAmount: number;
  source: any;
  destination: any;

  constructor(options: {
    id?: number,
    name?: any,
    contextId?: any,
    contextAmount?: number,
    source?: any,
    destination?: any,
  } = {}) {
    this.id = options.id;
    this.name = options.name;
    this.contextId = options.contextId;
    this.contextAmount = options.contextAmount;
    this.source = options.source;
    this.destination = options.destination;
  }
}
