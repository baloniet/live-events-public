/* tslint:disable */

declare var Object: any;
export interface VStatRoomExtInterface {
  cnt: number;
  ack?: number;
  off?: number;
  year?: number;
  month?: number;
  sumtime?: string;
  roomId?: number;
}

export class VStatRoomExt implements VStatRoomExtInterface {
  cnt: number;
  ack: number;
  off: number;
  year: number;
  month: number;
  sumtime: string;
  roomId: number;
  constructor(data?: VStatRoomExtInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatRoomExt`.
   */
  public static getModelName() {
    return "VStatRoomExt";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VStatRoomExt for dynamic purposes.
  **/
  public static factory(data: VStatRoomExtInterface): VStatRoomExt{
    return new VStatRoomExt(data);
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
      name: 'VStatRoomExt',
      plural: 'VStatRoomExts',
      properties: {
        cnt: {
          name: 'cnt',
          type: 'number'
        },
        ack: {
          name: 'ack',
          type: 'number'
        },
        off: {
          name: 'off',
          type: 'number'
        },
        year: {
          name: 'year',
          type: 'number'
        },
        month: {
          name: 'month',
          type: 'number'
        },
        sumtime: {
          name: 'sumtime',
          type: 'string'
        },
        roomId: {
          name: 'roomId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
