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
  constructor(data?: APersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `APerson`.
   */
  public static getModelName() {
    return "APerson";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of APerson for dynamic purposes.
  **/
  public static factory(data: APersonInterface): APerson{
    return new APerson(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'APerson',
      plural: 'APeople',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        activityId: {
          name: 'activityId',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        isteacher: {
          name: 'isteacher',
          type: 'number'
        },
        isvolunteer: {
          name: 'isvolunteer',
          type: 'number'
        },
      },
      relations: {
        activity: {
          name: 'activity',
          type: 'Activity',
          model: 'Activity'
        },
        person: {
          name: 'person',
          type: 'Person',
          model: 'Person'
        },
      }
    }
  }
}
