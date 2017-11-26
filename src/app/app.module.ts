import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {InlineSVGModule} from 'ng-inline-svg';

import {AppComponent} from './app.component';
import {InstagramComponent} from './instagram/instagram.component';
import {GithubComponent} from './github/github.component';

@NgModule({
  declarations: [
    AppComponent,
    InstagramComponent,
    GithubComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
