import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProcbarComponent } from '../procbar/procbar.component';
import { PostFormComponent } from '../ui/forms/post-form/post-form.component';
import { GenListComponent } from '../ui/gen-list/gen-list.component';
import { CommuneFormComponent } from '../ui/forms/commune-form/commune-form.component';
import { EducationFormComponent } from '../ui/forms/education-form/education-form.component';
import { StatementFormComponent } from '../ui/forms/statement-form/statement-form.component';
import { CitizenshipFormComponent } from '../ui/forms/citizenship-form/citizenship-form.component';
import { PersonFormComponent } from '../ui/forms/person-form/person-form.component';

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
      { path: 'form/citizenship/:id/:action', component: CitizenshipFormComponent },
      { path: 'form/citizenship', component: CitizenshipFormComponent },
      { path: 'form/person/:id/:action', component: PersonFormComponent },
      { path: 'form/person', component: PersonFormComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
