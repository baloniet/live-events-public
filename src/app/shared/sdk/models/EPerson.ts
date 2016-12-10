/* tslint:disable */

declare var Object: any;
export interface EPersonInterface {
  id: number;
  personId: number;
  eventId: number;
  cdate?: Date;
  odate?: Date;
  note?: string;
  adate?: Date;
}

export class EPerson implements EPersonInterface {
  id: number;
  personId: number;
  eventId: number;
  cdate: Date;
  odate: Date;
  note: string;
  adate: Date;
  constructor(data?: EPersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EPerson`.
   */
  public static getModelName() {
    return "EPerson";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EPerson for dynamic purposes.
  **/
  public static factory(data: EPersonInterface): EPerson{
    return new EPerson(data);
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
      name: 'EPerson',
      plural: 'EPeople',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
        eventId: {
          name: 'eventId',
          type: 'number'
        },
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        odate: {
          name: 'odate',
          type: 'Date'
        },
        note: {
          name: 'note',
          type: 'string'
        },
        adate: {
          name: 'adate',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
