/* tslint:disable */

declare var Object: any;
export interface PEmailInterface {
  personId: number;
  email?: string;
  cdate?: Date;
  emailtype: number;
}

export class PEmail implements PEmailInterface {
  personId: number;
  email: string;
  cdate: Date;
  emailtype: number;
  constructor(data?: PEmailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PEmail`.
   */
  public static getModelName() {
    return "PEmail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PEmail for dynamic purposes.
  **/
  public static factory(data: PEmailInterface): PEmail{
    return new PEmail(data);
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
      name: 'PEmail',
      plural: 'PEmails',
      properties: {
        personId: {
          name: 'personId',
          type: 'number'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        emailtype: {
          name: 'emailtype',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
