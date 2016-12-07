/* tslint:disable */

declare var Object: any;
export interface CommuneInterface {
  id: number;
  name: string;
}

export class Commune implements CommuneInterface {
  id: number;
  name: string;
  constructor(instance?: CommuneInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Commune`.
   */
  public static getModelName() {
    return "Commune";
  }
}
