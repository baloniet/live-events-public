/* tslint:disable */

declare var Object: any;
export interface EventInterface {
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
}

export class Event implements EventInterface {
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
  constructor(instance?: EventInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Event`.
   */
  public static getModelName() {
    return "Event";
  }
}
