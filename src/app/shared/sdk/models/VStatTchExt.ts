/* tslint:disable */

declare var Object: any;
export interface VStatTchExtInterface {
  cnt: number;
  year?: number;
  month?: number;
  sumtime?: string;
  ack?: number;
  off: number;
  personId: number;
}

export class VStatTchExt implements VStatTchExtInterface {
  cnt: number;
  year: number;
  month: number;
  sumtime: string;
  ack: number;
  off: number;
  personId: number;
  constructor(data?: VStatTchExtInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatTchExt`.
   */
  public static getModelName() {
    return "VStatTchExt";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VStatTchExt for dynamic purposes.
  **/
  public static factory(data: VStatTchExtInterface): VStatTchExt{
    return new VStatTchExt(data);
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
      name: 'VStatTchExt',
      plural: 'VStatTchExts',
      properties: {
        cnt: {
          name: 'cnt',
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
        ack: {
          name: 'ack',
          type: 'number'
        },
        off: {
          name: 'off',
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
