/* tslint:disable */

declare var Object: any;
export interface VAmemberInterface {
  id: number;
  cdate?: Date;
  name: string;
  content?: string;
  themeId?: number;
  color: string;
  personId: number;
  isrented?: number;
  locationId?: number;
  firstname: string;
  lastname: string;
  mnum?: string;
}

export class VAmember implements VAmemberInterface {
  id: number;
  cdate: Date;
  name: string;
  content: string;
  themeId: number;
  color: string;
  personId: number;
  isrented: number;
  locationId: number;
  firstname: string;
  lastname: string;
  mnum: string;
  constructor(data?: VAmemberInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VAmember`.
   */
  public static getModelName() {
    return "VAmember";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VAmember for dynamic purposes.
  **/
  public static factory(data: VAmemberInterface): VAmember{
    return new VAmember(data);
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
      name: 'VAmember',
      plural: 'VAmembers',
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
        locationId: {
          name: 'locationId',
          type: 'number'
        },
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
        },
        mnum: {
          name: 'mnum',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
