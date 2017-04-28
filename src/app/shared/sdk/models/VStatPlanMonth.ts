/* tslint:disable */

declare var Object: any;
export interface VStatPlanMonthInterface {
  sumtime?: string;
  month?: number;
  themeId: number;
  kindId: number;
  year: number;
  partnerId: number;
  id: number;
}

export class VStatPlanMonth implements VStatPlanMonthInterface {
  sumtime: string;
  month: number;
  themeId: number;
  kindId: number;
  year: number;
  partnerId: number;
  id: number;
  constructor(data?: VStatPlanMonthInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatPlanMonth`.
   */
  public static getModelName() {
    return "VStatPlanMonth";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VStatPlanMonth for dynamic purposes.
  **/
  public static factory(data: VStatPlanMonthInterface): VStatPlanMonth{
    return new VStatPlanMonth(data);
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
      name: 'VStatPlanMonth',
      plural: 'VStatPlanMonths',
      properties: {
        sumtime: {
          name: 'sumtime',
          type: 'string'
        },
        month: {
          name: 'month',
          type: 'number'
        },
        themeId: {
          name: 'themeId',
          type: 'number'
        },
        kindId: {
          name: 'kindId',
          type: 'number'
        },
        year: {
          name: 'year',
          type: 'number'
        },
        partnerId: {
          name: 'partnerId',
          type: 'number'
        },
        id: {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
