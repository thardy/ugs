import * as _ from 'lodash-es';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number
  sortOrder: number;
  created: string;
}

export class Product implements IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number
  sortOrder: number;
  created: string;

  constructor(options: {
    id?: number,
    name?: string,
    description?: string,
    price?: any,
    quantity?: any,
    sortOrder?: any,
    created?: string
  } = {}) {
    this.id = options.id;
    this.name = options.name;
    this.description = options.description || '';
    if (options.price) {
      this.price = _.isString(options.price) ? parseFloat(options.price) : options.price;
    }
    else {
      this.price = 0;
    }
    if (options.quantity) {
      this.quantity = _.isString(options.quantity) ? parseInt(options.quantity, 10) : options.quantity;
    }
    else {
      this.quantity = 0;
    }
    if (options.sortOrder) {
      this.sortOrder = _.isString(options.sortOrder) ? parseInt(options.sortOrder, 10) : options.sortOrder;
    }
    else {
      this.sortOrder = 10;
    }
    this.created = options.created;
  }
}

export function compareProducts(p1: IProduct, p2: IProduct) {
  const compare = p1.sortOrder - p2.sortOrder;

  if (compare > 0) {
    return 1;
  }
  else if ( compare < 0) {
    return -1;
  }
  else return 0;
}
