/* tslint:disable */

declare var Object: any;
export interface VStatPerExtInterface {
  cnt: number;
  sumtime?: string;
  off: number;
  ack: number;
  year?: number;
  month?: number;
  personId: number;
}

export class VStatPerExt implements VStatPerExtInterface {
  cnt: number;
  sumtime: string;
  off: number;
  ack: number;
  year: number;
  month: number;
  personId: number;
  constructor(data?: VStatPerExtInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatPerExt`.
   */
  public static getModelName() {
    return "VStatPerExt";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VStatPerExt for dynamic purposes.
  **/
  public static factory(data: VStatPerExtInterface): VStatPerExt{
    return new VStatPerExt(data);
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
      name: 'VStatPerExt',
      plural: 'VStatPerExts',
      properties: {
        cnt: {
          name: 'cnt',
          type: 'number'
        },
        sumtime: {
          name: 'sumtime',
          type: 'string'
        },
        off: {
          name: 'off',
          type: 'number'
        },
        ack: {
          name: 'ack',
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
