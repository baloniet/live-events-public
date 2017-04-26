import { PublicProgramComponent } from './../public-program/public-program.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'kranj', redirectTo: 'public-program/1', pathMatch: 'full' },
      { path: 'jesenice', redirectTo: 'public-program/2', pathMatch: 'full' },
      { path: 'radovljica', redirectTo: 'public-program/4', pathMatch: 'full' },
      { path: 'skofjaloka', redirectTo: 'public-program/3', pathMatch: 'full' },
      { path: 'public-program', component: PublicProgramComponent },
      { path: 'public-program/:id', component: PublicProgramComponent },
      { path: '', redirectTo: 'public-program/1', pathMatch: 'full' },
      { path: '**', component: PublicProgramComponent }
    ], {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
