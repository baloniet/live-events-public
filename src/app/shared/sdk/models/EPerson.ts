/* tslint:disable */

declare var Object: any;
export interface EPersonInterface {
  id: number;
  personId: number;
  eventId: number;
  cdate?: Date;
  odate?: Date;
  note?: string;
  adate?: Date;
}

export class EPerson implements EPersonInterface {
  id: number;
  personId: number;
  eventId: number;
  cdate: Date;
  odate: Date;
  note: string;
  adate: Date;
  constructor(instance?: EPersonInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EPerson`.
   */
  public static getModelName() {
    return "EPerson";
  }
}
