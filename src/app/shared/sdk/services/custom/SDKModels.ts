/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Partner } from '../../models/Partner';
import { VLocation } from '../../models/VLocation';
import { PLocation } from '../../models/PLocation';
import { VPlocation } from '../../models/VPlocation';
import { VEvent } from '../../models/VEvent';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    User: User,
    Event: Event,
    Partner: Partner,
    Location: Location,
    VLocation: VLocation,
    PLocation: PLocation,
    VPlocation: VPlocation,
    VEvent: VEvent,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}
