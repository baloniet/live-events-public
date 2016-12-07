/* tslint:disable */

declare var Object: any;
export interface VMemberInterface {
  id: number;
  firstname: string;
  lastname: string;
  birthdate?: Date;
  cdate?: Date;
  isteacher?: number;
  isvolunteer?: number;
  ismember?: number;
}

export class VMember implements VMemberInterface {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  cdate: Date;
  isteacher: number;
  isvolunteer: number;
  ismember: number;
  constructor(instance?: VMemberInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VMember`.
   */
  public static getModelName() {
    return "VMember";
  }
}
