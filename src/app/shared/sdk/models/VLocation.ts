/* tslint:disable */

declare var Object: any;
export interface VLocationInterface {
  id: number;
  name: string;
  partnerId: number;
  pname: string;
  ismain?: number;
  short?: string;
  address?: string;
}

export class VLocation implements VLocationInterface {
  id: number;
  name: string;
  partnerId: number;
  pname: string;
  ismain: number;
  short: string;
  address: string;
  constructor(data?: VLocationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VLocation`.
   */
  public static getModelName() {
    return "VLocation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VLocation for dynamic purposes.
  **/
  public static factory(data: VLocationInterface): VLocation{
    return new VLocation(data);
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
      name: 'VLocation',
      plural: 'VLocations',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        partnerId: {
          name: 'partnerId',
          type: 'number'
        },
        pname: {
          name: 'pname',
          type: 'string'
        },
        ismain: {
          name: 'ismain',
          type: 'number'
        },
        short: {
          name: 'short',
          type: 'string'
        },
        address: {
          name: 'address',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
