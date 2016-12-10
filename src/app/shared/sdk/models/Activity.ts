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
  constructor(data?: ActivityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Activity`.
   */
  public static getModelName() {
    return "Activity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Activity for dynamic purposes.
  **/
  public static factory(data: ActivityInterface): Activity{
    return new Activity(data);
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
      name: 'Activity',
      plural: 'Activities',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        themeId: {
          name: 'themeId',
          type: 'number'
        },
      },
      relations: {
        aPers: {
          name: 'aPers',
          type: 'Array<APerson>',
          model: 'APerson'
        },
        people: {
          name: 'people',
          type: 'Array<Person>',
          model: 'Person'
        },
      }
    }
  }
}
