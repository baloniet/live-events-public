/* tslint:disable */

declare var Object: any;
export interface VStatPlanInterface {
  themeId: number;
  kindId: number;
  partnerId: number;
  plan: number;
  year: number;
  sumtime?: string;
  sumtimeshort?: string;
  themename: string;
  color?: string;
  kindname: string;
  id: number;
}

export class VStatPlan implements VStatPlanInterface {
  themeId: number;
  kindId: number;
  partnerId: number;
  plan: number;
  year: number;
  sumtime: string;
  sumtimeshort: string;
  themename: string;
  color: string;
  kindname: string;
  id: number;
  constructor(data?: VStatPlanInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VStatPlan`.
   */
  public static getModelName() {
    return "VStatPlan";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VStatPlan for dynamic purposes.
  **/
  public static factory(data: VStatPlanInterface): VStatPlan{
    return new VStatPlan(data);
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
      name: 'VStatPlan',
      plural: 'VStatPlans',
      properties: {
        themeId: {
          name: 'themeId',
          type: 'number'
        },
        kindId: {
          name: 'kindId',
          type: 'number'
        },
        partnerId: {
          name: 'partnerId',
          type: 'number'
        },
        plan: {
          name: 'plan',
          type: 'number'
        },
        year: {
          name: 'year',
          type: 'number'
        },
        sumtime: {
          name: 'sumtime',
          type: 'string'
        },
        sumtimeshort: {
          name: 'sumtimeshort',
          type: 'string'
        },
        themename: {
          name: 'themename',
          type: 'string'
        },
        color: {
          name: 'color',
          type: 'string'
        },
        kindname: {
          name: 'kindname',
          type: 'string'
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
