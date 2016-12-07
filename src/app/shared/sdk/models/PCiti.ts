/* tslint:disable */
import {
  Citizenship
} from '../index';

declare var Object: any;
export interface PCitiInterface {
  personId: number;
  citizenshipId: number;
  cdate?: Date;
  cips?: Array<Citizenship>;
}

export class PCiti implements PCitiInterface {
  personId: number;
  citizenshipId: number;
  cdate: Date;
  cips: Array<Citizenship>;
  constructor(instance?: PCitiInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PCiti`.
   */
  public static getModelName() {
    return "PCiti";
  }
}
