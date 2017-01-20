/* tslint:disable */

declare var Object: any;
export interface VRoomInterface {
  id: number;
  name: string;
  onchart?: number;
  locname: string;
  partname: string;
  partnerId: number;
  locationId: number;
}

export class VRoom implements VRoomInterface {
  id: number;
  name: string;
  onchart: number;
  locname: string;
  partname: string;
  partnerId: number;
  locationId: number;
  constructor(data?: VRoomInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VRoom`.
   */
  public static getModelName() {
    return "VRoom";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VRoom for dynamic purposes.
  **/
  public static factory(data: VRoomInterface): VRoom{
    return new VRoom(data);
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
      name: 'VRoom',
      plural: 'VRooms',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        onchart: {
          name: 'onchart',
          type: 'number'
        },
        locname: {
          name: 'locname',
          type: 'string'
        },
        partname: {
          name: 'partname',
          type: 'string'
        },
        partnerId: {
          name: 'partnerId',
          type: 'number'
        },
        locationId: {
          name: 'locationId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
