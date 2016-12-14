/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDKModule }      from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDKModule.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { JSONSearchParams } from './services/core/search.params';
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage } from './storage/internal.storage';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { UserApi } from './services/custom/User';
import { PostApi } from './services/custom/Post';
import { CommuneApi } from './services/custom/Commune';
import { PPhoneApi } from './services/custom/PPhone';
import { PEmailApi } from './services/custom/PEmail';
import { CitizenshipApi } from './services/custom/Citizenship';
import { PCitiApi } from './services/custom/PCiti';
import { PStatApi } from './services/custom/PStat';
import { StatementApi } from './services/custom/Statement';
import { PEduApi } from './services/custom/PEdu';
import { ActivityApi } from './services/custom/Activity';
import { APersonApi } from './services/custom/APerson';
import { RoomApi } from './services/custom/Room';
import { ErrorsApi } from './services/custom/Errors';
import { ThemeApi } from './services/custom/Theme';
import { VActivityApi } from './services/custom/VActivity';
import { EventApi } from './services/custom/Event';
import { VMemberApi } from './services/custom/VMember';
import { VStatPerApi } from './services/custom/VStatPer';
import { EPersonApi } from './services/custom/EPerson';
import { PersonApi } from './services/custom/Person';
import { VApersonApi } from './services/custom/VAperson';
import { VAmemberApi } from './services/custom/VAmember';
import { PAddressApi } from './services/custom/PAddress';
import { VPeventApi } from './services/custom/VPevent';
import { VMeventApi } from './services/custom/VMevent';
import { VEventApi } from './services/custom/VEvent';
import { VMeventAApi } from './services/custom/VMeventA';
import { VMeventEApi } from './services/custom/VMeventE';
import { EducationApi } from './services/custom/Education';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler
  ]
})
export class SDKBrowserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        JSONSearchParams,
        SDKModels,
        UserApi,
        PostApi,
        CommuneApi,
        PPhoneApi,
        PEmailApi,
        CitizenshipApi,
        PCitiApi,
        PStatApi,
        StatementApi,
        PEduApi,
        ActivityApi,
        APersonApi,
        RoomApi,
        ErrorsApi,
        ThemeApi,
        VActivityApi,
        EventApi,
        VMemberApi,
        VStatPerApi,
        EPersonApi,
        PersonApi,
        VApersonApi,
        VAmemberApi,
        PAddressApi,
        VPeventApi,
        VMeventApi,
        VEventApi,
        VMeventAApi,
        VMeventEApi,
        EducationApi,
        { provide: InternalStorage, useClass: CookieBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';

