/* tslint:disable */

declare var Object: any;
export interface VReportInterface {
  id: number;
  name?: string;
  content?: string;
  starttime?: Date;
  endtime?: Date;
  isday?: number;
  aname: string;
  acontent?: string;
  ashort?: string;
  activityId: number;
  templateId: number;
}

export class VReport implements VReportInterface {
  id: number;
  name: string;
  content: string;
  starttime: Date;
  endtime: Date;
  isday: number;
  aname: string;
  acontent: string;
  ashort: string;
  activityId: number;
  templateId: number;
  constructor(data?: VReportInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VReport`.
   */
  public static getModelName() {
    return "VReport";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VReport for dynamic purposes.
  **/
  public static factory(data: VReportInterface): VReport{
    return new VReport(data);
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
      name: 'VReport',
      plural: 'VReports',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        starttime: {
          name: 'starttime',
          type: 'Date'
        },
        endtime: {
          name: 'endtime',
          type: 'Date'
        },
        isday: {
          name: 'isday',
          type: 'number'
        },
        aname: {
          name: 'aname',
          type: 'string'
        },
        acontent: {
          name: 'acontent',
          type: 'string'
        },
        ashort: {
          name: 'ashort',
          type: 'string'
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
      }
    }
  }
}
