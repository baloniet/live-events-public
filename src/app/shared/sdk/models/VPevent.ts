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
  constructor(instance?: VPeventInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VPevent`.
   */
  public static getModelName() {
    return "VPevent";
  }
}
