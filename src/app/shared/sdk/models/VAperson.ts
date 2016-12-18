/* tslint:disable */

declare var Object: any;
export interface VApersonInterface {
  id: number;
  cdate?: Date;
  name: string;
  content?: string;
  themeId?: number;
  color: string;
  personId: number;
  isrented?: number;
}

export class VAperson implements VApersonInterface {
  id: number;
  cdate: Date;
  name: string;
  content: string;
  themeId: number;
  color: string;
  personId: number;
  isrented: number;
  constructor(data?: VApersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VAperson`.
   */
  public static getModelName() {
    return "VAperson";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VAperson for dynamic purposes.
  **/
  public static factory(data: VApersonInterface): VAperson{
    return new VAperson(data);
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
      name: 'VAperson',
      plural: 'VApeople',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        themeId: {
          name: 'themeId',
          type: 'number'
        },
        color: {
          name: 'color',
          type: 'string'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        isrented: {
          name: 'isrented',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
