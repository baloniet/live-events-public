/* tslint:disable */

declare var Object: any;
export interface TKindInterface {
  id: number;
  themeId: number;
  kindId: number;
}

export class TKind implements TKindInterface {
  id: number;
  themeId: number;
  kindId: number;
  constructor(data?: TKindInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TKind`.
   */
  public static getModelName() {
    return "TKind";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TKind for dynamic purposes.
  **/
  public static factory(data: TKindInterface): TKind{
    return new TKind(data);
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
      name: 'TKind',
      plural: 'TKinds',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        themeId: {
          name: 'themeId',
          type: 'number'
        },
        kindId: {
          name: 'kindId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
