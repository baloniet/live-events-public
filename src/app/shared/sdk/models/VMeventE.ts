/* tslint:disable */

declare var Object: any;
export interface VMeventEInterface {
  id: number;
  personId: number;
  firstname: string;
  lastname: string;
  personName?: string;
}

export class VMeventE implements VMeventEInterface {
  id: number;
  personId: number;
  firstname: string;
  lastname: string;
  personName: string;
  constructor(instance?: VMeventEInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMeventE`.
   */
  public static getModelName() {
    return "VMeventE";
  }
}
