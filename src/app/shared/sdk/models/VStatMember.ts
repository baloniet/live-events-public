/* tslint:disable */

declare var Object: any;
export interface VStatMemberInterface {
  cnt: number;
  locationId?: number;
  month?: number;
  year?: number;
  statementId: number;
}

export class VStatMember implements VStatMemberInterface {
  cnt: number;
  locationId: number;
  month: number;
  year: number;
  statementId: number;
  constructor(data?: VStatMemberInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatMember`.
   */
  public static getModelName() {
    return "VStatMember";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VStatMember for dynamic purposes.
  **/
  public static factory(data: VStatMemberInterface): VStatMember{
    return new VStatMember(data);
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
      name: 'VStatMember',
      plural: 'VStatMembers',
      properties: {
        cnt: {
          name: 'cnt',
          type: 'number'
        },
        locationId: {
          name: 'locationId',
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
        statementId: {
          name: 'statementId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
