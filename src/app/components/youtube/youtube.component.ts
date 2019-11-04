import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-youtube',
  templateUrl: 'youtube.component.html',
  styleUrls: ['youtube.component.styl'],
  // https://stackoverflow.com/questions/36265026/angular-2-innerhtml-styling
  encapsulation: ViewEncapsulation.None,
})

export class YoutubeComponent implements OnInit {

  videos: Array<YoutubeVideo>;
  activeVideo: YoutubeVideo;

  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer
  ) {}

  setActiveVideo(video: YoutubeVideo) {
    this.activeVideo = video;
  }

  clearActiveVideo() {
    delete this.activeVideo;
  }

  getYoutubeVideoInfo(video_id: string): Observable<YoutubeResponse> {
    const api_key = 'AIzaSyAGac0L1t9dlIw8U229C1GkFNa2Sh4oSXc';
    const api_url = `https://www.googleapis.com/youtube/v3/videos?id=${video_id}&key=${api_key}&part=snippet,player,statistics`;
    return this.http.get<YoutubeResponse>(api_url);
  }

  ngOnInit() {

    const ids = [
      'yxnSeF9W-0s',
      'P_E2fZLOjek',
      '-uo1fnFTNds',
      'AXI5WFLir7M',
    ];

    this.videos = [];

    this.getYoutubeVideoInfo(ids.join(',')).subscribe(response => {
      this.videos = response.items;
    });

  }
}
