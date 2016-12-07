/* tslint:disable */

declare var Object: any;
export interface VMeventAInterface {
  id: number;
  personId: number;
  firstname: string;
  lastname: string;
  personName?: string;
}

export class VMeventA implements VMeventAInterface {
  id: number;
  personId: number;
  firstname: string;
  lastname: string;
  personName: string;
  constructor(instance?: VMeventAInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMeventA`.
   */
  public static getModelName() {
    return "VMeventA";
  }
}
