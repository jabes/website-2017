import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {InlineSVGModule} from 'ng-inline-svg';

import {AppComponent} from './components/app.component';
import {InstagramComponent} from './components/instagram/instagram.component';
import {YoutubeComponent} from './components/youtube/youtube.component';
import {GithubComponent} from './components/github/github.component';

import {SafeUrlPipe} from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InstagramComponent,
    YoutubeComponent,
    GithubComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule {}
