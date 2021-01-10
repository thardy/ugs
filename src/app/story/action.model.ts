// Commands to imperatively make something happen
export class Action {
  // has the following logical structure
  //  <action> <contextAmount> <contextId>
  //  action - what we are doing with the thing
  //  contextAmount - how many of the thing we are talking about
  //  contextId - the thing being acted upon or with
  //  e.g. addItem 100 gold
  id: number;
  name: string;     // e.g. *selectChoice* 'save the slaves', *defeatEnemy* 10 rabbits, *giveItem* 15 weapons, *giveItem* particular item, *arriveAtLocation* Haven
  //  'have' 18 STR, 'have' 1000 gold - these might be better handled as 'CharacterCheck'
  contextId: any;   // e.g. selectChoice *'save the slaves'*, defeatEnemy 10 *rabbits*, giveItem 15 *weapons*, giveItem *particular item*, arriveAtLocation *Haven*
  contextAmount: number;  // e.g. selectChoice 'save the slaves', defeatEnemy *10* rabbits, giveItem *15* weapons, giveItem *1* particular item , arriveAtLocation Haven
  source: any;      // might want to type the source once we know more detail about how we will use it
  destination: any; // might want to type the destination once we know more detail about how we will use it

  constructor(options: {
    id?: number,
    action?: any,
    contextId?: any,
    contextAmount?: number,
    source?: any,
    destination?: any,
  } = {}) {
    this.id = options.id;
    this.name = options.action;
    this.contextId = options.contextId;
    this.contextAmount = options.contextAmount;
    this.source = options.source;
    this.destination = options.destination;
  }
}
