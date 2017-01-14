/* tslint:disable */

declare var Object: any;
export interface VEpersonInterface {
  firstname: string;
  lastname: string;
  name?: string;
  personId: number;
}

export class VEperson implements VEpersonInterface {
  firstname: string;
  lastname: string;
  name: string;
  personId: number;
  constructor(data?: VEpersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VEperson`.
   */
  public static getModelName() {
    return "VEperson";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VEperson for dynamic purposes.
  **/
  public static factory(data: VEpersonInterface): VEperson{
    return new VEperson(data);
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
      name: 'VEperson',
      plural: 'VEpeople',
      properties: {
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
