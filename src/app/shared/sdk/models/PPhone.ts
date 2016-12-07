/* tslint:disable */

declare var Object: any;
export interface PPhoneInterface {
  personId: number;
  number?: string;
  cdate?: Date;
  numbertype: number;
}

export class PPhone implements PPhoneInterface {
  personId: number;
  number: string;
  cdate: Date;
  numbertype: number;
  constructor(instance?: PPhoneInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PPhone`.
   */
  public static getModelName() {
    return "PPhone";
  }
}
