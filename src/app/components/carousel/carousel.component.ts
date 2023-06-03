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

export class CarouselComponent implements OnInit {
  selectedIndex = 0

  @Input() images: carouselImage[] = [];
  @Input() indicators = true;
  @Input() autoSlide = true;
  @Input() interval = 3000;

  // Inicializa el carrusel
  ngOnInit(): void {
    // Si el carrusel tiene autoSlide, se cambia la imagen cada cierto tiempo
    if (this.autoSlide) {
      setInterval(() => {
        // Selecciona la siguiente imagen
        this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
      }, this.interval);
    }
  }

  // Selecciona la imagen que se muestra en el carrusel
  selectImage(index: number) {
    this.selectedIndex = index;
  }
}
