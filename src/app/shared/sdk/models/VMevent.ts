/* tslint:disable */

declare var Object: any;
export interface VMeventInterface {
  id: number;
  meventId?: number;
  name?: string;
  content?: string;
  roomId?: number;
  cdate?: Date;
  starttime?: Date;
  endtime?: Date;
  isday?: number;
  activityId: number;
  color?: string;
  personId: number;
}

export class VMevent implements VMeventInterface {
  id: number;
  meventId: number;
  name: string;
  content: string;
  roomId: number;
  cdate: Date;
  starttime: Date;
  endtime: Date;
  isday: number;
  activityId: number;
  color: string;
  personId: number;
  constructor(data?: VMeventInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMevent`.
   */
  public static getModelName() {
    return "VMevent";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VMevent for dynamic purposes.
  **/
  public static factory(data: VMeventInterface): VMevent{
    return new VMevent(data);
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
      name: 'VMevent',
      plural: 'VMevents',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        meventId: {
          name: 'meventId',
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
        roomId: {
          name: 'roomId',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
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
        activityId: {
          name: 'activityId',
          type: 'number'
        },
        color: {
          name: 'color',
          type: 'string'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}