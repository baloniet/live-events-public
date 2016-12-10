/* tslint:disable */

declare var Object: any;
export interface VStatPerInterface {
  cntE: number;
  cntP: number;
  cntR: number;
}

export class VStatPer implements VStatPerInterface {
  cntE: number;
  cntP: number;
  cntR: number;
  constructor(data?: VStatPerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatPer`.
   */
  public static getModelName() {
    return "VStatPer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VStatPer for dynamic purposes.
  **/
  public static factory(data: VStatPerInterface): VStatPer{
    return new VStatPer(data);
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
      name: 'VStatPer',
      plural: 'VStatPers',
      properties: {
        cntE: {
          name: 'cntE',
          type: 'number'
        },
        cntP: {
          name: 'cntP',
          type: 'number'
        },
        cntR: {
          name: 'cntR',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
