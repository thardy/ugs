import {Quest} from './quest.model';
import {InventoryItem} from './inventory-item.model';

export class Player {
  id: number;
  name: string;
  quests: Quest[];
  inventory: InventoryItem[];

  constructor(options: {
    id?: number,
    name?: string,
    quests?: Quest[],
    inventory?: InventoryItem[],

  } = {}) {
    this.id = options.id;
    this.name = options.name;
    this.quests = options.quests;
    this.inventory = options.inventory;
  }
}
