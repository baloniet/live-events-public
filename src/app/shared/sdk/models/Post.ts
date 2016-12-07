/* tslint:disable */

declare var Object: any;
export interface PostInterface {
  id: number;
  name: string;
  zipcode: number;
}

export class Post implements PostInterface {
  id: number;
  name: string;
  zipcode: number;
  constructor(instance?: PostInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Post`.
   */
  public static getModelName() {
    return "Post";
  }
}
