export class InventoryItem {
  id: number;
  name: string;
  amount?: number;

  constructor(options: {
    id?: number,
    name?: string,
    amount?: number,

  } = {}) {
    this.id = options.id;
    this.name = options.name;
    this.amount = options.amount || 0;
  }
}
