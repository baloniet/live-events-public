/* tslint:disable */

declare var Object: any;
export interface PAddressInterface {
  id: number;
  cdate?: Date;
  address: string;
  postId?: number;
  personId?: number;
  communeId?: number;
}

export class PAddress implements PAddressInterface {
  id: number;
  cdate: Date;
  address: string;
  postId: number;
  personId: number;
  communeId: number;
  constructor(instance?: PAddressInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PAddress`.
   */
  public static getModelName() {
    return "PAddress";
  }
}
