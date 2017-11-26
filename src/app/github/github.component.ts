import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-github',
  templateUrl: 'github.component.html',
  styleUrls: ['github.component.styl']
})

export class GithubComponent implements OnInit {

  repos: Array<GithubRepo>;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    const user = 'jabes';
    const api_url = `https://api.github.com/users/${user}/repos`;

    this.http.get<GithubRepo[]>(api_url).subscribe(response => {
      this.repos = response;
    });

  }

}
