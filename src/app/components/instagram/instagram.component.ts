import {Component, OnInit, ElementRef} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LazyLoadService} from '@app/services/lazyload.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-instagram',
  templateUrl: 'instagram.component.html',
  styleUrls: ['instagram.component.styl']
})

export class InstagramComponent implements OnInit {

  isLoaded: boolean;
  isError: boolean;
  errorObject: HttpErrorResponse;
  posts: Array<InstagramPost>;

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private lazyLoad: LazyLoadService
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

  // https://developers.facebook.com/apps/587229432160055/instagram-basic-display/basic-display/
  getInstagramPosts(): Observable<InstagramResponse> {
    const limit = 12;
    const fields = 'id,username,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
    const access_token = 'IGQVJXY1hwVmJYSUZAxeFdkSkRaTDlIRVAzVE1oZAGVVdmFKRGNkLWNkSkVFSjVZAY1VCdWJzblk4ekt1RzYyd2lYVlV6WmU2TUFPdkJicEdxQlU2M0dHZAjMzcnNhM0hOazNsRnBMT1pMN3NaRTdqTmVpLQZDZD';
    const api_url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${access_token}&limit=${limit}`;
    return this.http.get<InstagramResponse>(api_url);
  }

  // https://developers.facebook.com/apps/587229432160055/instagram-basic-display/basic-display/
  getInstagramChildren(post: InstagramPost): Observable<InstagramResponse> {
    const fields = 'id,username,media_type,media_url,permalink,timestamp'
    const access_token = 'IGQVJXY1hwVmJYSUZAxeFdkSkRaTDlIRVAzVE1oZAGVVdmFKRGNkLWNkSkVFSjVZAY1VCdWJzblk4ekt1RzYyd2lYVlV6WmU2TUFPdkJicEdxQlU2M0dHZAjMzcnNhM0hOazNsRnBMT1pMN3NaRTdqTmVpLQZDZD';
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

  loadImages() {
    let callback = () => this.lazyLoad.observeImages(this.el.nativeElement);
    let milliseconds = 0;
    setTimeout(callback, milliseconds);
  }

  handleError(error: HttpErrorResponse) {
    this.isError = true;
    this.errorObject = error;
  }

  checkPosts() {
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
      this.loadImages();
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
            this.isLoaded = this.checkPosts();
          }, error => this.handleError(error));
        }
      });
      this.parseCaptions();
      this.isLoaded = this.checkPosts();
    }, error => this.handleError(error));
  }

}
