import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-github',
  templateUrl: 'github.component.html',
  styleUrls: ['github.component.styl']
})

export class GithubComponent implements OnInit {

  repos: Array<GithubRepo>;

  constructor(private http: HttpClient) {}

  getGithubRepos(): Observable<GithubRepo[]> {
    const user = 'jabes';
    const api_url = `https://api.github.com/users/${user}/repos`;
    return this.http.get<GithubRepo[]>(api_url);
  }

  ngOnInit() {

    this.getGithubRepos().subscribe(response => {
      this.repos = response;
    });

  }

}
