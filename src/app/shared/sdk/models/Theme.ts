/* tslint:disable */

declare var Object: any;
export interface ThemeInterface {
  id: number;
  name: string;
  color?: string;
}

export class Theme implements ThemeInterface {
  id: number;
  name: string;
  color: string;
  constructor(data?: ThemeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Theme`.
   */
  public static getModelName() {
    return "Theme";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Theme for dynamic purposes.
  **/
  public static factory(data: ThemeInterface): Theme{
    return new Theme(data);
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
      name: 'Theme',
      plural: 'Themes',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        color: {
          name: 'color',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
