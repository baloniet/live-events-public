/* tslint:disable */

declare var Object: any;
export interface VPaddressInterface {
  id: number;
  personId?: number;
  communeId?: number;
  postId?: number;
  address: string;
  comname: string;
  postname: string;
  zipcode: number;
}

export class VPaddress implements VPaddressInterface {
  id: number;
  personId: number;
  communeId: number;
  postId: number;
  address: string;
  comname: string;
  postname: string;
  zipcode: number;
  constructor(data?: VPaddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VPaddress`.
   */
  public static getModelName() {
    return "VPaddress";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VPaddress for dynamic purposes.
  **/
  public static factory(data: VPaddressInterface): VPaddress{
    return new VPaddress(data);
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
      name: 'VPaddress',
      plural: 'VPaddresses',
      properties: {
        id: {
          name: 'id',
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
        postId: {
          name: 'postId',
          type: 'number'
        },
        address: {
          name: 'address',
          type: 'string'
        },
        comname: {
          name: 'comname',
          type: 'string'
        },
        postname: {
          name: 'postname',
          type: 'string'
        },
        zipcode: {
          name: 'zipcode',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
