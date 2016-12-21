/* tslint:disable */

declare var Object: any;
export interface ATemplateInterface {
  id: number;
  activityId: number;
  templateId: number;
  template?: any;
  activity?: any;
}

export class ATemplate implements ATemplateInterface {
  id: number;
  activityId: number;
  templateId: number;
  template: any;
  activity: any;
  constructor(data?: ATemplateInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ATemplate`.
   */
  public static getModelName() {
    return "ATemplate";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ATemplate for dynamic purposes.
  **/
  public static factory(data: ATemplateInterface): ATemplate{
    return new ATemplate(data);
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
      name: 'ATemplate',
      plural: 'ATemplates',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        activityId: {
          name: 'activityId',
          type: 'number'
        },
        templateId: {
          name: 'templateId',
          type: 'number'
        },
      },
      relations: {
        template: {
          name: 'template',
          type: 'any',
          model: ''
        },
        activity: {
          name: 'activity',
          type: 'any',
          model: ''
        },
      }
    }
  }
}
