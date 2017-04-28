/* tslint:disable */

declare var Object: any;
export interface SettingsInterface {
  id: number;
  name?: string;
  value?: string;
}

export class Settings implements SettingsInterface {
  id: number;
  name: string;
  value: string;
  constructor(data?: SettingsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Settings`.
   */
  public static getModelName() {
    return "Settings";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Settings for dynamic purposes.
  **/
  public static factory(data: SettingsInterface): Settings{
    return new Settings(data);
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
      name: 'Settings',
      plural: 'Settings',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        value: {
          name: 'value',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
