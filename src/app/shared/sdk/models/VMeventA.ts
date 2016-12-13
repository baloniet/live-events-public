/* tslint:disable */

declare var Object: any;
export interface VMeventAInterface {
  id: number;
  epersonId: number;
  adate?: Date;
  cdate?: Date;
  odate?: Date;
  personId: number;
  firstname: string;
  lastname: string;
  personName?: string;
}

export class VMeventA implements VMeventAInterface {
  id: number;
  epersonId: number;
  adate: Date;
  cdate: Date;
  odate: Date;
  personId: number;
  firstname: string;
  lastname: string;
  personName: string;
  constructor(data?: VMeventAInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMeventA`.
   */
  public static getModelName() {
    return "VMeventA";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VMeventA for dynamic purposes.
  **/
  public static factory(data: VMeventAInterface): VMeventA{
    return new VMeventA(data);
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
      name: 'VMeventA',
      plural: 'VMeventa',
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
