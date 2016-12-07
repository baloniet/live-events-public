/* tslint:disable */

declare var Object: any;
export interface RoomInterface {
  id: number;
  name: string;
}

export class Room implements RoomInterface {
  id: number;
  name: string;
  constructor(instance?: RoomInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Room`.
   */
  public static getModelName() {
    return "Room";
  }
}
