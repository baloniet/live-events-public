/* tslint:disable */

declare var Object: any;
export interface CitizenshipInterface {
  id: number;
  name: string;
}

export class Citizenship implements CitizenshipInterface {
  id: number;
  name: string;
  constructor(instance?: CitizenshipInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Citizenship`.
   */
  public static getModelName() {
    return "Citizenship";
  }
}
