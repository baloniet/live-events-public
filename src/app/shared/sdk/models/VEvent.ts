/* tslint:disable */

declare var Object: any;
export interface VEventInterface {
  id: number;
  name?: string;
  content?: string;
  roomId: number;
  cdate?: Date;
  starttime?: Date;
  endtime?: Date;
  isday?: number;
  activityId: number;
  meventId?: number;
  color?: string;
  cnt?: number;
}

export class VEvent implements VEventInterface {
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
  color: string;
  cnt: number;
  constructor(instance?: VEventInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VEvent`.
   */
  public static getModelName() {
    return "VEvent";
  }
}
