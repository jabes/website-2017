import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LazyLoadService {

  imageObserver: IntersectionObserver
  imageObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  }

  constructor() {
    let callback = (entries, observer) => { this.lazyLoadImages(entries, observer); };
    this.imageObserver = new IntersectionObserver(callback, this.imageObserverOptions);
  }

  lazyLoadImages(entries: Array<IntersectionObserverEntry>, observer: IntersectionObserver) {
    let scope = this;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let image = entry.target as HTMLImageElement;
        scope.loadImage(image);
        observer.unobserve(image);
      }
    });
  }

  observeImages(parent: HTMLElement) {
    const nodeList = parent.querySelectorAll('img[data-src]');
    nodeList.forEach(image => {
      this.imageObserver.observe(image);
    });
  }

  loadImage(image: HTMLImageElement) {
    image.src = image.dataset.src;
    image.classList.add('loaded');
  }

}
