/* tslint:disable */

declare var Object: any;
export interface TypeInterface {
  id: number;
  name: string;
  partnerId: number;
}

export class Type implements TypeInterface {
  id: number;
  name: string;
  partnerId: number;
  constructor(data?: TypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Type`.
   */
  public static getModelName() {
    return "Type";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Type for dynamic purposes.
  **/
  public static factory(data: TypeInterface): Type{
    return new Type(data);
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
      name: 'Type',
      plural: 'Types',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
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
