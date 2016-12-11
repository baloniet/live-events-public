/* tslint:disable */
import {
  Statement
} from '../index';

declare var Object: any;
export interface PStatInterface {
  id: number;
  personId: number;
  statementId: number;
  cdate?: Date;
  statements?: Array<Statement>;
}

export class PStat implements PStatInterface {
  id: number;
  personId: number;
  statementId: number;
  cdate: Date;
  statements: Array<Statement>;
  constructor(data?: PStatInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PStat`.
   */
  public static getModelName() {
    return "PStat";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PStat for dynamic purposes.
  **/
  public static factory(data: PStatInterface): PStat{
    return new PStat(data);
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
      name: 'PStat',
      plural: 'PStats',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        statementId: {
          name: 'statementId',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
      },
      relations: {
        statements: {
          name: 'statements',
          type: 'Array<Statement>',
          model: 'Statement'
        },
      }
    }
  }
}