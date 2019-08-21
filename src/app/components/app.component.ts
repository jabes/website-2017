import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.styl']
})

export class AppComponent implements OnInit {
  socials = [
    {
      icon: '/assets/icons/linkedin.svg',
      url: 'https://www.linkedin.com/in/jwbull'
    },
    {
      icon: '/assets/icons/instagram.svg',
      url: 'https://www.instagram.com/bull.justin'
    },
    {
      icon: '/assets/icons/stackoverflow.svg',
      url: 'https://stackoverflow.com/users/229787/justin-bull'
    },
    {
      icon: '/assets/icons/github.svg',
      url: 'https://github.com/jabes'
    },
    {
      icon: '/assets/icons/envelope.svg',
      url: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=bull.justin@gmail.com&su=Let%27s%20talk'
    },
  ];

  ngOnInit() {
    particlesJS.load('particlesFooter', 'assets/particles.json');
  }

}
