/* tslint:disable */

declare var Object: any;
export interface ErrorsInterface {
  id: number;
  gui?: string;
  msg: string;
  companyId?: number;
  cdate?: Date;
  fdate?: Date;
  response?: string;
}

export class Errors implements ErrorsInterface {
  id: number;
  gui: string;
  msg: string;
  companyId: number;
  cdate: Date;
  fdate: Date;
  response: string;
  constructor(data?: ErrorsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Errors`.
   */
  public static getModelName() {
    return "Errors";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Errors for dynamic purposes.
  **/
  public static factory(data: ErrorsInterface): Errors{
    return new Errors(data);
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
      name: 'Errors',
      plural: 'Errors',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        gui: {
          name: 'gui',
          type: 'string'
        },
        msg: {
          name: 'msg',
          type: 'string'
        },
        companyId: {
          name: 'companyId',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        fdate: {
          name: 'fdate',
          type: 'Date'
        },
        response: {
          name: 'response',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
