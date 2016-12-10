/* tslint:disable */

declare var Object: any;
export interface StatementInterface {
  id: number;
  name: string;
  content?: string;
}

export class Statement implements StatementInterface {
  id: number;
  name: string;
  content: string;
  constructor(data?: StatementInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Statement`.
   */
  public static getModelName() {
    return "Statement";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Statement for dynamic purposes.
  **/
  public static factory(data: StatementInterface): Statement{
    return new Statement(data);
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
      name: 'Statement',
      plural: 'Statements',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
