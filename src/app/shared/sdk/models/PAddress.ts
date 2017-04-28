/* tslint:disable */

declare var Object: any;
export interface PAddressInterface {
  id: number;
  cdate?: Date;
  address: string;
  postId?: number;
  personId?: number;
  communeId?: number;
}

export class PAddress implements PAddressInterface {
  id: number;
  cdate: Date;
  address: string;
  postId: number;
  personId: number;
  communeId: number;
  constructor(data?: PAddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PAddress`.
   */
  public static getModelName() {
    return "PAddress";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PAddress for dynamic purposes.
  **/
  public static factory(data: PAddressInterface): PAddress{
    return new PAddress(data);
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
      name: 'PAddress',
      plural: 'PAddresses',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        address: {
          name: 'address',
          type: 'string'
        },
        postId: {
          name: 'postId',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        communeId: {
          name: 'communeId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
