import { Component, Input, OnInit } from '@angular/core';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit{
  selectedIndex = 0

  @Input() images: carouselImage[] = [];
  @Input() indicators = true;
  @Input() autoSlide = true;
  @Input() interval = 3000;

  ngOnInit(): void {
    if (this.autoSlide) {
      setInterval(() => {
        this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
      }, this.interval);
    }
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }
}
