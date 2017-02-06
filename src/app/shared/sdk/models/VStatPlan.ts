/* tslint:disable */

declare var Object: any;
export interface VStatPlanInterface {
  themeId: number;
  partnerId: number;
  plan: number;
  year: number;
  sumtime?: string;
  themename: string;
  color?: string;
  kindname: string;
  kindId: number;
}

export class VStatPlan implements VStatPlanInterface {
  themeId: number;
  partnerId: number;
  plan: number;
  year: number;
  sumtime: string;
  themename: string;
  color: string;
  kindname: string;
  kindId: number;
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
        kindId: {
          name: 'kindId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
