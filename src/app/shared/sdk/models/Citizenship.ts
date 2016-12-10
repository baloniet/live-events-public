/* tslint:disable */

declare var Object: any;
export interface CitizenshipInterface {
  id: number;
  name: string;
}

export class Citizenship implements CitizenshipInterface {
  id: number;
  name: string;
  constructor(data?: CitizenshipInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Citizenship`.
   */
  public static getModelName() {
    return "Citizenship";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Citizenship for dynamic purposes.
  **/
  public static factory(data: CitizenshipInterface): Citizenship{
    return new Citizenship(data);
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
      name: 'Citizenship',
      plural: 'Citizenships',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
