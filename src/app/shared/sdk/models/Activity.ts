/* tslint:disable */
import {
  APerson,
  Person
} from '../index';

declare var Object: any;
export interface ActivityInterface {
  id: number;
  cdate?: Date;
  name: string;
  content?: string;
  themeId?: number;
  aPers?: Array<APerson>;
  people?: Array<Person>;
}

export class Activity implements ActivityInterface {
  id: number;
  cdate: Date;
  name: string;
  content: string;
  themeId: number;
  aPers: Array<APerson>;
  people: Array<Person>;
  constructor(instance?: ActivityInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Activity`.
   */
  public static getModelName() {
    return "Activity";
  }
}
