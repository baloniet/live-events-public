/* tslint:disable */
import {
  Activity,
  Person
} from '../index';

declare var Object: any;
export interface APersonInterface {
  id: number;
  cdate?: Date;
  activityId: number;
  personId: number;
  isteacher?: number;
  isvolunteer?: number;
  activity?: Activity;
  person?: Person;
}

export class APerson implements APersonInterface {
  id: number;
  cdate: Date;
  activityId: number;
  personId: number;
  isteacher: number;
  isvolunteer: number;
  activity: Activity;
  person: Person;
  constructor(instance?: APersonInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `APerson`.
   */
  public static getModelName() {
    return "APerson";
  }
}
