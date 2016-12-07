/* tslint:disable */

declare var Object: any;
export interface VApersonInterface {
  id: number;
  cdate?: Date;
  name: string;
  content?: string;
  themeId: number;
  color?: string;
  personId: number;
}

export class VAperson implements VApersonInterface {
  id: number;
  cdate: Date;
  name: string;
  content: string;
  themeId: number;
  color: string;
  personId: number;
  constructor(instance?: VApersonInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VAperson`.
   */
  public static getModelName() {
    return "VAperson";
  }
}
