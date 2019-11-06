import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from '@app/components/app.component';
import {InstagramComponent} from '@app/components/instagram/instagram.component';
import {YoutubeComponent} from '@app/components/youtube/youtube.component';
import {GithubComponent} from '@app/components/github/github.component';

import {SafeUrlPipe} from '@app/pipes/safe-url.pipe';
import {SafeHtmlPipe} from '@app/pipes/safe-html.pipe';

import {InlineSVGModule} from 'ng-inline-svg';

@NgModule({
  declarations: [
    AppComponent,
    InstagramComponent,
    YoutubeComponent,
    GithubComponent,
    SafeUrlPipe,
    SafeHtmlPipe,
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
