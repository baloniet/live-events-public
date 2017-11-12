import { LabelService } from './services/label.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SDKBrowserModule } from './shared/sdk/index';

import { AppComponent } from './app.component';
import { SelectModule } from './ui/ng2-select/select.module';
import { PublicProgramComponent } from './public-program/public-program.component';

@NgModule({
  declarations: [
    AppComponent, PublicProgramComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    SDKBrowserModule.forRoot(),
    AppRoutingModule,
    SelectModule, ReactiveFormsModule, FormsModule
  ],
  providers: [LabelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
