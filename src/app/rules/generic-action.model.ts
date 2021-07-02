export class GenericAction {
  name: string;
  properties: any;

  constructor(options: {
    name?: string,
    properties?: any,
  } = {}) {
    this.name = options.name;
    this.properties = options.properties || null;
  }
}
