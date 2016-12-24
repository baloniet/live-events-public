/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Post } from '../../models/Post';
import { Commune } from '../../models/Commune';
import { Education } from '../../models/Education';
import { PPhone } from '../../models/PPhone';
import { PEmail } from '../../models/PEmail';
import { Citizenship } from '../../models/Citizenship';
import { PCiti } from '../../models/PCiti';
import { PStat } from '../../models/PStat';
import { Statement } from '../../models/Statement';
import { PEdu } from '../../models/PEdu';
import { APerson } from '../../models/APerson';
import { Room } from '../../models/Room';
import { Errors } from '../../models/Errors';
import { Theme } from '../../models/Theme';
import { VActivity } from '../../models/VActivity';
import { Event } from '../../models/Event';
import { VEvent } from '../../models/VEvent';
import { VStatPer } from '../../models/VStatPer';
import { EPerson } from '../../models/EPerson';
import { Person } from '../../models/Person';
import { VMeventA } from '../../models/VMeventA';
import { VMeventE } from '../../models/VMeventE';
import { VAperson } from '../../models/VAperson';
import { VAmember } from '../../models/VAmember';
import { PAddress } from '../../models/PAddress';
import { VPevent } from '../../models/VPevent';
import { VMevent } from '../../models/VMevent';
import { VPerson } from '../../models/VPerson';
import { VMember } from '../../models/VMember';
import { Template } from '../../models/Template';
import { ATemplate } from '../../models/ATemplate';
import { Activity } from '../../models/Activity';
import { VReport } from '../../models/VReport';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    User: User,
    Post: Post,
    Commune: Commune,
    Education: Education,
    PPhone: PPhone,
    PEmail: PEmail,
    Citizenship: Citizenship,
    PCiti: PCiti,
    PStat: PStat,
    Statement: Statement,
    PEdu: PEdu,
    APerson: APerson,
    Room: Room,
    Errors: Errors,
    Theme: Theme,
    VActivity: VActivity,
    Event: Event,
    VEvent: VEvent,
    VStatPer: VStatPer,
    EPerson: EPerson,
    Person: Person,
    VMeventA: VMeventA,
    VMeventE: VMeventE,
    VAperson: VAperson,
    VAmember: VAmember,
    PAddress: PAddress,
    VPevent: VPevent,
    VMevent: VMevent,
    VPerson: VPerson,
    VMember: VMember,
    Template: Template,
    ATemplate: ATemplate,
    Activity: Activity,
    VReport: VReport,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}
