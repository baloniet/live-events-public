/* tslint:disable */

declare var Object: any;
export interface EducationInterface {
  id: number;
  name: string;
}

export class Education implements EducationInterface {
  id: number;
  name: string;
  constructor(data?: EducationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Education`.
   */
  public static getModelName() {
    return "Education";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Education for dynamic purposes.
  **/
  public static factory(data: EducationInterface): Education{
    return new Education(data);
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
      name: 'Education',
      plural: 'Education',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
