/* tslint:disable */

declare var Object: any;
export interface VStatPlanInterface {
  themeId: number;
  kindId: number;
  plan: number;
  sumtime?: string;
  partnerId: number;
}

export class VStatPlan implements VStatPlanInterface {
  themeId: number;
  kindId: number;
  plan: number;
  sumtime: string;
  partnerId: number;
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
        plan: {
          name: 'plan',
          type: 'number'
        },
        sumtime: {
          name: 'sumtime',
          type: 'string'
        },
        partnerId: {
          name: 'partnerId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
