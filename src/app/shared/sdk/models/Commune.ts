/* tslint:disable */

declare var Object: any;
export interface CommuneInterface {
  id: number;
  name: string;
}

export class Commune implements CommuneInterface {
  id: number;
  name: string;
  constructor(data?: CommuneInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Commune`.
   */
  public static getModelName() {
    return "Commune";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Commune for dynamic purposes.
  **/
  public static factory(data: CommuneInterface): Commune{
    return new Commune(data);
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
      name: 'Commune',
      plural: 'Communes',
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
