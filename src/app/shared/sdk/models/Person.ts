/* tslint:disable */
import {
  PPhone,
  PEmail,
  PCiti,
  PStat,
  Statement,
  PEmp,
  PEdu,
  VPaddress
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
  isuser?: number;
  sex?: number;
  mpersonId?: number;
  phones?: Array<PPhone>;
  emails?: Array<PEmail>;
  citi?: Array<PCiti>;
  stats?: Array<PStat>;
  statements?: Array<Statement>;
  emp?: Array<PEmp>;
  edu?: Array<PEdu>;
  addss?: Array<VPaddress>;
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
  isuser: number;
  sex: number;
  mpersonId: number;
  phones: Array<PPhone>;
  emails: Array<PEmail>;
  citi: Array<PCiti>;
  stats: Array<PStat>;
  statements: Array<Statement>;
  emp: Array<PEmp>;
  edu: Array<PEdu>;
  addss: Array<VPaddress>;
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
        isuser: {
          name: 'isuser',
          type: 'number'
        },
        sex: {
          name: 'sex',
          type: 'number'
        },
        mpersonId: {
          name: 'mpersonId',
          type: 'number'
        },
      },
      relations: {
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
        stats: {
          name: 'stats',
          type: 'Array<PStat>',
          model: 'PStat'
        },
        statements: {
          name: 'statements',
          type: 'Array<Statement>',
          model: 'Statement'
        },
        emp: {
          name: 'emp',
          type: 'Array<PEmp>',
          model: 'PEmp'
        },
        edu: {
          name: 'edu',
          type: 'Array<PEdu>',
          model: 'PEdu'
        },
        addss: {
          name: 'addss',
          type: 'Array<VPaddress>',
          model: 'VPaddress'
        },
      }
    }
  }
}
