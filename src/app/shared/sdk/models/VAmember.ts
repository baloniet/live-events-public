/* tslint:disable */

declare var Object: any;
export interface VAmemberInterface {
  id: number;
  cdate?: Date;
  name: string;
  content?: string;
  themeId: number;
  color?: string;
  personId: number;
}

export class VAmember implements VAmemberInterface {
  id: number;
  cdate: Date;
  name: string;
  content: string;
  themeId: number;
  color: string;
  personId: number;
  constructor(instance?: VAmemberInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VAmember`.
   */
  public static getModelName() {
    return "VAmember";
  }
}
