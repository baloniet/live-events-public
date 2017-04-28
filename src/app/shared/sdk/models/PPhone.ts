/* tslint:disable */

declare var Object: any;
export interface PPhoneInterface {
  personId: number;
  number?: string;
  cdate?: Date;
  numbertype: number;
}

export class PPhone implements PPhoneInterface {
  personId: number;
  number: string;
  cdate: Date;
  numbertype: number;
  constructor(data?: PPhoneInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PPhone`.
   */
  public static getModelName() {
    return "PPhone";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PPhone for dynamic purposes.
  **/
  public static factory(data: PPhoneInterface): PPhone{
    return new PPhone(data);
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
      name: 'PPhone',
      plural: 'PPhones',
      properties: {
        personId: {
          name: 'personId',
          type: 'number'
        },
        number: {
          name: 'number',
          type: 'string'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        numbertype: {
          name: 'numbertype',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
