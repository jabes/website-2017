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
      url: 'https://www.linkedin.com/in/jwbull',
      label: 'See My LinkedIn Profile',
    },
    {
      icon: '/assets/icons/instagram.svg',
      url: 'https://www.instagram.com/bull.justin',
      label: 'See My Photography',
    },
    {
      icon: '/assets/icons/stackoverflow.svg',
      url: 'https://stackoverflow.com/users/229787/justin-bull',
      label: 'See My Contributions On Stack Overflow',
    },
    {
      icon: '/assets/icons/github.svg',
      url: 'https://github.com/jabes',
      label: 'See My Work On Github',
    },
    {
      icon: '/assets/icons/contact.svg',
      url: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=bull.justin@gmail.com&su=Let%27s%20talk',
      label: 'Send Me A Message',
    },
  ];

  ngOnInit() {
    particlesJS.load('footerBgContainer', {
      particles: {
        number: {
          value: 250
        },
        color: {
          value: "#081D58"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.3,
          random: true
        },
        size: {
          value: 4,
          random: true
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false
        }
      }
    });
  }

  ngAfterViewInit() {
    VANTA.WAVES({
      el: "#headerBgContainer",
      color: 0x1e4466,
      shininess: 20.00,
      waveHeight: 10.00,
      waveSpeed: 0.75,
      zoom: 1,
    });
  }

}
