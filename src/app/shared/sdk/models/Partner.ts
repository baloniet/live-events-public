/* tslint:disable */

declare var Object: any;
export interface PartnerInterface {
  id: number;
  name: string;
  ismain?: number;
  short?: string;
  shortname?: string;
  content?: string;
  ispublic?: number;
}

export class Partner implements PartnerInterface {
  id: number;
  name: string;
  ismain: number;
  short: string;
  shortname: string;
  content: string;
  ispublic: number;
  constructor(data?: PartnerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Partner`.
   */
  public static getModelName() {
    return "Partner";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Partner for dynamic purposes.
  **/
  public static factory(data: PartnerInterface): Partner{
    return new Partner(data);
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
      name: 'Partner',
      plural: 'Partners',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        ismain: {
          name: 'ismain',
          type: 'number'
        },
        short: {
          name: 'short',
          type: 'string'
        },
        shortname: {
          name: 'shortname',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        ispublic: {
          name: 'ispublic',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
