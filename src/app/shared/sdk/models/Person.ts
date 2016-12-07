/* tslint:disable */
import {
  PEdu,
  PPhone,
  PEmail,
  PCiti,
  PAddress
} from '../index';

declare var Object: any;
export interface PersonInterface {
  id: number;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  cdate?: Date;
  isteacher?: number;
  isvolunteer?: number;
  ismember?: number;
  isemployee?: number;
  edu?: Array<PEdu>;
  phones?: Array<PPhone>;
  emails?: Array<PEmail>;
  citi?: Array<PCiti>;
  addss?: Array<PAddress>;
}

export class Person implements PersonInterface {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  cdate: Date;
  isteacher: number;
  isvolunteer: number;
  ismember: number;
  isemployee: number;
  edu: Array<PEdu>;
  phones: Array<PPhone>;
  emails: Array<PEmail>;
  citi: Array<PCiti>;
  addss: Array<PAddress>;
  constructor(instance?: PersonInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Person`.
   */
  public static getModelName() {
    return "Person";
  }
}
