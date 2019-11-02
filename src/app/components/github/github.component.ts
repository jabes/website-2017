import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-github',
  templateUrl: 'github.component.html',
  styleUrls: ['github.component.styl']
})

export class GithubComponent implements OnInit {

  githubObjects: Array<GithubObject>;

  constructor(private http: HttpClient) {}

  getRepo(repo: string): Observable<GithubRepo> {
    const api_url = `https://api.github.com/repos/jabes/${repo}`;
    return this.http.get<GithubRepo>(api_url);
  }

  getRepoReadme(repo: string): Observable<GithubRepoReadme> {
    const api_url = `https://api.github.com/repos/jabes/${repo}/readme`;
    return this.http.get<GithubRepoReadme>(api_url);
  }

  parseRepoReadme(response: GithubRepoReadme) {
    const content = atob(response.content);
    const lexer = new marked.Lexer();
    const tokens  = lexer.lex(content);

    let first_heading;
    let first_paragraph;
    let first_screenshot;

    tokens.forEach(function (token) {
      switch (token.type) {
        case 'heading':
          if (!first_heading) {
            first_heading = token.text;
          }
          break;
        case 'paragraph':
          // does the paragraph contain a screen shot link?
          // example: ![](screenshot.png)
          let regex = new RegExp(/(\!\[.*\]\()(.*)(\))/);
          let results = token.text.match(regex);
          if (results && !first_screenshot) {
              let base_path = response.download_url.replace(response.path,'');
              let rel_path = results[2];
              first_screenshot = base_path + rel_path;
          } else {
            // if not then consider the paragraph to be textual content
            if (!first_paragraph) {
              first_paragraph = marked(token.text);
            }
          }
          break;
      }
    });

    let regex = new RegExp(/https:\/\/raw.githubusercontent.com\/(.*)\/(.*)\/master\/README.md/);
    let results = response.download_url.match(regex);
    let repoKey = results[2];

    this.getRepo(repoKey).subscribe(response => {

      this.githubObjects.push({
        repo: response,
        readme: {
          heading: first_heading,
          introduction: first_paragraph,
          screenshot: first_screenshot,
        },
      });

    });

  }

  ngOnInit() {

    this.githubObjects = [];

    const repoKeys = [
      'terrace',
      'pinup',
      'tofu',
      'snap-touch',
    ];

    repoKeys.forEach(repoKey => {
      this.getRepoReadme(repoKey).subscribe(response => this.parseRepoReadme(response));
    });

  }

}
