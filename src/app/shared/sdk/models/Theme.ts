/* tslint:disable */

declare var Object: any;
export interface ThemeInterface {
  id: number;
  name: string;
  color?: string;
}

export class Theme implements ThemeInterface {
  id: number;
  name: string;
  color: string;
  constructor(instance?: ThemeInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Theme`.
   */
  public static getModelName() {
    return "Theme";
  }
}
