/* tslint:disable */

declare var Object: any;
export interface KindInterface {
  id: number;
  name: string;
}

export class Kind implements KindInterface {
  id: number;
  name: string;
  constructor(data?: KindInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Kind`.
   */
  public static getModelName() {
    return "Kind";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Kind for dynamic purposes.
  **/
  public static factory(data: KindInterface): Kind{
    return new Kind(data);
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
      name: 'Kind',
      plural: 'Kinds',
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
