/* tslint:disable */

declare var Object: any;
export interface EmploymentInterface {
  id: number;
  name?: string;
}

export class Employment implements EmploymentInterface {
  id: number;
  name: string;
  constructor(data?: EmploymentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Employment`.
   */
  public static getModelName() {
    return "Employment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Employment for dynamic purposes.
  **/
  public static factory(data: EmploymentInterface): Employment{
    return new Employment(data);
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
      name: 'Employment',
      plural: 'Employments',
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
