/* tslint:disable */

declare var Object: any;
export interface VFeventTInterface {
  id: number;
  starttime?: Date;
  endtime?: Date;
  name?: string;
  isrented?: number;
  eacc?: number;
  eoff?: number;
  rname: string;
  content?: string;
  aname: string;
  color?: string;
  activityId: number;
  roomId: number;
  aacc?: number;
  aoff?: number;
  projectId?: number;
  partnerId?: number;
  firstname: string;
  lastname: string;
  personName?: string;
  projname?: string;
  partname?: string;
  tname: string;
  aPersonId: number;
  personId: number;
}

export class VFeventT implements VFeventTInterface {
  id: number;
  starttime: Date;
  endtime: Date;
  name: string;
  isrented: number;
  eacc: number;
  eoff: number;
  rname: string;
  content: string;
  aname: string;
  color: string;
  activityId: number;
  roomId: number;
  aacc: number;
  aoff: number;
  projectId: number;
  partnerId: number;
  firstname: string;
  lastname: string;
  personName: string;
  projname: string;
  partname: string;
  tname: string;
  aPersonId: number;
  personId: number;
  constructor(data?: VFeventTInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VFeventT`.
   */
  public static getModelName() {
    return "VFeventT";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VFeventT for dynamic purposes.
  **/
  public static factory(data: VFeventTInterface): VFeventT{
    return new VFeventT(data);
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
      name: 'VFeventT',
      plural: 'VFeventTs',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        starttime: {
          name: 'starttime',
          type: 'Date'
        },
        endtime: {
          name: 'endtime',
          type: 'Date'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        isrented: {
          name: 'isrented',
          type: 'number'
        },
        eacc: {
          name: 'eacc',
          type: 'number'
        },
        eoff: {
          name: 'eoff',
          type: 'number'
        },
        rname: {
          name: 'rname',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        aname: {
          name: 'aname',
          type: 'string'
        },
        color: {
          name: 'color',
          type: 'string'
        },
        activityId: {
          name: 'activityId',
          type: 'number'
        },
        roomId: {
          name: 'roomId',
          type: 'number'
        },
        aacc: {
          name: 'aacc',
          type: 'number'
        },
        aoff: {
          name: 'aoff',
          type: 'number'
        },
        projectId: {
          name: 'projectId',
          type: 'number'
        },
        partnerId: {
          name: 'partnerId',
          type: 'number'
        },
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
        },
        personName: {
          name: 'personName',
          type: 'string'
        },
        projname: {
          name: 'projname',
          type: 'string'
        },
        partname: {
          name: 'partname',
          type: 'string'
        },
        tname: {
          name: 'tname',
          type: 'string'
        },
        aPersonId: {
          name: 'aPersonId',
          type: 'number'
        },
        personId: {
          name: 'personId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
