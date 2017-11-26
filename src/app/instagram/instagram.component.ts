import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SVGCacheService} from 'ng-inline-svg';

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

  isVideo(post: InstagramPost): boolean {
    return post.type == 'video';
  }

  ngOnInit() {

    // const client_id = '3deca28bbd0542cf841f475cff5d6363';
    // const redirect_uri = 'http://localhost:4200';
    // const authorize_url = `https://www.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=public_content`;

    const user_id = '48623844';
    const access_token = '48623844.3deca28.7ca6d0f3ca014b38a62a6a4aff3b4eb5';
    const api_url = `https://api.instagram.com/v1/users/${user_id}/media/recent?access_token=${access_token}&count=6`;

    this.http.get<InstagramResponse>(api_url).subscribe(response => {
      this.posts = response.data;
    });

  }

}
