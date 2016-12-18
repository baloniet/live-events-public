/* tslint:disable */

declare var Object: any;
export interface PCitiInterface {
  personId: number;
  citizenshipId: number;
  cdate?: Date;
  cips?: Array<any>;
}

export class PCiti implements PCitiInterface {
  personId: number;
  citizenshipId: number;
  cdate: Date;
  cips: Array<any>;
  constructor(data?: PCitiInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PCiti`.
   */
  public static getModelName() {
    return "PCiti";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PCiti for dynamic purposes.
  **/
  public static factory(data: PCitiInterface): PCiti{
    return new PCiti(data);
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
      name: 'PCiti',
      plural: 'PCitis',
      properties: {
        personId: {
          name: 'personId',
          type: 'number'
        },
        citizenshipId: {
          name: 'citizenshipId',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
      },
      relations: {
        cips: {
          name: 'cips',
          type: 'Array<any>',
          model: ''
        },
      }
    }
  }
}
