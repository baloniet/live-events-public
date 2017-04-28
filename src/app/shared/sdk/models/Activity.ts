/* tslint:disable */
import {
  Person,
  APerson,
  ATemplate,
  Template
} from '../index';

declare var Object: any;
export interface ActivityInterface {
  id: number;
  cdate?: Date;
  name: string;
  content?: string;
  themeId?: number;
  isrented?: number;
  isother?: number;
  odate?: Date;
  adate?: Date;
  publish?: number;
  isacc?: number;
  isoff?: number;
  short?: string;
  projectId?: number;
  kindId?: number;
  typeId?: number;
  partnerId?: number;
  locationId?: number;
  comment?: string;
  max?: number;
  report?: string;
  people?: Array<Person>;
  aPers?: Array<APerson>;
  aTemps?: Array<ATemplate>;
  templates?: Array<Template>;
}

export class Activity implements ActivityInterface {
  id: number;
  cdate: Date;
  name: string;
  content: string;
  themeId: number;
  isrented: number;
  isother: number;
  odate: Date;
  adate: Date;
  publish: number;
  isacc: number;
  isoff: number;
  short: string;
  projectId: number;
  kindId: number;
  typeId: number;
  partnerId: number;
  locationId: number;
  comment: string;
  max: number;
  report: string;
  people: Array<Person>;
  aPers: Array<APerson>;
  aTemps: Array<ATemplate>;
  templates: Array<Template>;
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
        isrented: {
          name: 'isrented',
          type: 'number'
        },
        isother: {
          name: 'isother',
          type: 'number'
        },
        odate: {
          name: 'odate',
          type: 'Date'
        },
        adate: {
          name: 'adate',
          type: 'Date'
        },
        publish: {
          name: 'publish',
          type: 'number'
        },
        isacc: {
          name: 'isacc',
          type: 'number'
        },
        isoff: {
          name: 'isoff',
          type: 'number'
        },
        short: {
          name: 'short',
          type: 'string'
        },
        projectId: {
          name: 'projectId',
          type: 'number'
        },
        kindId: {
          name: 'kindId',
          type: 'number'
        },
        typeId: {
          name: 'typeId',
          type: 'number'
        },
        partnerId: {
          name: 'partnerId',
          type: 'number'
        },
        locationId: {
          name: 'locationId',
          type: 'number'
        },
        comment: {
          name: 'comment',
          type: 'string'
        },
        max: {
          name: 'max',
          type: 'number'
        },
        report: {
          name: 'report',
          type: 'string'
        },
      },
      relations: {
        people: {
          name: 'people',
          type: 'Array<Person>',
          model: 'Person'
        },
        aPers: {
          name: 'aPers',
          type: 'Array<APerson>',
          model: 'APerson'
        },
        aTemps: {
          name: 'aTemps',
          type: 'Array<ATemplate>',
          model: 'ATemplate'
        },
        templates: {
          name: 'templates',
          type: 'Array<Template>',
          model: 'Template'
        },
      }
    }
  }
}
