/* tslint:disable */

declare var Object: any;
export interface PEmailInterface {
  personId: number;
  email?: string;
  cdate?: Date;
  emailtype: number;
}

export class PEmail implements PEmailInterface {
  personId: number;
  email: string;
  cdate: Date;
  emailtype: number;
  constructor(instance?: PEmailInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PEmail`.
   */
  public static getModelName() {
    return "PEmail";
  }
}
