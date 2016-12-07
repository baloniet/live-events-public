/* tslint:disable */

declare var Object: any;
export interface VStatPerInterface {
  cntE: number;
  cntP: number;
  cntR: number;
}

export class VStatPer implements VStatPerInterface {
  cntE: number;
  cntP: number;
  cntR: number;
  constructor(instance?: VStatPerInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatPer`.
   */
  public static getModelName() {
    return "VStatPer";
  }
}
