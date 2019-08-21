import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-instagram',
  templateUrl: 'instagram.component.html',
  styleUrls: ['instagram.component.styl']
})

export class InstagramComponent implements OnInit {

  posts: Array<InstagramPost>;

  constructor(private http: HttpClient) {}

  isImage(post: InstagramPost): boolean {
    return post.type == 'image';
  }

  isCaroursel(post: InstagramPost): boolean {
      return post.type == 'carousel';
  }

  isVideo(post: InstagramPost): boolean {
    return post.type == 'video';
  }

  truncateText(text: string): string {
    const maxChars = 120;
    const ellipsis = '...';
    text = text.length > maxChars ? text.substring(0, maxChars) + ellipsis : text;
    return text;
  }

  getInstagramPosts(): Observable<InstagramResponse> {
    const user_id = '48623844';
    const access_token = '48623844.3deca28.3ed677d7451643fead352c1b89ef738e';
    const api_url = `https://api.instagram.com/v1/users/${user_id}/media/recent?access_token=${access_token}&count=20`;
    return this.http.get<InstagramResponse>(api_url);
  }

  ngOnInit() {

    this.getInstagramPosts().subscribe(response => {
      this.posts = response.data;
      for (let i = 0; i < this.posts.length; i++) {
        let caption = this.posts[i].caption.text;
        caption = this.truncateText(caption);
        caption = twemoji.parse(caption);
        this.posts[i].caption.text = caption;
      }
    });

  }

}
