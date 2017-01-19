/* tslint:disable */

declare var Object: any;
export interface PLocationInterface {
  id: number;
  locationId?: number;
  personId?: number;
  cdate?: Date;
}

export class PLocation implements PLocationInterface {
  id: number;
  locationId: number;
  personId: number;
  cdate: Date;
  constructor(data?: PLocationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PLocation`.
   */
  public static getModelName() {
    return "PLocation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PLocation for dynamic purposes.
  **/
  public static factory(data: PLocationInterface): PLocation{
    return new PLocation(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'PLocation',
      plural: 'PLocations',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        locationId: {
          name: 'locationId',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
