/* tslint:disable */

declare var Object: any;
export interface VPlocationInterface {
  id: number;
  name: string;
  partname: string;
  short?: string;
  ismain?: number;
  personId?: number;
}

export class VPlocation implements VPlocationInterface {
  id: number;
  name: string;
  partname: string;
  short: string;
  ismain: number;
  personId: number;
  constructor(data?: VPlocationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VPlocation`.
   */
  public static getModelName() {
    return "VPlocation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VPlocation for dynamic purposes.
  **/
  public static factory(data: VPlocationInterface): VPlocation{
    return new VPlocation(data);
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
      name: 'VPlocation',
      plural: 'VPlocations',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        partname: {
          name: 'partname',
          type: 'string'
        },
        short: {
          name: 'short',
          type: 'string'
        },
        ismain: {
          name: 'ismain',
          type: 'number'
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
