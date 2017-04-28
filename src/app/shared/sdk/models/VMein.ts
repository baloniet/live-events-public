/* tslint:disable */

declare var Object: any;
export interface VMeinInterface {
  notid: number;
  id: number;
  name?: string;
  content?: string;
  roomId?: number;
  cdate?: Date;
  starttime?: Date;
  endtime?: Date;
  isday?: number;
  activityId: number;
  meventId?: number;
  odate?: Date;
  adate?: Date;
  isacc?: number;
  isoff?: number;
  personId: number;
  cnt?: number;
}

export class VMein implements VMeinInterface {
  notid: number;
  id: number;
  name: string;
  content: string;
  roomId: number;
  cdate: Date;
  starttime: Date;
  endtime: Date;
  isday: number;
  activityId: number;
  meventId: number;
  odate: Date;
  adate: Date;
  isacc: number;
  isoff: number;
  personId: number;
  cnt: number;
  constructor(data?: VMeinInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMein`.
   */
  public static getModelName() {
    return "VMein";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VMein for dynamic purposes.
  **/
  public static factory(data: VMeinInterface): VMein{
    return new VMein(data);
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
      name: 'VMein',
      plural: 'VMeins',
      properties: {
        notid: {
          name: 'notid',
          type: 'number'
        },
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
        meventId: {
          name: 'meventId',
          type: 'number'
        },
        odate: {
          name: 'odate',
          type: 'Date'
        },
        adate: {
          name: 'adate',
          type: 'Date'
        },
        isacc: {
          name: 'isacc',
          type: 'number'
        },
        isoff: {
          name: 'isoff',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        cnt: {
          name: 'cnt',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
