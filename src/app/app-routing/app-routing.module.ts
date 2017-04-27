import { PublicProgramComponent } from './../public-program/public-program.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'kranj', redirectTo: 'partner/1', pathMatch: 'full' },
      { path: 'jesenice', redirectTo: 'partner/2', pathMatch: 'full' },
      { path: 'radovljica', redirectTo: 'partner/4', pathMatch: 'full' },
      { path: 'skofjaloka', redirectTo: 'partner/3', pathMatch: 'full' },

      { path: 'partner/:id', component: PublicProgramComponent },
      { path: 'partner', redirectTo: 'partner/1', pathMatch: 'full' },

      { path: 'lokacija/:loc', component: PublicProgramComponent },
      { path: 'lokacija', redirectTo: 'lokacija/10', pathMatch: 'full' },


      { path: '', redirectTo: 'partner/1', pathMatch: 'full' },
      { path: '**', redirectTo: 'partner/1', pathMatch: 'full' }
    ], { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
