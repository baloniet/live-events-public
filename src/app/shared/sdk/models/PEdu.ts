/* tslint:disable */
import {
  Education
} from '../index';

declare var Object: any;
export interface PEduInterface {
  personId: number;
  educationId: number;
  cdate?: Date;
  education?: Array<Education>;
}

export class PEdu implements PEduInterface {
  personId: number;
  educationId: number;
  cdate: Date;
  education: Array<Education>;
  constructor(data?: PEduInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PEdu`.
   */
  public static getModelName() {
    return "PEdu";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PEdu for dynamic purposes.
  **/
  public static factory(data: PEduInterface): PEdu{
    return new PEdu(data);
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
      name: 'PEdu',
      plural: 'PEdus',
      properties: {
        personId: {
          name: 'personId',
          type: 'number'
        },
        educationId: {
          name: 'educationId',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
      },
      relations: {
        education: {
          name: 'education',
          type: 'Array<Education>',
          model: 'Education'
        },
      }
    }
  }
}
