/* tslint:disable */

declare var Object: any;
export interface VActivityInterface {
  id: number;
  cdate?: Date;
  name: string;
  content?: string;
  themeId: number;
  color?: string;
}

export class VActivity implements VActivityInterface {
  id: number;
  cdate: Date;
  name: string;
  content: string;
  themeId: number;
  color: string;
  constructor(instance?: VActivityInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VActivity`.
   */
  public static getModelName() {
    return "VActivity";
  }
}
