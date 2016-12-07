/* tslint:disable */

declare var Object: any;
export interface StatementInterface {
  id: number;
  name: string;
  content?: string;
}

export class Statement implements StatementInterface {
  id: number;
  name: string;
  content: string;
  constructor(instance?: StatementInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Statement`.
   */
  public static getModelName() {
    return "Statement";
  }
}
