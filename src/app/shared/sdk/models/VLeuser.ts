/* tslint:disable */

declare var Object: any;
export interface VLeuserInterface {
  auth0Id: string;
  name: string;
  email: string;
  cdate: Date;
  active: number;
  ldate?: Date;
  firstname: string;
  lastname: string;
  isteacher?: number;
  isvolunteer?: number;
  ismember?: number;
  isemployee?: number;
  isrenter?: number;
  isuser?: number;
  isadmin?: number;
  id: number;
}

export class VLeuser implements VLeuserInterface {
  auth0Id: string;
  name: string;
  email: string;
  cdate: Date;
  active: number;
  ldate: Date;
  firstname: string;
  lastname: string;
  isteacher: number;
  isvolunteer: number;
  ismember: number;
  isemployee: number;
  isrenter: number;
  isuser: number;
  isadmin: number;
  id: number;
  constructor(data?: VLeuserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VLeuser`.
   */
  public static getModelName() {
    return "VLeuser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VLeuser for dynamic purposes.
  **/
  public static factory(data: VLeuserInterface): VLeuser{
    return new VLeuser(data);
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
      name: 'VLeuser',
      plural: 'VLeusers',
      properties: {
        auth0Id: {
          name: 'auth0Id',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        active: {
          name: 'active',
          type: 'number'
        },
        ldate: {
          name: 'ldate',
          type: 'Date'
        },
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
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
        isadmin: {
          name: 'isadmin',
          type: 'number'
        },
        id: {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
