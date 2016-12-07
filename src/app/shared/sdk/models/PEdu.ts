/* tslint:disable */
import {
  Education
} from '../index';

declare var Object: any;
export interface PEduInterface {
  personId: number;
  educationId: number;
  cdate?: Date;
  education?: Array<Education>;
}

export class PEdu implements PEduInterface {
  personId: number;
  educationId: number;
  cdate: Date;
  education: Array<Education>;
  constructor(instance?: PEduInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PEdu`.
   */
  public static getModelName() {
    return "PEdu";
  }
}
