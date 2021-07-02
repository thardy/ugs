// This is the class to track Quest progress/state/status (might want to rename it later)
export class Quest {
  id: number;
  amount: number;
  status: string;

  constructor(options: {
    id?: number,
    amount?: number,
    status?: string;

  } = {}) {
    this.id = options.id;
    this.amount = options.amount || 0;
    this.status = options.status;
  }
}
