/* tslint:disable */

declare var Object: any;
export interface LeUserInterface {
  personId?: number;
  name: string;
  email: string;
  ldate?: Date;
  isadmin?: number;
  auth0Id: string;
  active?: number;
  cdate?: Date;
}

export class LeUser implements LeUserInterface {
  personId: number;
  name: string;
  email: string;
  ldate: Date;
  isadmin: number;
  auth0Id: string;
  active: number;
  cdate: Date;
  constructor(data?: LeUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `LeUser`.
   */
  public static getModelName() {
    return "LeUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of LeUser for dynamic purposes.
  **/
  public static factory(data: LeUserInterface): LeUser{
    return new LeUser(data);
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
      name: 'LeUser',
      plural: 'LeUsers',
      properties: {
        personId: {
          name: 'personId',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        ldate: {
          name: 'ldate',
          type: 'Date'
        },
        isadmin: {
          name: 'isadmin',
          type: 'number'
        },
        auth0Id: {
          name: 'auth0Id',
          type: 'string'
        },
        active: {
          name: 'active',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
