import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: 'youtube.component.html',
  styleUrls: ['youtube.component.styl']
})

export class YoutubeComponent implements OnInit {

  videos: Array<YoutubeVideo>;
  activeVideoSrc: string;

  constructor(public sanitizer: DomSanitizer) {}

  setActiveVideo(video: YoutubeVideo) {
    this.activeVideoSrc = video.url;
  }

  clearActiveVideo() {
    delete this.activeVideoSrc;
  }

  ngOnInit() {

    const ids = [
      'yxnSeF9W-0s',
      'P_E2fZLOjek',
      '-uo1fnFTNds',
      'AXI5WFLir7M'
    ];

    this.videos = [];

    for (let i = 0; i < ids.length; i++) {
      let id = ids[i];
      this.videos.push({
        thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        url: `https://www.youtube.com/embed/${id}?autoplay=1`,
      });
    }

  }
}
