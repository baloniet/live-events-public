/* tslint:disable */

declare var Object: any;
export interface VActivityInterface {
  id: number;
  cdate?: Date;
  name: string;
  content?: string;
  themeId?: number;
  color: string;
  isrented?: number;
  isacc?: number;
  isoff?: number;
  cnt?: number;
  locationId?: number;
  isother?: number;
}

export class VActivity implements VActivityInterface {
  id: number;
  cdate: Date;
  name: string;
  content: string;
  themeId: number;
  color: string;
  isrented: number;
  isacc: number;
  isoff: number;
  cnt: number;
  locationId: number;
  isother: number;
  constructor(data?: VActivityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VActivity`.
   */
  public static getModelName() {
    return "VActivity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VActivity for dynamic purposes.
  **/
  public static factory(data: VActivityInterface): VActivity{
    return new VActivity(data);
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
      name: 'VActivity',
      plural: 'VActivities',
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
        isrented: {
          name: 'isrented',
          type: 'number'
        },
        isacc: {
          name: 'isacc',
          type: 'number'
        },
        isoff: {
          name: 'isoff',
          type: 'number'
        },
        cnt: {
          name: 'cnt',
          type: 'number'
        },
        locationId: {
          name: 'locationId',
          type: 'number'
        },
        isother: {
          name: 'isother',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
