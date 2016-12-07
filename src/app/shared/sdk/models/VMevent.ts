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
  constructor(instance?: VMeventInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMevent`.
   */
  public static getModelName() {
    return "VMevent";
  }
}
