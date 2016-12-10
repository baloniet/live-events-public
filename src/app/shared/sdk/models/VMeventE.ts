/* tslint:disable */

declare var Object: any;
export interface VMeventEInterface {
  id: number;
  personId: number;
  firstname: string;
  lastname: string;
  personName?: string;
}

export class VMeventE implements VMeventEInterface {
  id: number;
  personId: number;
  firstname: string;
  lastname: string;
  personName: string;
  constructor(data?: VMeventEInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMeventE`.
   */
  public static getModelName() {
    return "VMeventE";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VMeventE for dynamic purposes.
  **/
  public static factory(data: VMeventEInterface): VMeventE{
    return new VMeventE(data);
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
      name: 'VMeventE',
      plural: 'VMeventEs',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
        },
        personName: {
          name: 'personName',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
