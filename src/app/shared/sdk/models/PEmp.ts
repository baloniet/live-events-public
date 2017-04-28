/* tslint:disable */

declare var Object: any;
export interface PEmpInterface {
  id: number;
  personId: number;
  employmentId: number;
  cdate?: Date;
  emptype: number;
  employment?: Array<any>;
}

export class PEmp implements PEmpInterface {
  id: number;
  personId: number;
  employmentId: number;
  cdate: Date;
  emptype: number;
  employment: Array<any>;
  constructor(data?: PEmpInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PEmp`.
   */
  public static getModelName() {
    return "PEmp";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PEmp for dynamic purposes.
  **/
  public static factory(data: PEmpInterface): PEmp{
    return new PEmp(data);
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
      name: 'PEmp',
      plural: 'PEmps',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        employmentId: {
          name: 'employmentId',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        emptype: {
          name: 'emptype',
          type: 'number'
        },
      },
      relations: {
        employment: {
          name: 'employment',
          type: 'Array<any>',
          model: ''
        },
      }
    }
  }
}
