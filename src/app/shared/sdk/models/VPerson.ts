/* tslint:disable */

declare var Object: any;
export interface VPersonInterface {
  id: number;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  isteacher?: number;
  isvolunteer?: number;
  ismember?: number;
  isemployee?: number;
  isrenter?: number;
  email?: string;
  number?: string;
  address?: string;
  zipcode?: number;
  name?: string;
  sex?: number;
}

export class VPerson implements VPersonInterface {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  isteacher: number;
  isvolunteer: number;
  ismember: number;
  isemployee: number;
  isrenter: number;
  email: string;
  number: string;
  address: string;
  zipcode: number;
  name: string;
  sex: number;
  constructor(data?: VPersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VPerson`.
   */
  public static getModelName() {
    return "VPerson";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VPerson for dynamic purposes.
  **/
  public static factory(data: VPersonInterface): VPerson{
    return new VPerson(data);
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
      name: 'VPerson',
      plural: 'VPeople',
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
        email: {
          name: 'email',
          type: 'string'
        },
        number: {
          name: 'number',
          type: 'string'
        },
        address: {
          name: 'address',
          type: 'string'
        },
        zipcode: {
          name: 'zipcode',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        sex: {
          name: 'sex',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
