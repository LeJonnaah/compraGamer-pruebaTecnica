import { Component } from '@angular/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  images = [
    {
      imageSrc: 'assets/images/compragamer_banner-1.jpg',
      imageAlt: 'Image 1'
    },
    {
      imageSrc: 'assets/images/compragamer_banner-2.jpg',
      imageAlt: 'Image 2'
    },
    {
      imageSrc: 'assets/images/compragamer_banner-3.jpg',
      imageAlt: 'Image 3'
    }
  ];

}
