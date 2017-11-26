import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <h1>Instagram</h1>
    <div *ngFor="let instagram_post of instagram_posts">
      <img [src]="instagram_post.images.standard_resolution.url">
    </div>
  `,
  styles: []
})

export class AppComponent implements OnInit {

  instagram_posts: Array<InstagramPost>;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    // const client_id = '3deca28bbd0542cf841f475cff5d6363';
    // const redirect_uri = 'http://localhost:4200';
    // const authorize_url = `https://www.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=public_content`;

    const user_id = '48623844';
    const access_token = '48623844.3deca28.7ca6d0f3ca014b38a62a6a4aff3b4eb5';
    const api_url = `https://api.instagram.com/v1/users/${user_id}/media/recent?access_token=${access_token}&count=6`;

    this.http.get<InstagramResponse>(api_url).subscribe(response => {
      this.instagram_posts = response.data;
    });

  }

}
