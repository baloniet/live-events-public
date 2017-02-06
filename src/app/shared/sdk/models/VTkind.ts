/* tslint:disable */

declare var Object: any;
export interface VTkindInterface {
  themeId: number;
  kindId: number;
  plan: number;
  kindname: string;
  themename: string;
  year: number;
  partnerId: number;
}

export class VTkind implements VTkindInterface {
  themeId: number;
  kindId: number;
  plan: number;
  kindname: string;
  themename: string;
  year: number;
  partnerId: number;
  constructor(data?: VTkindInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VTkind`.
   */
  public static getModelName() {
    return "VTkind";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VTkind for dynamic purposes.
  **/
  public static factory(data: VTkindInterface): VTkind{
    return new VTkind(data);
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
      name: 'VTkind',
      plural: 'VTkinds',
      properties: {
        themeId: {
          name: 'themeId',
          type: 'number'
        },
        kindId: {
          name: 'kindId',
          type: 'number'
        },
        plan: {
          name: 'plan',
          type: 'number'
        },
        kindname: {
          name: 'kindname',
          type: 'string'
        },
        themename: {
          name: 'themename',
          type: 'string'
        },
        year: {
          name: 'year',
          type: 'number'
        },
        partnerId: {
          name: 'partnerId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
