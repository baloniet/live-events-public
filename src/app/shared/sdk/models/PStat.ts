/* tslint:disable */
import {
  Statement
} from '../index';

declare var Object: any;
export interface PStatInterface {
  id: number;
  personId: number;
  statementId: number;
  cdate?: Date;
  statements?: Array<Statement>;
}

export class PStat implements PStatInterface {
  id: number;
  personId: number;
  statementId: number;
  cdate: Date;
  statements: Array<Statement>;
  constructor(instance?: PStatInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PStat`.
   */
  public static getModelName() {
    return "PStat";
  }
}
