/* tslint:disable */

declare var Object: any;
export interface ErrorsInterface {
  id: number;
  gui?: string;
  msg: string;
  companyId?: number;
  cdate?: Date;
  fdate?: Date;
  response?: string;
}

export class Errors implements ErrorsInterface {
  id: number;
  gui: string;
  msg: string;
  companyId: number;
  cdate: Date;
  fdate: Date;
  response: string;
  constructor(instance?: ErrorsInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Errors`.
   */
  public static getModelName() {
    return "Errors";
  }
}
