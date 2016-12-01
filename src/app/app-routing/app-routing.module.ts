import { PersonScheduleComponent } from './../ui/person-schedule/person-schedule.component';
import { RoomScheduleComponent } from './../ui/room-schedule/room-schedule.component';
import { ErrorFormComponent } from './../ui/forms/error-form/error-form.component';
import { RoomFormComponent } from './../ui/forms/room-form/room-form.component';
import { EventFormComponent } from './../ui/forms/event-form/event-form.component';
import { ScheduleProxy } from './../ui/schedule/schedule.proxy';
import { ThemeFormComponent } from './../ui/forms/theme-form/theme-form.component';
import { ProcbarComponent } from '../procbar/procbar.component';
import { CitizenshipFormComponent } from '../ui/forms/citizenship-form/citizenship-form.component';
import { CommuneFormComponent } from '../ui/forms/commune-form/commune-form.component';
import { EducationFormComponent } from '../ui/forms/education-form/education-form.component';
import { PersonFormComponent } from '../ui/forms/person-form/person-form.component';
import { PostFormComponent } from '../ui/forms/post-form/post-form.component';
import { StatementFormComponent } from '../ui/forms/statement-form/statement-form.component';
import { ActivityFormComponent } from '../ui/forms/activity-form/activity-form.component';
import { GenListComponent } from '../ui/gen-list/gen-list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'genlist/:id', component: GenListComponent },
      { path: '', component: ProcbarComponent },
      { path: 'form/post/:id/:action', component: PostFormComponent },
      { path: 'form/post', component: PostFormComponent },
      { path: 'form/commune/:id/:action', component: CommuneFormComponent },
      { path: 'form/commune', component: CommuneFormComponent },
      { path: 'form/education/:id/:action', component: EducationFormComponent },
      { path: 'form/education', component: EducationFormComponent },
      { path: 'form/statement/:id/:action', component: StatementFormComponent },
      { path: 'form/statement', component: StatementFormComponent },
      { path: 'form/theme/:id/:action', component: ThemeFormComponent },
      { path: 'form/theme', component: ThemeFormComponent },
      { path: 'form/citizenship/:id/:action', component: CitizenshipFormComponent },
      { path: 'form/citizenship', component: CitizenshipFormComponent },
      { path: 'form/person/:id/:action', component: PersonFormComponent },
      { path: 'form/person', component: PersonFormComponent },
      { path: 'form/activity/:id/:action', component: ActivityFormComponent },
      { path: 'form/activity', component: ActivityFormComponent },
      { path: 'form/event/:id/:action', component: EventFormComponent },
      { path: 'form/event', component: EventFormComponent },
      { path: 'form/room/:id/:action', component: RoomFormComponent },
      { path: 'form/room', component: RoomFormComponent },
      { path: 'form/error/:id/:action', component: ErrorFormComponent },
      { path: 'form/error', component: ErrorFormComponent },     
      { path: 'schedule/:view', component: ScheduleProxy },
      { path: 'room-schedule', component: RoomScheduleComponent },
      { path: 'person-schedule', component: PersonScheduleComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
