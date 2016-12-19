import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ScheduleModule } from './ui/schedule/schedule.module';
import { ScheduleProxy } from './ui/schedule/schedule.proxy';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { SDKBrowserModule } from './shared/sdk/index';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProcbarComponent } from './procbar/procbar.component';
import { PostFormComponent } from './ui/forms/post-form/post-form.component';
import { LabelService } from './services/label.service';
import { GenListComponent } from './ui/gen-list/gen-list.component';
import { ValuesPipe, KeysPipe } from './shared/values.pipe'
import { DateFormatter } from './shared/date.formatter';
import { FormTitleComponent } from './ui/forms/shared/frmTitle.component';
import { FormButtonComponent } from './ui/forms/shared/frmBtn.component';
import { CommuneFormComponent } from './ui/forms/commune-form/commune-form.component';
import { EducationFormComponent } from './ui/forms/education-form/education-form.component';
import { StatementFormComponent } from './ui/forms/statement-form/statement-form.component';
import { CitizenshipFormComponent } from './ui/forms/citizenship-form/citizenship-form.component';
import { PersonFormComponent } from './ui/forms/person-form/person-form.component';
import { AddressComponent } from './ui/forms/address/address.component';
import { SelectModule } from './ui/ng2-select/select.module';
import { ActivityFormComponent } from './ui/forms/activity-form/activity-form.component';
import { PersonComponent } from './ui/forms/person/person.component';
import { ThemeFormComponent } from './ui/forms/theme-form/theme-form.component';
import { ErrorTrackerComponent } from './ui/error-tracker/error-tracker.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { EventFormComponent } from './ui/forms/event-form/event-form.component';
import { RoomFormComponent } from './ui/forms/room-form/room-form.component';
import { ErrorFormComponent } from './ui/forms/error-form/error-form.component';
import { ColorPickerModule, ColorPickerService } from 'angular2-color-picker/lib';
import { RoomScheduleComponent } from './ui/room-schedule/room-schedule.component';
import { PersonScheduleComponent } from './ui/person-schedule/person-schedule.component';
import { CheckinFormComponent } from './ui/forms/checkin-form/checkin-form.component';
import { EventViewComponent } from './ui/views/event-view/event-view.component';
import { MemberScheduleComponent } from './ui/member-schedule/member-schedule.component';
import { PrintComponent } from './print/print.component';
import { PlanComponent } from './ui/plan/plan.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProcbarComponent,
    PostFormComponent,
    GenListComponent,
    ValuesPipe, KeysPipe,
    FormTitleComponent, FormButtonComponent, CommuneFormComponent, EducationFormComponent, StatementFormComponent,
    CitizenshipFormComponent, PersonFormComponent, AddressComponent, ActivityFormComponent, PersonComponent,
    ThemeFormComponent, ErrorTrackerComponent, BottombarComponent, ScheduleProxy, 
    EventFormComponent, RoomFormComponent, ErrorFormComponent, RoomScheduleComponent, PersonScheduleComponent, 
    CheckinFormComponent, EventViewComponent, MemberScheduleComponent, PrintComponent, PlanComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    SDKBrowserModule.forRoot(),
    AppRoutingModule,
    SelectModule,
    ScheduleModule,
    ColorPickerModule
  ],
  providers: [LabelService, {
    provide: NgbDateParserFormatter,
    useFactory: () => { return new DateFormatter() }
  }, ColorPickerService, AUTH_PROVIDERS, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
