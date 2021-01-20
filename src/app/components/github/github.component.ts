import {Component, OnInit, ElementRef} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LazyLoadService} from '@app/services/lazyload.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-github',
  templateUrl: 'github.component.html',
  styleUrls: ['github.component.styl']
})

export class GithubComponent implements OnInit {

  isLoaded: boolean;
  isError: boolean;
  errorObject: HttpErrorResponse;
  githubObjects: Array<GithubObject>;
  repoKeys: Array<string>;

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private lazyLoad: LazyLoadService
  ) {}

  handleError(error: HttpErrorResponse) {
    this.isError = true;
    this.errorObject = error;
  }

  loadImages() {
    let callback = () => this.lazyLoad.observeImages(this.el.nativeElement);
    let milliseconds = 0;
    setTimeout(callback, milliseconds);
  }

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

    tokens.forEach(token => {
      switch (token.type) {
        case 'heading':
          if (!first_heading) {
            first_heading = token.text;
          }
          break;
        case 'paragraph':
          // does the paragraph contain a screen shot link?
          // example: ![](screenshot.png)
          let pattern = /(!\[.*]\()(.*)(\))/;
          let regex = new RegExp(pattern);
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

    let pattern = /https:\/\/raw.githubusercontent.com\/(.*)\/(.*)\/master\/README.md/;
    let regex = new RegExp(pattern);
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

      if (this.repoKeys.length === this.githubObjects.length) {
        this.isLoaded = true;
        this.loadImages();
      }

    }, this.handleError);

  }

  ngOnInit() {

    this.isLoaded = false;
    this.isError = false;
    this.githubObjects = [];
    this.repoKeys = [
      'terrace',
      'pinup',
      'tofu',
      'snap-touch',
    ];

    this.repoKeys.forEach(repoKey => {
      this.getRepoReadme(repoKey).subscribe(
        response => this.parseRepoReadme(response),
        error => this.handleError(error)
      )
    });

  }

}
