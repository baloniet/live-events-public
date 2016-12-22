/* tslint:disable */

declare var Object: any;
export interface VPeventInterface {
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
  isoff?: number;
  isacc?: number;
  adate?: Date;
  odate?: Date;
}

export class VPevent implements VPeventInterface {
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
  isoff: number;
  isacc: number;
  adate: Date;
  odate: Date;
  constructor(data?: VPeventInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VPevent`.
   */
  public static getModelName() {
    return "VPevent";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VPevent for dynamic purposes.
  **/
  public static factory(data: VPeventInterface): VPevent{
    return new VPevent(data);
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
      name: 'VPevent',
      plural: 'VPevents',
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
        isoff: {
          name: 'isoff',
          type: 'number'
        },
        isacc: {
          name: 'isacc',
          type: 'number'
        },
        adate: {
          name: 'adate',
          type: 'Date'
        },
        odate: {
          name: 'odate',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
