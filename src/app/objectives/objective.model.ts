export class Objective {
  id: number;
  requiredEventId: any;   // e.g. *selectChoice* 'save the slaves', *defeatEnemy* 10 rabbits, *giveItem* 15 weapons, *giveItem* particular item, *arriveAtLocation* Haven
  requiredItemId: any;    // e.g. selectChoice *'save the slaves'*, defeatEnemy 10 *rabbits*, giveItem 15 *weapons*, giveItem *particular item*, arriveAtLocation *Haven*
  requiredCount: number;  // e.g. selectChoice 'save the slaves', defeatEnemy *10* rabbits, giveItem *15* weapons, giveItem *1* particular item , arriveAtLocation Haven
  description: string;    // the description to show (like in the quest journal?)

  constructor(options: {
    id?: number,
    requiredEventId?: any,
    requiredItemId?: any,
    requiredCount?: number,
    description?: string,
  } = {}) {
    this.id = options.id;
    this.requiredEventId = options.requiredEventId;
    this.requiredItemId = options.requiredItemId;
    this.requiredCount = options.requiredCount;
    this.description = options.description;
  }
}
