/* tslint:disable */

declare var Object: any;
export interface VMemberInterface {
  id: number;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  cdate?: Date;
  isteacher?: number;
  isvolunteer?: number;
  ismember?: number;
}

export class VMember implements VMemberInterface {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  cdate: Date;
  isteacher: number;
  isvolunteer: number;
  ismember: number;
  constructor(data?: VMemberInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMember`.
   */
  public static getModelName() {
    return "VMember";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VMember for dynamic purposes.
  **/
  public static factory(data: VMemberInterface): VMember{
    return new VMember(data);
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
      name: 'VMember',
      plural: 'VMembers',
      properties: {
        id: {
          name: 'id',
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
        birthdate: {
          name: 'birthdate',
          type: 'Date'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        isteacher: {
          name: 'isteacher',
          type: 'number'
        },
        isvolunteer: {
          name: 'isvolunteer',
          type: 'number'
        },
        ismember: {
          name: 'ismember',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
