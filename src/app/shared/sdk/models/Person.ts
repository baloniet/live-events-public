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
  isrenter?: number;
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
  isrenter: number;
  edu: Array<PEdu>;
  phones: Array<PPhone>;
  emails: Array<PEmail>;
  citi: Array<PCiti>;
  addss: Array<PAddress>;
  constructor(data?: PersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Person`.
   */
  public static getModelName() {
    return "Person";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Person for dynamic purposes.
  **/
  public static factory(data: PersonInterface): Person{
    return new Person(data);
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
      name: 'Person',
      plural: 'People',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
        },
        birthdate: {
          name: 'birthdate',
          type: 'Date'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        isteacher: {
          name: 'isteacher',
          type: 'number'
        },
        isvolunteer: {
          name: 'isvolunteer',
          type: 'number'
        },
        ismember: {
          name: 'ismember',
          type: 'number'
        },
        isemployee: {
          name: 'isemployee',
          type: 'number'
        },
        isrenter: {
          name: 'isrenter',
          type: 'number'
        },
      },
      relations: {
        edu: {
          name: 'edu',
          type: 'Array<PEdu>',
          model: 'PEdu'
        },
        phones: {
          name: 'phones',
          type: 'Array<PPhone>',
          model: 'PPhone'
        },
        emails: {
          name: 'emails',
          type: 'Array<PEmail>',
          model: 'PEmail'
        },
        citi: {
          name: 'citi',
          type: 'Array<PCiti>',
          model: 'PCiti'
        },
        addss: {
          name: 'addss',
          type: 'Array<PAddress>',
          model: 'PAddress'
        },
      }
    }
  }
}
