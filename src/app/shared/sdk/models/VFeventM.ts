/* tslint:disable */

declare var Object: any;
export interface VFeventMInterface {
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
  personId: number;
  aacc?: number;
  aoff?: number;
  projectId?: number;
  partnerId?: number;
  cdate?: Date;
  odate?: Date;
  adate?: Date;
  firstname: string;
  lastname: string;
  personName?: string;
  epersonId: number;
  projname?: string;
  partname?: string;
  tname: string;
}

export class VFeventM implements VFeventMInterface {
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
  personId: number;
  aacc: number;
  aoff: number;
  projectId: number;
  partnerId: number;
  cdate: Date;
  odate: Date;
  adate: Date;
  firstname: string;
  lastname: string;
  personName: string;
  epersonId: number;
  projname: string;
  partname: string;
  tname: string;
  constructor(data?: VFeventMInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VFeventM`.
   */
  public static getModelName() {
    return "VFeventM";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VFeventM for dynamic purposes.
  **/
  public static factory(data: VFeventMInterface): VFeventM{
    return new VFeventM(data);
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
      name: 'VFeventM',
      plural: 'VFeventMs',
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
        personId: {
          name: 'personId',
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
        cdate: {
          name: 'cdate',
          type: 'Date'
        },
        odate: {
          name: 'odate',
          type: 'Date'
        },
        adate: {
          name: 'adate',
          type: 'Date'
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
        epersonId: {
          name: 'epersonId',
          type: 'number'
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
      },
      relations: {
      }
    }
  }
}
