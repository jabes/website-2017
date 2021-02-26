import {Component, OnInit, ElementRef, ViewEncapsulation, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LazyLoadService} from '@app/services/lazyload.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-youtube',
  templateUrl: 'youtube.component.html',
  styleUrls: ['youtube.component.styl'],
  // https://stackoverflow.com/questions/36265026/angular-2-innerhtml-styling
  encapsulation: ViewEncapsulation.None,
})

export class YoutubeComponent implements OnInit {

  closeOverlayButton: HTMLButtonElement;
  videos: Array<YoutubeVideo>;
  activeVideo: YoutubeVideo;
  error: string;

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private lazyLoad: LazyLoadService,
  ) {}

  @ViewChild('closeOverlayButton', { static: false }) set content(elm: ElementRef) {
    if (elm.nativeElement) {
      this.closeOverlayButton = elm.nativeElement;
    }
  }

  handleKeyDownEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearActiveVideo();
    }
  }

  focusCloseOverlayButton() {
    if (this.closeOverlayButton) {
      this.closeOverlayButton.focus();
    }
  }

  setActiveVideo(video: YoutubeVideo) {
    this.activeVideo = video;
    setTimeout(() => this.focusCloseOverlayButton(), 0);
    window.addEventListener('keydown', event => this.handleKeyDownEvent(event));
  }

  clearActiveVideo() {
    delete this.activeVideo;
    window.removeEventListener('keydown', this.handleKeyDownEvent);
  }

  getYoutubeVideoInfo(ids: Array<string>): Observable<YoutubeResponse> {
    const queryData = {
      'id': ids.join(','),
      'key': 'AIzaSyAGac0L1t9dlIw8U229C1GkFNa2Sh4oSXc',
      'part': 'snippet,player,statistics',
    };

    let searchParameters = new URLSearchParams();
    Object.keys(queryData).forEach(parameterName => {
      searchParameters.append(parameterName, queryData[parameterName]);
    });

    const api_query = searchParameters.toString();
    const api_url = `https://www.googleapis.com/youtube/v3/videos?${api_query}`;
    return this.http.get<YoutubeResponse>(api_url);
  }

  loadImages() {
    let callback = () => this.lazyLoad.observeImages(this.el.nativeElement);
    let milliseconds = 0;
    setTimeout(callback, milliseconds);
  }

  ngOnInit() {

    const ids = [
      'yxnSeF9W-0s',
      'P_E2fZLOjek',
      '-uo1fnFTNds',
      'AXI5WFLir7M',
    ];

    this.videos = [];

    this.getYoutubeVideoInfo(ids).subscribe(
      response => {
        this.videos = response.items;
        this.loadImages();
      },
      response => {
        this.error = response.error.error.message;
      }
    );

  }
}
