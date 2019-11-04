import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-instagram',
  templateUrl: 'instagram.component.html',
  styleUrls: ['instagram.component.styl']
})

export class InstagramComponent implements OnInit {

  isLoaded: boolean;
  posts: Array<InstagramPost>;

  constructor(private http: HttpClient) {
    this.isLoaded = false;
  }

  isImage(post: InstagramPost): boolean {
    return post.type == 'image';
  }

  isCaroursel(post: InstagramPost): boolean {
    return post.type == 'carousel';
  }

  isVideo(post: InstagramPost): boolean {
    return post.type == 'video';
  }

  getInstagramPosts(): Observable<InstagramResponse> {
    const user_id = '48623844';
    const access_token = '48623844.3deca28.3ed677d7451643fead352c1b89ef738e';
    const api_url = `https://api.instagram.com/v1/users/${user_id}/media/recent?access_token=${access_token}&count=8`;
    return this.http.get<InstagramResponse>(api_url);
  }

  parseCaptions() {
    for (let i = 0; i < this.posts.length; i++) {
      let caption = this.posts[i].caption.text;
      caption = twemoji.parse(caption);
      this.posts[i].caption.text = caption;
    }
  }

  preloadImages() {
    let scope = this;
    let numLoaded = 0;
    for (let i = 0; i < scope.posts.length; i++) {
      let post = scope.posts[i];
      let image = new Image();
      image.src = post.images.standard_resolution.url;
      image.onload = function () {
        numLoaded++;
        if (numLoaded === scope.posts.length) {
          scope.isLoaded = true;
        }
      };
    }
  }

  ngOnInit() {
    this.getInstagramPosts().subscribe(response => {
      this.posts = response.data;
      this.parseCaptions();
      this.preloadImages();
    });
  }

}