/* tslint:disable */

declare var Object: any;
export interface EducationInterface {
  id: number;
  name: string;
}

export class Education implements EducationInterface {
  id: number;
  name: string;
  constructor(instance?: EducationInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Education`.
   */
  public static getModelName() {
    return "Education";
  }
}
