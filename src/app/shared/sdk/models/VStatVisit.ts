/* tslint:disable */

declare var Object: any;
export interface VStatVisitInterface {
  cnt: number;
  statementId: number;
  month?: number;
  year?: number;
  locationId?: number;
}

export class VStatVisit implements VStatVisitInterface {
  cnt: number;
  statementId: number;
  month: number;
  year: number;
  locationId: number;
  constructor(data?: VStatVisitInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatVisit`.
   */
  public static getModelName() {
    return "VStatVisit";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VStatVisit for dynamic purposes.
  **/
  public static factory(data: VStatVisitInterface): VStatVisit{
    return new VStatVisit(data);
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
      name: 'VStatVisit',
      plural: 'VStatVisits',
      properties: {
        cnt: {
          name: 'cnt',
          type: 'number'
        },
        statementId: {
          name: 'statementId',
          type: 'number'
        },
        month: {
          name: 'month',
          type: 'number'
        },
        year: {
          name: 'year',
          type: 'number'
        },
        locationId: {
          name: 'locationId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
