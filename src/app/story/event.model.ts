// I'm thinking these are things that can be requirements, like chapter requirements, quest objectives, etc, OR things that can happen to the
//  characters.  Things the characters can DO, and things that can be DONE TO THEM.
export class Event {
  id: number;
  action: string;   // e.g. *selectChoice* 'save the slaves', *defeatEnemy* 10 rabbits, *giveItem* 15 weapons, *giveItem* particular item, *arriveAtLocation* Haven
                          //  'have' 18 STR, 'have' 1000 gold - these might be better handled as 'CharacterCheck'
  actionContextId: any;    // e.g. selectChoice *'save the slaves'*, defeatEnemy 10 *rabbits*, giveItem 15 *weapons*, giveItem *particular item*, arriveAtLocation *Haven*
  actionContextAmount: number;  // e.g. selectChoice 'save the slaves', defeatEnemy *10* rabbits, giveItem *15* weapons, giveItem *1* particular item , arriveAtLocation Haven
  // todo: do I need the following?  Won't we need to know exactly who you're supposed to give the magic wand to?
  //  perhaps this belongs in Trigger.  Event describes either what needs to happen or what happened, and Trigger decides exactly who
  //  the parties involved need to be, and maybe even WHEN? (e.g. party has to give 1000 gold to npc 1712 before turn 100)
  // todo: Nail down the relationship between Event and Trigger
  // initiator: ???;  // *character* gives 1000 gold to npc
  // receiver: ???;   // character gives 1000 gold to *npc*

  constructor(options: {
    id?: number,
    action?: any,
    actionContextId?: any,
    actionContextAmount?: number,
  } = {}) {
    this.id = options.id;
    this.action = options.action;
    this.actionContextId = options.actionContextId;
    this.actionContextAmount = options.actionContextAmount;
  }
}
