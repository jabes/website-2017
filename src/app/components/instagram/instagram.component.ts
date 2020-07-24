import {Component, OnInit, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LazyloadService} from '@app/services/lazyload.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-instagram',
  templateUrl: 'instagram.component.html',
  styleUrls: ['instagram.component.styl']
})

export class InstagramComponent implements OnInit {

  isLoaded: boolean;
  posts: Array<InstagramPost>;

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private lazyLoad: LazyloadService
  ) {
    this.isLoaded = false;
  }

  isImage(post: InstagramPost): boolean {
    return post.media_type == 'IMAGE';
  }

  isCarousel(post: InstagramPost): boolean {
    return post.media_type == 'CAROUSEL_ALBUM';
  }

  isVideo(post: InstagramPost): boolean {
    return post.media_type == 'VIDEO';
  }

  getInstagramPosts(): Observable<InstagramResponse> {
    const limit = 12;
    const fields = 'id,username,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
    const access_token = 'IGQVJYZAVJnWXc0c1B2bFJCVjJuTktNTFdQM3NRMVBCcTRvLXFGa2tCZAE9CNTYxWVhJNkhGSy0ycTk0dFNPaWVpTzB2ZA1dOUVRvY2MzN005bWw4UWh0cXlDYldoYWQ0aGxGZAEs3QjRabXNMOGtqOFZAKSgZDZD';
    const api_url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${access_token}&limit=${limit}`;
    return this.http.get<InstagramResponse>(api_url);
  }

  getInstagramChildren(post: InstagramPost): Observable<InstagramResponse> {
    const fields = 'id,username,media_type,media_url,permalink,timestamp'
    const access_token = 'IGQVJYZAVJnWXc0c1B2bFJCVjJuTktNTFdQM3NRMVBCcTRvLXFGa2tCZAE9CNTYxWVhJNkhGSy0ycTk0dFNPaWVpTzB2ZA1dOUVRvY2MzN005bWw4UWh0cXlDYldoYWQ0aGxGZAEs3QjRabXNMOGtqOFZAKSgZDZD';
    const api_url = `https://graph.instagram.com/${post.id}/children?fields=${fields}&access_token=${access_token}`;
    return this.http.get<InstagramResponse>(api_url);
  }

  parseCaptions() {
    for (let i = 0; i < this.posts.length; i++) {
      let caption = this.posts[i].caption;
      caption = twemoji.parse(caption);
      this.posts[i].caption = caption;
    }
  }

  checkLoaded() {
    let loaded = true;
    if (this.posts == undefined || this.posts.length == 0) {
      loaded = false;
    } else {
      this.posts.forEach(post => {
        if (this.isCarousel(post) == true) {
          if (post.children == undefined || post.children.length == 0) {
            loaded = false;
          }
        }
      });
    }
    if (loaded) {
      setTimeout(() => this.lazyLoad.observeImages(this.el.nativeElement), 0);
    }
    return loaded;
  }

  ngOnInit() {
    this.getInstagramPosts().subscribe(response => {
      this.posts = response.data;
      this.posts.forEach((post, index) => {
        if (this.isCarousel(post) == true) {
          this.getInstagramChildren(post).subscribe(response => {
            this.posts[index].children = response.data;
            this.isLoaded = this.checkLoaded();
          });
        }
      });
      this.parseCaptions();
      this.isLoaded = this.checkLoaded();
    });
  }

}
