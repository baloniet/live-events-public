/* tslint:disable */

declare var Object: any;
export interface VMeventEInterface {
  id: number;
  epersonId: number;
  adate?: Date;
  cdate?: Date;
  odate?: Date;
  personId: number;
  personName?: string;
  firstname?: string;
  lastname?: string;
}

export class VMeventE implements VMeventEInterface {
  id: number;
  epersonId: number;
  adate: Date;
  cdate: Date;
  odate: Date;
  personId: number;
  personName: string;
  firstname: string;
  lastname: string;
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
        epersonId: {
          name: 'epersonId',
          type: 'number'
        },
        adate: {
          name: 'adate',
          type: 'Date'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        odate: {
          name: 'odate',
          type: 'Date'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        personName: {
          name: 'personName',
          type: 'string'
        },
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
